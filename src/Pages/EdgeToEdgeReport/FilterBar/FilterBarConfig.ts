import type { FilterConfig } from "../../../components/FilterBarComponents/types";

export const edgeToEdgeFilterConfig: FilterConfig = [
  {
    key: "customer",
    label: "Customer",
    type: "dropdown",
    options: ["Acme Corp", "Globex Inc", "Initech"],
    defaultValue: "",
  },
  
  {
    key: "site",
    label: "Site",
    type: "text",
    defaultValue: "",
  },

  {
    key: "docName",
    label: "Document Name",
    type: "text",
    defaultValue: "",
  },

  {
    key: "transType",
    label: "Transaction Type",
    type: "text",
    defaultValue: "",
  },

  {
    key: "direction",
    label: "Direction",
    type: "dropdown",
    options: ["Inbound", "Outbound", "Inbound and Outbound"],
    defaultValue: "",
  },
];