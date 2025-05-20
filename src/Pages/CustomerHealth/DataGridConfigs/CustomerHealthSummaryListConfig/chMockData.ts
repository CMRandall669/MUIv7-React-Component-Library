import type { CustomerHealthRow } from "./types";

export const mockCustomerHealthData: CustomerHealthRow[] = [
  {
    id: "ajm", // ✅ add this
    customer: "AJM",
    overallHealth: "critical",
    unresolvedAlerts: 317,
    directoryMonitor: "critical",
    rmqStatistics: "critical",
  },
  {
    id: "zeta",
    customer: "Zeta Corp",
    overallHealth: "atRisk",
    unresolvedAlerts: 125,
    directoryMonitor: "stable",
    rmqStatistics: "atRisk",
  },
  {
    id: "beta",
    customer: "Beta Ltd",
    overallHealth: "stable",
    unresolvedAlerts: 0,
    directoryMonitor: "stable",
    rmqStatistics: "stable",
  },
];