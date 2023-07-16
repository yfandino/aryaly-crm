import React from "react";

export default function LinearProgress() {
  return (
    <div className="relative min-w-full h-1 bg-indigo-200 overflow-hidden -top-6">
      <div className="absolute h-full bg-indigo-800 animate-loading-first" />
      <div className="absolute h-full bg-indigo-800 animate-loading-second" />
    </div>
  );
}
