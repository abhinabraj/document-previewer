import "./App.css";
import AppLayout from "./AppLayout";
import { DarkModeProvider } from "./components/DarkModeContext";

export default function App() {
  return (
    <>
      <DarkModeProvider>
        <div className="bg-white dark:bg-slate-800 dark:text-white w-screen h-screen">
          <AppLayout />
        </div>
      </DarkModeProvider>
    </>
  );
}
