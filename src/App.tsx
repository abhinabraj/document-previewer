import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import AppLayout from "./AppLayout";
import { DarkModeProvider } from "./components/DarkModeContext";

export default function App() {
  return (
    <>
      <DarkModeProvider>
        <MantineProvider>
          <div className="bg-white dark:bg-slate-800 dark:text-white w-screen h-screen">
            <AppLayout />
          </div>
        </MantineProvider>
      </DarkModeProvider>
    </>
  );
}
