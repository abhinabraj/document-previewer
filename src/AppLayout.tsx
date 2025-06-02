import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import ImageCanvas from "./components/image-canvas/ImageCanvas";
import type { Section, SelectedSection } from "./interface/section.interface";
import SectionData from "./assets/data/sections.json";
import LoadingOverlay from "./components/LoadingOverlay";

export default function AppLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState<SelectedSection[]>([]);
  const [allSections, setAllSections] = useState<Section[]>([]);
  const [hoveredSectionId, setHoveredSectionId] = useState<number | null>(null);

  const selectSection = (selectedSection: SelectedSection) => {
    setSelectedSection((prevList) => [...prevList, selectedSection]);
  };

  const deselectSection = (id: number) => {
    setSelectedSection((prevList) =>
      prevList.filter((section) => section.id !== id)
    );
  };

  useEffect(() => {
    setIsLoading(true);
    const sections = SectionData.data.sections[0].children as Section[];
    setAllSections(sections);
    setIsLoading(false);
  }, []);

  return (
    <section className="flex flex-col h-screen">
      <Navbar />
      {isLoading && <LoadingOverlay />}
      <main className="flex flex-1 overflow-hidden gap-2">
        <section className="flex-1 border-3 bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 overflow-auto">
          <ImageCanvas
            selectedSection={selectedSection}
            setHoveredSectionId={setHoveredSectionId}
            hoveredSectionId={hoveredSectionId}
            allSections={allSections}
          />
        </section>
        <Sidebar
          selectSection={selectSection}
          deselectSection={deselectSection}
          selectedSection={selectedSection}
          hoveredSectionId={hoveredSectionId}
          setHoveredSectionId={setHoveredSectionId}
          allSections={allSections}
          setAllSections={setAllSections}
        />
      </main>
    </section>
  );
}
