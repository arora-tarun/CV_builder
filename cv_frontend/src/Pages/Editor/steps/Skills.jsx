import { PlusIcon } from "@heroicons/react/outline";
import { Code, X, TrendingUp } from "lucide-react";
// import { useState } from "react";

export default function Skills({ data = [], onChange }) {
  const addSkill = () => {
    onChange([...data, { name: "", level: 50 }]);
  };

  const updateSkill = (index, key, value) => {
    const updated = [...data];
    updated[index][key] = value;
    onChange(updated);
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const getLevelColor = (level) => {
    if (level >= 80) return "from-emerald-500 to-green-600";
    if (level >= 60) return "from-blue-500 to-indigo-600";
    if (level >= 40) return "from-amber-500 to-orange-500";
    return "from-gray-400 to-gray-500";
  };

  const getLevelLabel = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 60) return "Intermediate";
    if (level >= 40) return "Beginner";
    return "Novice";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {data.map((skill, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
                  <Code className="h-5 w-5 text-indigo-600" />
                </div>

                <div className="flex-1">
                  <input
                    className="text-lg font-semibold bg-transparent border-none focus:outline-none w-full mb-1"
                    placeholder="Skill Name (e.g., React, Python, UI/UX)"
                    value={skill.name || ""}
                    onChange={(e) =>
                      updateSkill(i, "name", e.target.value)
                    }
                  />
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <TrendingUp className="h-3 w-3" />
                    <span>{getLevelLabel(skill.level || 0)} Level</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeSkill(i)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>

            {/* Skill Level Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-500">
                  Proficiency Level
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    {skill.level || 0}%
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {getLevelLabel(skill.level || 0)}
                  </span>
                </div>
              </div>

              {/* Visual Slider */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-500 [&::-webkit-slider-thumb]:shadow-lg"
                  value={skill.level || 0}
                  onChange={(e) =>
                    updateSkill(i, "level", parseInt(e.target.value))
                  }
                />
                
                {/* Progress Bar Visualization */}
                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getLevelColor(skill.level || 0)} rounded-full transition-all duration-300`}
                      style={{ width: `${skill.level || 0}%` }}
                    ></div>
                  </div>
                  
                  {/* Level Markers */}
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* Quick Level Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { label: "Beginner", value: 40 },
                  { label: "Intermediate", value: 60 },
                  { label: "Advanced", value: 80 },
                  { label: "Expert", value: 95 },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={() => updateSkill(i, "level", btn.value)}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                      (skill.level || 0) >= btn.value - 10 && (skill.level || 0) <= btn.value + 10
                        ? "bg-indigo-100 text-indigo-700 font-medium"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Button */}
      <button
        type="button"
        onClick={addSkill}
        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 hover:text-indigo-600 hover:border-indigo-400 rounded-xl hover:bg-indigo-50 transition-all duration-200 group"
      >
        <div className="p-1.5 bg-gray-100 group-hover:bg-indigo-100 rounded-lg transition-colors">
          <PlusIcon className="h-4 w-4 group-hover:text-indigo-600" />
        </div>
        <span className="font-medium">Add New Skill</span>
      </button>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl bg-gradient-to-b from-gray-50 to-white">
          <div className="inline-flex p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-4">
            <Code className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Skills Added Yet
          </h3>
          <p className="text-gray-600 max-w-sm mx-auto mb-4">
            Add your technical and professional skills to showcase your expertise.
          </p>
          <button
            onClick={addSkill}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <PlusIcon className="h-4 w-4" />
            Add Your First Skill
          </button>
        </div>
      )}
    </div>
  );
}