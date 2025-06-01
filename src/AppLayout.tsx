import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import ImageCanvas from "./components/image-canvas/ImageCanvas";
import type { SelectedSection } from "./interface/section.interface";
// import ImageContainer from "./components/image-canvas/ImageContainer";

export default function AppLayout() {
  const [selectedSection, setSelectedSection] = useState<SelectedSection[]>([]);

  const selectSection = (selectedSection: SelectedSection) => {
    setSelectedSection((prevList) => [...prevList, selectedSection]);
  };

  const deselectSection = (id: number) => {
    setSelectedSection((prevList) =>
      prevList.filter((section) => section.id !== id)
    );
  };

  return (
    <section className="flex flex-col h-screen">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">
        <section className="flex-1 border overflow-auto">
          <ImageCanvas selectedSection={selectedSection} />
        </section>
        <Sidebar
          selectSection={selectSection}
          deselectSection={deselectSection}
          selectedSection={selectedSection}
        />
      </main>
    </section>
  );
}
