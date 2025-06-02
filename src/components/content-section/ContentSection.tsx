import ContentInitial from "./ContentInitial";
import { IoMdMore } from "react-icons/io";
import type {
  Section,
  SelectedSection,
} from "../../interface/section.interface";
import { useEffect, useRef, useState } from "react";

interface Props {
  sectionData: Section;
  selectedSection: SelectedSection[];
  isHovered: boolean;
  onCheckboxClick: (id: number) => void;
  onRemoveSection: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function ContentSection({
  sectionData,
  onCheckboxClick,
  selectedSection,
  isHovered,
  onRemoveSection,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={` bg-slate-100 dark:bg-slate-700 flex justify-between p-2 mb-3 ${
        isHovered ? "border-blue-600 border-3" : ""
      }`}
    >
      <div className="flex gap-3 items-start p-1">
        <div className="text-white font-bold rounded-md w-9 h-9 flex items-center justify-center text-sm">
          <ContentInitial title={sectionData?.label} />
        </div>

        <div className="dark:text-white text-gray-700">
          <div className="font-medium leading-none">{sectionData.label}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {sectionData.content?.value}
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-slate-700 dark:border-gray-600"
          onChange={() => onCheckboxClick(sectionData.id)}
          checked={selectedSection
            .map((sel) => sel.id)
            .includes(sectionData.id)}
        />
        <div className="relative" ref={menuRef}>
          <IoMdMore className="text-2xl" onClick={() => setMenuOpen(true)} />
          {menuOpen && (
            <div className="absolute right-0 bg-slate-200 dark:bg-slate-500 rounded-md shadow-lg w-40">
              <div
                className="flex gap-2 items-center cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 p-2"
                onClick={onRemoveSection}
              >
                <div className="dark:text-white text-gray-700">Remove</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
