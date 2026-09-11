import { useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  FileText,
  Camera,
} from "lucide-react";

export function BasicDetails({ data, onChange }) {
  // small helper to update fields
  const update = (key, value) => onChange({ ...data, [key]: value });

  const updateSocial = (platform, value) =>
    onChange({
      ...data,
      socials: { ...data.socials, [platform]: value },
    });

  useEffect(() => {}, [data]);

  return (
    <div className="space-y-6">
      {/* === Profile Section === */}
      <div className="border border-gray-200 bg-white rounded-lg p-6">
        <div className="flex items-center gap-3 mb-5">
          <Camera className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Profile Information
            </h3>
            <p className="text-sm text-gray-500">
              Basic details about you (no photo required)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="John Doe"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={data.name || ""}
                onChange={(e) => update("name", e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="john@example.com"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={data.email || ""}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="+1 (555) 123‑4567"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={data.phone || ""}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="City, Country"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={data.city || ""}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* === Summary === */}
      <div className="border border-gray-200 bg-white rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Professional Summary
          </h3>
        </div>
        <textarea
          placeholder="Write a short professional summary (3‑5 sentences) highlighting your key skills and goals..."
          className="w-full h-32 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
          value={data.summary || ""}
          onChange={(e) => update("summary", e.target.value)}
        />
      </div>

      {/* === Social Links === */}
      <div className="border border-gray-200 bg-white rounded-lg p-6">
        <div className="flex items-center gap-3 mb-5">
          <Globe className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Social Profiles
          </h3>
        </div>

        <div className="space-y-3">
          {/* LinkedIn */}
          <div className="flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-blue-600" />
            <input
              placeholder="https://linkedin.com/in/username"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={data.socials?.linkedin || ""}
              onChange={(e) => updateSocial("linkedin", e.target.value)}
            />
          </div>

          {/* GitHub */}
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5 text-gray-800" />
            <input
              placeholder="https://github.com/username"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={data.socials?.github || ""}
              onChange={(e) => updateSocial("github", e.target.value)}
            />
          </div>

          {/* Portfolio */}
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-600" />
            <input
              placeholder="https://yourportfolio.com"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={data.socials?.portfolio || ""}
              onChange={(e) => updateSocial("portfolio", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicDetails;