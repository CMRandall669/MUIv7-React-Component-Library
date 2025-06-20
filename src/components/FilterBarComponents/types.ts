export type FilterType = "dropdown" | "text" | "static";

export type DropdownOption = string | { label: string; value: string };

interface BaseFilterConfigItem {
  key: string;
  label: string;
  type: FilterType;
}

interface TextFilterConfigItem extends BaseFilterConfigItem {
  type: "text";
  defaultValue: string;
}

interface DropdownFilterConfigItem extends BaseFilterConfigItem {
  type: "dropdown";
  options: DropdownOption[];
  defaultValue: string;
}

interface StaticFilterConfigItem extends BaseFilterConfigItem {
  type: "static";
  value: string;
}

export type FilterConfigItem =
  | TextFilterConfigItem
  | DropdownFilterConfigItem
  | StaticFilterConfigItem;

export type FilterConfig = FilterConfigItem[];