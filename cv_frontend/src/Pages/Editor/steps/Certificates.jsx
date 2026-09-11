import { PlusIcon } from "@heroicons/react/outline";
import { Award, Trash2 } from "lucide-react";
export function Certificates({ data = [], onChange }) {
  const add = () => {
    onChange([...data, { name: "", authority: "", year: "", link: "" }]);
  };

  const update = (i, field, value) => {
    const updated = [...data];
    updated[i][field] = value;
    onChange(updated);
  };

  const remove = (i) => {
    onChange(data.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {data.map((c, i) => (
          <div key={i} className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
                  <Award className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <input
                    className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0 w-full"
                    placeholder="Certificate Name"
                    value={c.name}
                    onChange={(e) => update(i, "name", e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={() => remove(i)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Issued By
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  placeholder="Organization/Authority"
                  value={c.authority}
                  onChange={(e) => update(i, "authority", e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Year Obtained
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  placeholder="2024"
                  value={c.year}
                  onChange={(e) => update(i, "year", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Certificate Link (Optional)
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                placeholder="https://example.com/certificate"
                value={c.link}
                onChange={(e) => update(i, "link", e.target.value)}
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
        Add Certificate
      </button>
    </div>
  );
}

export default Certificates;