export interface SectionContent {
  confidence: number;
  is_valid_format: boolean;
  orig_value: string;
  page: number;
  position: number[];
  review_required: boolean;
  validation_source: string;
  value: string;
}

export interface Section {
  acc: number;
  content: SectionContent;
  doc_id: string;
  format: string;
  format_message: string;
  id: number;
  id_auto_extract: number;
  id_auto_extract_label: string;
  ignore: boolean;
  label: string;
  low_confidence: boolean;
  no_items_row: number;
  order: number;
  org_id: string;
  p_title: string;
  p_type: string;
  parent_id: number;
  time_spent: number;
  type: string;
  user_id: string;
}

export interface SelectedSection {
  id: number;
  position: number[];
}
