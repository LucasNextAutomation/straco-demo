export type ProjectStatus = "permitting" | "construction" | "sales" | "delivered"

export interface StracoProject {
  id: string
  name: string
  city: string
  region: "Antwerpen" | "Vlaams-Brabant" | "Brussels" | "Oost-Vlaanderen"
  assetClass: "Residential" | "Mixed-use" | "Industrial" | "Office"
  status: ProjectStatus
  units: number
  unitsSold: number
  gfa: number // gross floor area in m2
  expectedDelivery: string
  salesVelocity: number[] // last 8 months, units sold per month
  occupancy?: number // for delivered investment properties
  totalValue: number // EUR
  // Map positioning (Belgium bounding box: lat ~50-51.5, lng ~2.5-6)
  lat: number
  lng: number
}

export const STRACO_PROJECTS: StracoProject[] = [
  {
    id: "STR-001",
    name: "Mirador",
    city: "Antwerpen",
    region: "Antwerpen",
    assetClass: "Residential",
    status: "sales",
    units: 124,
    unitsSold: 98,
    gfa: 18400,
    expectedDelivery: "Q4 2026",
    salesVelocity: [6, 8, 9, 12, 11, 14, 16, 22],
    totalValue: 62000000,
    lat: 51.2194,
    lng: 4.4025,
  },
  {
    id: "STR-002",
    name: "Park aan de Stroom",
    city: "Hemiksem",
    region: "Antwerpen",
    assetClass: "Residential",
    status: "construction",
    units: 86,
    unitsSold: 52,
    gfa: 12800,
    expectedDelivery: "Q2 2027",
    salesVelocity: [4, 5, 7, 6, 8, 9, 7, 6],
    totalValue: 38500000,
    lat: 51.1350,
    lng: 4.3450,
  },
  {
    id: "STR-003",
    name: "Rivus",
    city: "Deurne",
    region: "Antwerpen",
    assetClass: "Mixed-use",
    status: "sales",
    units: 78,
    unitsSold: 71,
    gfa: 11200,
    expectedDelivery: "Q3 2026",
    salesVelocity: [8, 9, 10, 12, 11, 9, 7, 5],
    totalValue: 41200000,
    lat: 51.2280,
    lng: 4.4620,
  },
  {
    id: "STR-004",
    name: "Nexuss",
    city: "Schelle",
    region: "Antwerpen",
    assetClass: "Residential",
    status: "permitting",
    units: 62,
    unitsSold: 0,
    gfa: 9400,
    expectedDelivery: "Q1 2028",
    salesVelocity: [0, 0, 0, 0, 0, 0, 0, 0],
    totalValue: 28900000,
    lat: 51.1170,
    lng: 4.3330,
  },
  {
    id: "STR-005",
    name: "The Meadow",
    city: "Zaventem",
    region: "Vlaams-Brabant",
    assetClass: "Residential",
    status: "construction",
    units: 94,
    unitsSold: 38,
    gfa: 14100,
    expectedDelivery: "Q3 2027",
    salesVelocity: [3, 5, 6, 7, 6, 8, 5, 4],
    totalValue: 44800000,
    lat: 50.8845,
    lng: 4.4705,
  },
  {
    id: "STR-006",
    name: "De Naeyer",
    city: "Willebroek",
    region: "Antwerpen",
    assetClass: "Residential",
    status: "delivered",
    units: 112,
    unitsSold: 112,
    gfa: 16800,
    expectedDelivery: "Delivered 2024",
    salesVelocity: [0, 0, 0, 0, 0, 0, 0, 0],
    occupancy: 96.4,
    totalValue: 52100000,
    lat: 51.0600,
    lng: 4.3620,
  },
  {
    id: "STR-007",
    name: "Kanaelzicht",
    city: "Willebroek",
    region: "Antwerpen",
    assetClass: "Mixed-use",
    status: "delivered",
    units: 68,
    unitsSold: 68,
    gfa: 10200,
    expectedDelivery: "Delivered 2023",
    salesVelocity: [0, 0, 0, 0, 0, 0, 0, 0],
    occupancy: 98.1,
    totalValue: 31400000,
    lat: 51.0690,
    lng: 4.3580,
  },
  {
    id: "STR-008",
    name: "Loods 31",
    city: "Aalst",
    region: "Oost-Vlaanderen",
    assetClass: "Industrial",
    status: "delivered",
    units: 24,
    unitsSold: 24,
    gfa: 21500,
    expectedDelivery: "Delivered 2022",
    salesVelocity: [0, 0, 0, 0, 0, 0, 0, 0],
    occupancy: 94.7,
    totalValue: 18600000,
    lat: 50.9380,
    lng: 4.0405,
  },
]

export const PORTFOLIO_STATS = {
  activeProjects: 8,
  inPipeline: 2000,
  countries: 6,
  totalGFA: 114400,
  pipelineValue: 317500000,
  avgOccupancy: 96.4,
  teamSize: 22,
  yearsInMarket: 30,
}

export const WEEKLY_BRIEF = {
  generatedAt: "2026-04-14T07:00:00Z",
  headline:
    "Mirador outselling forecast by 31% — +6 units reserved this week. The Meadow velocity dipped below plan in Zaventem.",
  positives: [
    "Mirador — 22 units reserved week-over-week (vs. 12-unit avg). Advance Phase 2 pricing by 3% recommended.",
    "Rivus — Deurne ~91% sold. Final 7 units absorbed faster than base case.",
    "Kanaelzicht — occupancy reached 98.1% with May renewals locked.",
  ],
  concerns: [
    "The Meadow (Zaventem) — sales velocity down 33% vs. 3-month avg. Marketing channel audit queued.",
    "Loods 31 (Aalst) — one industrial tenant lease expires Q3 2026. Proactive renewal outreach needed.",
    "Nexuss (Schelle) — permit response overdue from omgevingsloket. Legal escalation on 2026-04-22.",
  ],
  signals: [
    { label: "Permit activity nearby", value: "3 new" },
    { label: "Comp sales (Antwerpen)", value: "+4.2% QoQ" },
    { label: "KBO ownership changes", value: "12 flagged" },
  ],
}
