import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../api/axios";
import {
  Save,
  Download,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronLeft,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Code,
  Award,
  CheckCircle,
  ExternalLink,
  Upload,
  Maximize2,
  Minimize2,
} from "lucide-react";

import BasicDetails from "./steps/BasicDetails";
import Education from "./steps/Education";
import Experience from "./steps/Experience";
import Projects from "./steps/Projects";
import Skills from "./steps/Skills";
import Certificates from "./steps/Certificates";

import ResumePreview from "./Preview/Preview";

const STEPS = [
  { id: 0, label: "Basic", icon: User },
  { id: 1, label: "Education", icon: GraduationCap },
  { id: 2, label: "Experience", icon: Briefcase },
  { id: 3, label: "Projects", icon: FolderKanban },
  { id: 4, label: "Skills", icon: Code },
  { id: 5, label: "Certificates", icon: Award },
];

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [cv, setCv] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState("desktop");

  // Warn if user tries to close tab
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Load CV
  useEffect(() => {
    const loadCV = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("cv_token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await API.get(`/cv/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.data || !res.data.cv) {
          alert("Resume not found");
          navigate("/dashboard");
          return;
        }
        setCv(res.data.cv);
      } catch (error) {
        console.error("Editor load error:", error);
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };
    loadCV();
  }, [id, navigate]);

  // Save CV
  const saveCV = async (updatedContent, status = "draft") => {
    try {
      setSaving(true);
      const token = localStorage.getItem("cv_token");
      const title =
        updatedContent.basic?.name?.trim() || cv?.title || "Untitled Resume";
      const res = await API.put(
        `/cv/${id}`,
        { content: updatedContent, title, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCv(res.data.cv);
      setSaving(false);
    } catch (err) {
      console.error("Save failed", err);
      setSaving(false);
    }
  };

  // Convert upload to editable
  const convertUploadedToEditable = async () => {
    const editableContent = {
      basic: {},
      education: [],
      experience: [],
      projects: [],
      skills: [],
      certificates: [],
    };
    await saveCV(editableContent);
  };

  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-600">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
        <p>Loading your resume...</p>
      </div>
    );
  if (!cv) return null;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <div>
              <h1 className="text-base font-semibold">
                {cv.title || "Untitled Resume"}
              </h1>
              <p className="text-xs text-gray-500">
                {cv.source === "upload" ? "Uploaded Resume" : "Editable Resume"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {showPreview && (
              <div className="flex border-r pr-3 gap-1">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  className={`p-1.5 rounded ${
                    previewMode === "desktop"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode("full")}
                  className={`p-1.5 rounded ${
                    previewMode === "full"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => setShowPreview((p) => !p)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded hover:bg-gray-100"
            >
              {showPreview ? (
                <>
                  <EyeOff className="h-4 w-4" /> Hide Preview
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" /> Show Preview
                </>
              )}
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* EDITOR PANEL */}
        <div
          className={`${
            showPreview ? (previewMode === "full" ? "w-1/3" : "w-1/2") : "w-full"
          } bg-white overflow-y-auto border-r transition-all`}
        >
          <div className="max-w-3xl mx-auto p-6">
            {cv.source === "upload" ? (
              <div className="text-center py-10">
                <Upload className="h-10 w-10 mx-auto text-blue-600 mb-3" />
                <h2 className="text-lg font-semibold mb-1">
                  Uploaded Resume Detected
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  You can view the original file or convert this into an editable
                  version.
                </p>
                <div className="flex justify-center gap-3 flex-wrap">
                  <a
                    href={`${import.meta.env.VITE_API_URL}${cv.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" /> View Original
                  </a>
                  <button
                    onClick={convertUploadedToEditable}
                    className="flex items-center gap-1.5 px-5 py-2 border border-blue-600 text-blue-600 text-sm rounded hover:bg-blue-50"
                  >
                    <FileText className="h-4 w-4" /> Convert to Editable
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* STEP HEADER */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {STEPS[step].label} Details
                    </h2>
                    <p className="text-xs text-gray-500">
                      Step {step + 1} of {STEPS.length}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {step > 0 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="flex items-center gap-1 text-sm border px-3 py-1.5 rounded hover:bg-gray-100"
                      >
                        <ChevronLeft className="h-4 w-4" /> Previous
                      </button>
                    )}
                    {step < STEPS.length - 1 && (
                      <button
                        onClick={() => setStep(step + 1)}
                        className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
                      >
                        Next <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center justify-between text-gray-500 text-xs mb-6">
                  {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setStep(i)}
                        className={`flex flex-col items-center ${
                          i === step ? "text-blue-600" : ""
                        }`}
                      >
                        <div
                          className={`p-2 rounded-full mb-1 ${
                            i === step ? "bg-blue-100" : "bg-gray-100"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        {s.label}
                      </button>
                    );
                  })}
                </div>

                {/* STEP CONTENT */}
                <div className="p-4 border rounded-md bg-gray-50">
                  {step === 0 && (
                    <BasicDetails
                      data={cv.content.basic || {}}
                      onChange={(data) =>
                        saveCV({ ...cv.content, basic: data })
                      }
                    />
                  )}
                  {step === 1 && (
                    <Education
                      data={cv.content.education || []}
                      onChange={(data) =>
                        saveCV({ ...cv.content, education: data })
                      }
                    />
                  )}
                  {step === 2 && (
                    <Experience
                      data={cv.content.experience || []}
                      onChange={(data) =>
                        saveCV({ ...cv.content, experience: data })
                      }
                    />
                  )}
                  {step === 3 && (
                    <Projects
                      data={cv.content.projects || []}
                      onChange={(data) =>
                        saveCV({ ...cv.content, projects: data })
                      }
                    />
                  )}
                  {step === 4 && (
                    <Skills
                      data={cv.content.skills || []}
                      onChange={(data) =>
                        saveCV({ ...cv.content, skills: data })
                      }
                    />
                  )}
                  {step === 5 && (
                    <>
                      <Certificates
                        data={cv.content.certificates || []}
                        onChange={(data) =>
                          saveCV({ ...cv.content, certificates: data })
                        }
                      />
                      <div className="mt-6 border-t pt-4 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          {saving ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500" />{" "}
                              Saved
                            </>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={async () => {
                              await saveCV({ ...cv.content }, "completed");
                              navigate("/dashboard");
                            }}
                            className="flex items-center gap-1 border px-4 py-1.5 rounded hover:bg-gray-100"
                          >
                            <Save className="h-4 w-4" /> Save & Exit
                          </button>
                          <button
                            onClick={async () => {
                              await saveCV({ ...cv.content }, "completed");
                              navigate(`/payment?cvId=${cv._id}`);
                            }}
                            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                          >
                            <Download className="h-4 w-4" /> Download
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* PREVIEW PANEL */}
        {showPreview && (
          <div
            className={`${
              previewMode === "full" ? "w-2/3" : "w-1/2"
            } bg-white overflow-y-auto`}
          >
            <div className="p-6">
              {cv.source === "upload" ? (
                <iframe
                  src={`${import.meta.env.VITE_API_URL}${cv.fileUrl}`}
                  className="w-full h-[80vh] border rounded"
                  title="Uploaded Resume"
                />
              ) : (
                <ResumePreview
                  key={cv.updatedAt || Date.now()}
                  content={cv.content}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}