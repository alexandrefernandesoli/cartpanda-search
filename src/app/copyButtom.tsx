"use client";

import React from "react";

export default function CopyButton({ text }: { text: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => {
          navigator.clipboard.writeText(text);
          setOpen(true);
          setTimeout(() => setOpen(false), 2000);
        }}
        className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        Copy
      </button>
      <ToastWithTailwind open={open} />
    </>
  );
}

function ToastWithTailwind({ open }: { open: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 max-w-md transform transition-all duration-300 ease-in-out">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 text-green-400">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900">
            Successfully copied to clipboard
          </p>
        </div>
      </div>
    </div>
  );
}
