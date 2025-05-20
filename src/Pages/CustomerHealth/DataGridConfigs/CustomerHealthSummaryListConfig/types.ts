export interface CustomerHealthRow {
  id: string;
  customer: string;
  overallHealth: "critical" | "atRisk" | "stable";
  unresolvedAlerts: number | string;
  directoryMonitor: "critical" | "atRisk" | "stable" | "cell";
  rmqStatistics: "critical" | "atRisk" | "stable" | "cell";
}
