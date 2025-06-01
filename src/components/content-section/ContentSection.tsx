import { Checkbox } from "@mantine/core";
import ContentInitial from "./ContentInitial";
import { IoMdMore } from "react-icons/io";
import type { SelectedSection } from "../../interface/section.interface";
// import type { Section } from "../../interface/section.interface";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sectionData: any;
  onCheckboxClick: (id: number) => void;
  selectedSection: SelectedSection[];
}

export default function ContentSection({
  sectionData,
  onCheckboxClick,
  selectedSection,
}: Props) {
  return (
    <div className="dark:bg-slate-700 flex justify-between p-2 mb-3">
      <div className="flex gap-2">
        <ContentInitial />
        <div className="">
          <div>{sectionData?.label}</div>
          <div>{sectionData?.content?.value}</div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox
          onChange={() => onCheckboxClick(sectionData.id)}
          checked={selectedSection
            .map((sel) => sel.id)
            .includes(sectionData.id)}
        />
        <IoMdMore className="text-2xl" />
      </div>
    </div>
  );
}
