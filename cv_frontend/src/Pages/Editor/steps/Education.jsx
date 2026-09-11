import { PlusIcon } from "@heroicons/react/outline";
import { GraduationCap, X } from "lucide-react";

const emptyEducation = {
  degree: "",
  institution: "",
  startYear: "",
  endYear: "",
  percentage: "",
};

export function Education({ data = [], onChange }) {
  const add = () => {
    onChange([...(data || []), { ...emptyEducation }]);
  };

  const update = (i, key, value) => {
    const copy = [...data];
    copy[i] = { ...copy[i], [key]: value };
    onChange(copy);
  };

  const remove = (i) => {
    const copy = data.filter((_, idx) => idx !== i);
    onChange(copy.length ? copy : [{ ...emptyEducation }]);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {(data.length ? data : [emptyEducation]).map((edu, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 w-full">
                <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>

                <div className="flex-1">
                  <input
                    className="text-lg font-semibold bg-transparent border-none focus:outline-none w-full mb-1"
                    placeholder="Degree (e.g., B.Tech Computer Science)"
                    value={edu.degree || ""}
                    onChange={(e) =>
                      update(i, "degree", e.target.value)
                    }
                  />

                  <input
                    className="text-sm text-gray-600 bg-transparent border-none focus:outline-none w-full"
                    placeholder="University / Institution"
                    value={edu.institution || ""}
                    onChange={(e) =>
                      update(i, "institution", e.target.value)
                    }
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Start Year
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="2020"
                  value={edu.startYear || ""}
                  onChange={(e) =>
                    update(i, "startYear", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  End Year
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="2024"
                  value={edu.endYear || ""}
                  onChange={(e) =>
                    update(i, "endYear", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Grade / Percentage
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="8.5 CGPA / 85%"
                  value={edu.percentage || ""}
                  onChange={(e) =>
                    update(i, "percentage", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-400 rounded-xl hover:bg-blue-50 transition"
      >
        <PlusIcon className="h-5 w-5" />
        Add Education
      </button>
    </div>
  );
}

export default Education;
