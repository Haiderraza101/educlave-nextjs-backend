"use client";

import { AlertTriangle } from "lucide-react";

export default function Error({ error }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-500 w-12 h-12" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500 text-sm mb-4">{error}</p>
        <p className="text-red-400 text-sm italic mb-6">{error?.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
