export type FilterType = "dropdown" | "text";

export interface FilterConfigItem {
  key: string;              // Unique key used for value and API param
  label: string;            // Label to show on the field
  type: FilterType;         // "text" or "dropdown"
  options?: string[];       // Only for dropdowns
  defaultValue: string;     // Used for initial value and reset
}

export type FilterConfig = FilterConfigItem[];