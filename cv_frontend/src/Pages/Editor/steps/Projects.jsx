import { PlusIcon } from "@heroicons/react/outline";
import { FolderKanban, X, Tag } from "lucide-react";
import { useState } from "react";

export function Projects({ data = [], onChange }) {
  const [techInput, setTechInput] = useState("");

  const add = () =>
    onChange([...data, { title: "", technologies: [], description: "" }]);

  const update = (i, key, value) => {
    const copy = [...data];
    copy[i][key] = value;
    onChange(copy);
  };

  const remove = (i) => {
    onChange(data.filter((_, idx) => idx !== i));
  };

  // Add technology to specific project
  const addTechnology = (i, tech) => {
    if (!tech.trim()) return;
    const copy = [...data];
    if (!copy[i].technologies) {
      copy[i].technologies = [];
    }
    copy[i].technologies = [...copy[i].technologies, tech.trim()];
    onChange(copy);
    setTechInput("");
  };

  // Remove technology from specific project
  const removeTechnology = (i, techIndex) => {
    const copy = [...data];
    copy[i].technologies = copy[i].technologies.filter(
      (_, index) => index !== techIndex
    );
    onChange(copy);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {data.map((p, i) => (
          <div key={i} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <FolderKanban className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <input
                    className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0 w-full mb-1"
                    placeholder="Project Title"
                    value={p.title || ""}
                    onChange={(e) => update(i, "title", e.target.value)}
                  />
                  {/* Removed the old tech input field */}
                </div>
              </div>
              <button
                onClick={() => remove(i)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>

            {/* ADDED: Technologies Section */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Technologies Used
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {p.technologies?.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm"
                  >
                    <Tag className="h-3 w-3" />
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(i, techIndex)}
                      className="ml-1 text-purple-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {(!p.technologies || p.technologies.length === 0) && (
                  <p className="text-sm text-gray-400 italic">
                    No technologies added yet
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Add a technology (e.g., React, Node.js, MongoDB)"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addTechnology(i, techInput);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => addTechnology(i, techInput)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Project Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm h-24 resize-none"
                placeholder="Describe the project, your role, and key achievements..."
                value={p.description || ""}
                onChange={(e) => update(i, "description", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-400 rounded-xl hover:bg-blue-50 transition-colors"
      >
        <PlusIcon className="h-5 w-5" />
        Add Project
      </button>
    </div>
  );
}

export default Projects;