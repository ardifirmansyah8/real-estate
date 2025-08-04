"use client";

interface NavigationProps {
  activeTab: "all" | "published" | "draft";
  onTabChange: (tab: "all" | "published" | "draft") => void;
}

export default function Navigation({
  activeTab,
  onTabChange,
}: NavigationProps) {
  const tabs = [
    { id: "all", label: "All Properties" },
    { id: "published", label: "Published" },
    { id: "draft", label: "Draft" },
  ] as const;

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
