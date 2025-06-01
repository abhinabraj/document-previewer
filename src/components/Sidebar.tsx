import ContentSection from "./content-section/ContentSection";
import SectionData from "../assets/data/sections.json";
import type { SelectedSection } from "../interface/section.interface";
import { Checkbox } from "@mantine/core";

interface Props {
  selectSection: (selectedSection: SelectedSection) => void;
  deselectSection: (id: number) => void;
  selectedSection: SelectedSection[];
}
const sections = SectionData.data.sections[0].children;

export default function Sidebar({
  selectedSection,
  selectSection,
  deselectSection,
}: Props) {
  const handleCheckboxClick = (id: number) => {
    const foundSection = sections.find((section) => section.id === id);
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
      sections.forEach((section) => {
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

  return (
    <aside className="w-[550px] border p-3 h-full flex flex-col">
      <div className="flex-1  h-full overflow-y-auto">
        <h1 className="font-bold text-lg my-2">Fields</h1>
        <div className="tab p-2 border-blue-500 border-b-3 mb-3">
          <span>Regular Fields</span>
        </div>
        <div className="tab-content">
          {sections.map((data, index) => (
            <ContentSection
              key={index}
              sectionData={data}
              onCheckboxClick={handleCheckboxClick}
              selectedSection={selectedSection}
            />
          ))}
        </div>
      </div>
      <div className="pt-4 px-3 border-t mt-2 flex justify-between">
        <div className="dark:bg-slate-600 p-3 dark:text-white flex gap-2 items-center">
          <Checkbox onChange={handleSelectAll} />
          Select all
        </div>
        <button className="dark:bg-slate-600 p-3 dark:text-white ml-3">
          Confirm
        </button>
      </div>
    </aside>
  );
}
