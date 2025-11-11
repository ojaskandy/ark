import { useLocation } from "wouter";

export default function MainPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-8 text-gray-900">ark</h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/live-routine")}
            className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-900 font-medium transition-colors"
          >
            live routine
          </button>

          <button
            onClick={() => navigate("/challenges")}
            className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-900 font-medium transition-colors"
          >
            challenges
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            welcome to ark
          </h2>
          <p className="text-gray-600 text-lg">
            choose an option from the sidebar to get started
          </p>
        </div>
      </div>
    </div>
  );
}
