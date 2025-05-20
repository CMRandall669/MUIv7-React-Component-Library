export interface CustomerHealthRow {
  customer: string;
  overallHealth: "critical" | "atRisk" | "stable";
  unresolvedAlerts: number | string;
  directoryMonitor: "critical" | "atRisk" | "stable" | "cell";
}
