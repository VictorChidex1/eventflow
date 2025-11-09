import React from "react";

const TestComponent = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Tailwind CSS Test
      </h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Test Button
      </button>
      <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
        If this is styled, Tailwind is working! 🎉
      </div>
    </div>
  );
};

export default TestComponent;
