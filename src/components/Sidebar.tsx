import ContentSection from "./content-section/ContentSection";
import type { Section, SelectedSection } from "../interface/section.interface";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface Props {
  allSections: Section[];
  selectedSection: SelectedSection[];
  hoveredSectionId: number | null;
  deselectSection: (id: number) => void;
  selectSection: (selectedSection: SelectedSection) => void;
  setHoveredSectionId: (id: number | null) => void;
  setAllSections: (sections: Section[]) => void;
}

export default function Sidebar({
  allSections,
  selectedSection,
  hoveredSectionId,
  selectSection,
  deselectSection,
  setHoveredSectionId,
  setAllSections,
}: Props) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleCheckboxClick = (id: number) => {
    const foundSection = allSections.find((section) => section.id === id);
    if (foundSection) {
      if (selectedSection.map((sel) => sel.id).includes(foundSection.id)) {
        deselectSection(id);
      } else {
        selectSection({
          id: foundSection.id,
          position: foundSection?.content?.position ?? [],
        });
      }
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      allSections.forEach((section) => {
        selectSection({
          id: section.id,
          position: section?.content?.position ?? [],
        });
      });
    } else {
      selectedSection.forEach((section) => {
        deselectSection(section.id);
      });
    }
  };

  const handleRemoveSection = (id: number) => {
    setAllSections(allSections.filter((section) => section.id !== id));
  };

  const handleConfirm = () => {
    setIsConfirmOpen(true);
  };

  return (
    <aside className="w-[550px] border-3 border-slate-200 dark:border-slate-600 p-3 h-full flex flex-col">
      <div className="flex-1  h-full overflow-y-auto">
        <h1 className="font-bold text-lg my-2">Fields</h1>
        <div className="tab p-2 border-blue-500 border-b-3 mb-3">
          <span>Regular Fields</span>
        </div>
        <div className="tab-content">
          {allSections.map((data, index) => (
            <ContentSection
              key={index}
              sectionData={data}
              onCheckboxClick={handleCheckboxClick}
              selectedSection={selectedSection}
              isHovered={hoveredSectionId === data.id}
              onMouseEnter={() => setHoveredSectionId(data.id)}
              onMouseLeave={() => setHoveredSectionId(null)}
              onRemoveSection={() => handleRemoveSection(data.id)}
            />
          ))}
        </div>
      </div>
      <div className="pt-4 px-3 border-t mt-2 flex justify-between">
        <div className="bg-slate-200 dark:bg-slate-600 p-3 dark:text-white text-gray-700 flex gap-2 items-center cursor-pointer">
          <input
            aria-label="Select all"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-slate-700 dark:border-gray-600"
            onChange={handleSelectAll}
          />
          Select all
        </div>
        <button
          className="bg-slate-200 dark:bg-slate-600 p-3 dark:text-white text-gray-700 ml-3 min-w-28 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
          onClick={handleConfirm}
          disabled={selectedSection.length <= 1}
        >
          Confirm
        </button>
      </div>
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Confirm?"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsSuccessOpen(true);
          setIsConfirmOpen(false);
        }}
      >
        <div>Are you sure you want to confirm the selected sections?</div>
        <div className="text-sm">
          {selectedSection.length} fields are selected
        </div>
      </ConfirmModal>
      <ConfirmModal
        isOpen={isSuccessOpen}
        title="Success"
        confirmText="Done"
        cancelText="Close"
        onCancel={() => setIsSuccessOpen(false)}
        onConfirm={() => setIsSuccessOpen(false)}
      >
        <div>
          You have successfully confirmed {selectedSection.length} fields{" "}
        </div>
      </ConfirmModal>
    </aside>
  );
}
