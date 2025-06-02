import { useDarkMode } from "./DarkModeContext";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <nav className="p-5 border-b-3 border-slate-200 dark:border-slate-600">
      <ul className="flex justify-between items-center">
        <li className="text-lg">Review Screen</li>
        <li>
          <button
            onClick={toggleDarkMode}
            className={`w-14 h-8 flex items-center px-1 rounded-full transition-colors duration-300 ${
              darkMode ? "bg-slate-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 bg-white flex items-center justify-center text-xs ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {darkMode ? "🌙" : "☀️"}
            </div>
          </button>
        </li>
      </ul>
    </nav>
  );
}
