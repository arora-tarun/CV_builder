import React, { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DownloadIcon,
  ShareIcon,
} from "@heroicons/react/outline";

export default function ResumeCard({
  item,
  onEdit,
  onPreview,
  onDownload,
  onShare,
  onDelete,
  isLayout = false,
  onUse,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition p-3 relative">
      {/* Thumbnail + Preview */}
      <div className="relative h-40 bg-gray-100 rounded-md overflow-hidden mb-3">
        <img
          src={item.thumbnail || "/assets/pdf-thumbnail.png"}
          alt={item.title}
          className="h-full w-full object-cover"
        />

        <span className="absolute top-2 left-2 text-xs bg-blue-600 text-white rounded px-2 py-0.5">
          {item.source === "upload" ? "Uploaded" : "Template"}
        </span>

        {/* Preview overlay */}
        <button
          onClick={onPreview}
          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 flex items-center justify-center text-white text-sm font-medium transition"
        >
          <EyeIcon className="w-5 h-5 mr-1" />
          Preview
        </button>
      </div>

      {/* Content */}
      <div>
        <h3 className="font-semibold text-gray-900 text-sm truncate">
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          {item.templateName || "Custom Template"}
        </p>

        {isLayout ? (
          <button
            onClick={onUse}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition flex items-center justify-center gap-1"
          >
            <PencilIcon className="w-4 h-4" />
            Use This Template
          </button>
        ) : (
          <>
            {/* Main actions */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={onEdit}
                className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center justify-center gap-1"
              >
                <PencilIcon className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={onDelete}
                className="w-full py-1.5 border border-red-300 text-red-600 hover:bg-red-50 rounded text-sm flex items-center justify-center gap-1"
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </button>
            </div>

            {/* Secondary actions */}
            <div className="flex justify-between text-xs text-gray-600 mt-3">
              <button
                onClick={onDownload}
                className="hover:text-blue-600 flex items-center gap-1 transition"
              >
                <DownloadIcon className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={onShare}
                className="hover:text-blue-600 flex items-center gap-1 transition"
              >
                <ShareIcon className="w-4 h-4" />
                Share
              </button>
            </div>
          </>
        )}
      </div>

      {/* Click-away close area (logic unchanged) */}
      {menuOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setMenuOpen(false)} />
      )}
    </div>
  );
}