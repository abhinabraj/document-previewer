export interface Section {
  id: number;
  title: string;
  type: string;
  label: string;
  content: {
    value: string;
    confidence: number;
    is_valid_format: boolean;
    orig_value: string;
    page: number;
    position: number[];
    review_required: boolean;
    validation_source: string;
  };
  children: Section[];
}

export interface SelectedSection {
  id: number;
  position: number[];
}
