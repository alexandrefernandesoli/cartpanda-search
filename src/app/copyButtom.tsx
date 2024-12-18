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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {text}
      </button>
      <ToastWithTailwind open={open} />
    </>
  );
}

function ToastWithTailwind({ open }: { open: boolean }) {
  if (!open) return null;
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 absolute bottom-4 right-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-green-400"
              xmlns="http://www.w3.org/
2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              Successfully copied to clipboard
            </p>
          </div>
        </div>
        <div className="pl-3 ml-4">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M14.293 5.293a1 1 0 00-1.414 0L10 8.586 6.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 001.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
