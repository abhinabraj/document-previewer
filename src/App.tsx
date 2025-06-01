import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import AppLayout from "./AppLayout";

function App() {
  return (
    <>
      <MantineProvider>
        <div className="dark bg-white dark:bg-slate-800 dark:text-white w-screen h-screen">
          <AppLayout />
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
