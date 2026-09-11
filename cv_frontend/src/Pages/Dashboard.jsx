import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ResumeCard from "../Components/ResumeCard";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import CV from "../assets/CV.png";
import { Plus, Upload, LayoutTemplate, FileText, Sparkles, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [layouts, setLayouts] = useState([]);
  const [cvs, setCvs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* --- LOGIC: identical --- */
  const handleCreateCV = async () => {
    try {
      const token = localStorage.getItem("cv_token");
      const res = await API.post(
        "/cv",
        { title: "Untitled Resume", content: {}, template: "default" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/editor/${res.data.cv._id}`);
    } catch {
      alert("Failed to create resume");
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("cv_token");
        const headers = { Authorization: `Bearer ${token}` };
        const [layoutRes, cvRes] = await Promise.all([
          API.get("/layout", { headers }),
          API.get("/cv", { headers }),
        ]);
        setLayouts(layoutRes.data.layouts || []);
        setCvs(cvRes.data.cvs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const createCVFromLayout = async (templateKey) => {
    try {
      const token = localStorage.getItem("cv_token");
      const res = await API.post(
        "/cv",
        { title: "Untitled Resume", content: {}, template: templateKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/editor/${res.data.cv._id}`);
    } catch {
      alert("Failed to create CV");
    }
  };

  /* --- UI only simplified below --- */
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        {/* === Header Section === */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Dashboard
            </h1>
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            Manage or upload your resumes and explore available templates.
          </p>
        </section>

        {/* Resume Creation */}
        <section className="mb-10 grid gap-4 sm:grid-cols-2 ">
          <div
            onClick={handleCreateCV}
            className="border p-5 rounded-lg hover:bg-blue-50 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Create New Resume</h2>
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Start from scratch using our editor
            </p>
            <button className="flex items-center text-blue-600 text-sm font-medium">
              <Plus className="h-4 w-4 mr-1" /> Create
            </button>
          </div>
        </section>

        {/* === Templates Section === */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Templates ({layouts.length})
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Select a template to start editing instantly
          </p>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>
          ) : layouts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {layouts.map((layout) => (
                <div
                  key={layout._id}
                  onClick={() => createCVFromLayout(layout.templateKey)}
                  className="border rounded-md p-3 hover:bg-gray-50 cursor-pointer"
                >
                  <img
                    src={layout.thumbnail}
                    alt={layout.name}
                    className="h-32 w-full object-cover rounded-md mb-2"
                  />
                  <p className="font-medium text-sm">{layout.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No templates available.</p>
          )}
        </section>

        {/* === My Resumes Section === */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            My Resumes ({cvs.length})
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Edit or manage your saved resumes
          </p>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-36 bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>
          ) : cvs.length === 0 ? (
            <div className="border border-dashed rounded-md text-center p-10 bg-white">
              <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-700 font-medium mb-1">No resumes yet</p>
              <p className="text-gray-500 text-sm mb-4">
                Click below to create your first one
              </p>
              <button
                onClick={handleCreateCV}
                className="inline-flex items-center bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-1" /> Create Resume
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cvs.map((cv) => (
                <ResumeCard
                  key={cv._id}
                  item={{
                    title: cv.title,
                    thumbnail: cv.thumbnail,
                    templateName:
                      cv.source === "upload" ? "Uploaded Resume" : cv.template,
                    updatedAt: cv.updatedAt,
                  }}
                  onEdit={() => navigate(`/editor/${cv._id}`)}
                  onPreview={() => navigate(`/editor/${cv._id}?preview=true`)}
                  onDownload={() => navigate(`/payment?cvId=${cv._id}`)}
                  onShare={() => navigate(`/payment?cvId=${cv._id}`)}
                  onDelete={async () => {
                    if (!window.confirm("Delete this resume permanently?"))
                      return;
                    const token = localStorage.getItem("cv_token");
                    await API.delete(`/cv/${cv._id}`, {
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    setCvs((prev) => prev.filter((r) => r._id !== cv._id));
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {/* === Footer === */}
        <footer className="mt-12 border-t pt-4 text-sm text-gray-500 text-center">
          <div className="flex justify-center items-center gap-2">
            <img src={CV} alt="logo" className="h-8 w-8" />
            <span>© {new Date().getFullYear()}CareerMaker.All rights reserved.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}