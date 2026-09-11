import { PlusIcon } from "@heroicons/react/outline";
import { Briefcase, X, Tag } from "lucide-react";
import { useState } from "react";

const emptyExperience = {
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  technologies: [],
};

export function Experience({ data = [], onChange }) {
  const [techInput, setTechInput] = useState("");

  const addExp = () => {
    onChange([...(data || []), { ...emptyExperience }]);
  };

  const update = (i, key, value) => {
    const updated = [...data];
    updated[i] = { ...updated[i], [key]: value };
    onChange(updated);
  };

  const remove = (i) => {
    const updated = data.filter((_, index) => index !== i);
    onChange(updated.length ? updated : [{ ...emptyExperience }]);
  };

  // Add technology to specific experience
  const addTechnology = (i, tech) => {
    if (!tech.trim()) return;
    const updated = [...data];
    if (!updated[i].technologies) {
      updated[i].technologies = [];
    }
    updated[i].technologies = [...updated[i].technologies, tech.trim()];
    onChange(updated);
    setTechInput("");
  };

  // Remove technology from specific experience
  const removeTechnology = (i, techIndex) => {
    const updated = [...data];
    updated[i].technologies = updated[i].technologies.filter(
      (_, index) => index !== techIndex
    );
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {(data.length ? data : [emptyExperience]).map((exp, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                  <Briefcase className="h-5 w-5 text-green-600" />
                </div>

                <div className="flex-1">
                  {/* FIXED: Role field - make sure this is updating correctly */}
                  <input
                    className="text-lg font-semibold bg-transparent border-none focus:outline-none w-full mb-1"
                    placeholder="Job Title / Role"
                    value={exp.role || ""}
                    onChange={(e) => update(i, "role", e.target.value)}
                  />

                  <input
                    className="text-sm text-gray-600 bg-transparent border-none focus:outline-none w-full"
                    placeholder="Company Name"
                    value={exp.company || ""}
                    onChange={(e) => update(i, "company", e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={() => remove(i)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Start Date
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Jan 2023"
                  value={exp.startDate || ""}
                  onChange={(e) => update(i, "startDate", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  End Date
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Present"
                  value={exp.endDate || ""}
                  onChange={(e) => update(i, "endDate", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Location
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Remote / City, Country"
                  value={exp.location || ""}
                  onChange={(e) => update(i, "location", e.target.value)}
                />
              </div>
            </div>

            {/* ADDED: Technologies Section */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-500 mb-2">
                Technologies & Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {exp.technologies?.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm"
                  >
                    <Tag className="h-3 w-3" />
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(i, techIndex)}
                      className="ml-1 text-blue-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {(!exp.technologies || exp.technologies.length === 0) && (
                  <p className="text-sm text-gray-400 italic">
                    No technologies added yet
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Add a technology (e.g., React, Node.js)"
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
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm h-24 resize-none"
                placeholder="Describe responsibilities, achievements, technologies used…"
                value={exp.description || ""}
                onChange={(e) => update(i, "description", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addExp}
        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-400 rounded-xl hover:bg-blue-50 transition"
      >
        <PlusIcon className="h-5 w-5" />
        Add Experience
      </button>
    </div>
  );
}

export default Experience;