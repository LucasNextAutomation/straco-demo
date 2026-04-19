export interface Deal {
  id: string
  address: string
  city: string
  state: string
  county: string
  units: number
  class: "C" | "B-" | "B" | "C+"
  yearBuilt: number
  sqft: number
  lotSize: string
  askingPrice: number | null
  estimatedValue: number
  pricePerUnit: number
  currentNOI: number
  proFormaNOI: number
  capRate: number
  proFormaCapRate: number
  cashOnCash: number
  irr5yr: number
  equityMultiple: number
  dscr: number
  rentPerUnit: number
  fairMarketRent: number
  valueAddUpside: number
  distressScore: number
  distressSignals: string[]
  ownerName: string
  ownerType: "LLC" | "Individual" | "Trust" | "Estate"
  ownerAddress: string
  ownershipYears: number
  phone: string | null
  email: string | null
  taxStatus: string
  mortgageBalance: number | null
  assessedValue: number
  lastSaleDate: string
  lastSalePrice: number
  lienHistory: string[]
  source: string[]
  dateFound: string
  status: "new" | "contacted" | "underwriting" | "passed"
  unitMix: { type: string; count: number; rent: number }[]
  expenses: { category: string; annual: number }[]
  hidden?: boolean
}

export const mockDeals: Deal[] = [
  {
    id: "DEAL-BE-001",
    address: "Industrielaan 47",
    city: "Willebroek",
    state: "VL",
    county: "Antwerpen",
    units: 0,
    class: "C",
    yearBuilt: 1978,
    sqft: 45200,
    lotSize: "4,200 m\u00B2",
    askingPrice: null,
    estimatedValue: 2400000,
    pricePerUnit: 0,
    currentNOI: 0,
    proFormaNOI: 180000,
    capRate: 0,
    proFormaCapRate: 7.5,
    cashOnCash: 0,
    irr5yr: 18.4,
    equityMultiple: 2.05,
    dscr: 1.38,
    rentPerUnit: 0,
    fairMarketRent: 0,
    valueAddUpside: 35,
    distressScore: 8.4,
    distressSignals: [
      "Brownfield (light) — Bodemdecreet flag — remediation plan feasible",
      "Industrial zoning — conversion to residential under review at omgevingsloket",
      "Long-term ownership — 23 years",
      "Partial vacancy — 2 of 4 halls empty"
    ],
    ownerName: "NV Vanderstraeten Holdings",
    ownerType: "LLC",
    ownerAddress: "Brusselsesteenweg 420, 2800 Mechelen",
    ownershipYears: 23,
    phone: "+32 3 321 54 87",
    email: "info@vanderstraeten.be",
    taxStatus: "Current",
    mortgageBalance: 520000,
    assessedValue: 1980000,
    lastSaleDate: "2003-11-14",
    lastSalePrice: 640000,
    lienHistory: [],
    source: ["Belgian Cadastre", "Omgevingsloket (permit portal)", "KBO business registry"],
    dateFound: "2026-04-14",
    status: "new",
    unitMix: [
      { type: "Industrial hall 1", count: 1, rent: 3800 },
      { type: "Industrial hall 2", count: 1, rent: 3800 },
      { type: "Office block", count: 1, rent: 2400 }
    ],
    expenses: [
      { category: "Property tax (onroerende voorheffing)", annual: 38000 },
      { category: "Insurance", annual: 14000 },
      { category: "Maintenance + repairs", annual: 22000 },
      { category: "Soil monitoring (Bodemdecreet)", annual: 8500 },
      { category: "Utilities + common area", annual: 11000 },
      { category: "Vacancy reserve", annual: 12500 }
    ]
  },
  {
    id: "DEAL-BE-002",
    address: "Nieuwe Dokken Kaai 28",
    city: "Gent",
    state: "VL",
    county: "Oost-Vlaanderen",
    units: 0,
    class: "B-",
    yearBuilt: 1965,
    sqft: 22800,
    lotSize: "2,100 m\u00B2",
    askingPrice: 4800000,
    estimatedValue: 5100000,
    pricePerUnit: 0,
    currentNOI: 180000,
    proFormaNOI: 320000,
    capRate: 3.8,
    proFormaCapRate: 6.3,
    cashOnCash: 4.2,
    irr5yr: 16.8,
    equityMultiple: 1.82,
    dscr: 1.32,
    rentPerUnit: 0,
    fairMarketRent: 0,
    valueAddUpside: 28,
    distressScore: 7.1,
    distressSignals: [
      "Old office building — 1960s construction — conversion to apartments possible",
      "Partial vacancy — 40% empty since corporate tenant exit 2025",
      "Former owner passed away — estate sale",
      "Energy certificate: F — mandatory upgrade needed"
    ],
    ownerName: "Estate De Backer",
    ownerType: "Estate",
    ownerAddress: "c/o Notaris De Vos, Kortrijksesteenweg 156, 9000 Gent",
    ownershipYears: 31,
    phone: "+32 9 245 87 12",
    email: null,
    taxStatus: "Current",
    mortgageBalance: null,
    assessedValue: 4200000,
    lastSaleDate: "1994-06-22",
    lastSalePrice: 1100000,
    lienHistory: [],
    source: ["Belgian Cadastre", "Notarial announcement (staatsblad)", "Ghent energy database"],
    dateFound: "2026-04-11",
    status: "new",
    unitMix: [
      { type: "Office floor 1", count: 1, rent: 5200 },
      { type: "Office floor 2", count: 1, rent: 5200 },
      { type: "Retail ground", count: 1, rent: 4800 }
    ],
    expenses: [
      { category: "Property tax", annual: 42000 },
      { category: "Insurance", annual: 18000 },
      { category: "Energy + maintenance", annual: 48000 },
      { category: "Management (5%)", annual: 9000 },
      { category: "Vacancy reserve", annual: 15000 }
    ]
  },
  {
    id: "DEAL-BE-003",
    address: "Bouwgrond Rijksweg 12",
    city: "Hemiksem",
    state: "VL",
    county: "Antwerpen",
    units: 0,
    class: "C",
    yearBuilt: 0,
    sqft: 18000,
    lotSize: "1,670 m\u00B2",
    askingPrice: 780000,
    estimatedValue: 890000,
    pricePerUnit: 0,
    currentNOI: 0,
    proFormaNOI: 0,
    capRate: 0,
    proFormaCapRate: 0,
    cashOnCash: 0,
    irr5yr: 24.2,
    equityMultiple: 2.4,
    dscr: 0,
    rentPerUnit: 0,
    fairMarketRent: 0,
    valueAddUpside: 42,
    distressScore: 8.1,
    distressSignals: [
      "Raw building plot — zoning: woongebied met landelijk karakter",
      "Permit request pending at omgevingsloket — 16 units feasible",
      "Absentee owner — lives in Spain",
      "No mortgage — flexible seller"
    ],
    ownerName: "Mevr. Helena Claes",
    ownerType: "Individual",
    ownerAddress: "Carrer d'Iradier 12, 07015 Palma de Mallorca, Spain",
    ownershipYears: 12,
    phone: null,
    email: "hclaes@protonmail.ch",
    taxStatus: "Current",
    mortgageBalance: null,
    assessedValue: 720000,
    lastSaleDate: "2014-03-11",
    lastSalePrice: 420000,
    lienHistory: [],
    source: ["Belgian Cadastre", "Omgevingsloket permit tracker", "KBO absentee flag"],
    dateFound: "2026-04-15",
    status: "contacted",
    unitMix: [],
    expenses: [
      { category: "Property tax", annual: 6800 },
      { category: "Site security", annual: 3200 }
    ]
  },
  {
    id: "DEAL-BE-004",
    address: "Oude Stationsstraat 88",
    city: "Aalst",
    state: "VL",
    county: "Oost-Vlaanderen",
    units: 0,
    class: "C+",
    yearBuilt: 1972,
    sqft: 31500,
    lotSize: "2,820 m\u00B2",
    askingPrice: null,
    estimatedValue: 3250000,
    pricePerUnit: 0,
    currentNOI: 95000,
    proFormaNOI: 250000,
    capRate: 2.9,
    proFormaCapRate: 7.7,
    cashOnCash: 3.1,
    irr5yr: 21.5,
    equityMultiple: 2.2,
    dscr: 1.29,
    rentPerUnit: 0,
    fairMarketRent: 0,
    valueAddUpside: 34,
    distressScore: 7.6,
    distressSignals: [
      "Old office + warehouse — 1970s — mixed-use conversion possible",
      "Major tenant departing Q3 2026 — pre-empt opportunity",
      "Zoning allows residential conversion (woongebied)",
      "Estate-owned — 3 siblings, motivated sellers"
    ],
    ownerName: "Familie Peeters Estate",
    ownerType: "Estate",
    ownerAddress: "c/o Notaris Van den Broeck, Kerkstraat 12, 9300 Aalst",
    ownershipYears: 28,
    phone: "+32 53 41 22 08",
    email: null,
    taxStatus: "Current",
    mortgageBalance: 180000,
    assessedValue: 2700000,
    lastSaleDate: "1997-09-18",
    lastSalePrice: 880000,
    lienHistory: [],
    source: ["Belgian Cadastre", "Town hall zoning records", "Notarial announcement"],
    dateFound: "2026-04-09",
    status: "underwriting",
    unitMix: [
      { type: "Warehouse hall", count: 1, rent: 2400 },
      { type: "Office", count: 1, rent: 5500 }
    ],
    expenses: [
      { category: "Property tax", annual: 28000 },
      { category: "Insurance", annual: 10500 },
      { category: "Maintenance", annual: 22000 },
      { category: "Utilities", annual: 9500 },
      { category: "Management (6%)", annual: 6000 }
    ]
  },
  {
    id: "DEAL-BE-005",
    address: "Avenue Louise 284",
    city: "Brussel",
    state: "BR",
    county: "Brussels",
    units: 12,
    class: "B",
    yearBuilt: 1958,
    sqft: 16800,
    lotSize: "780 m\u00B2",
    askingPrice: 5200000,
    estimatedValue: 5400000,
    pricePerUnit: 433333,
    currentNOI: 285000,
    proFormaNOI: 410000,
    capRate: 5.5,
    proFormaCapRate: 7.9,
    cashOnCash: 5.8,
    irr5yr: 15.4,
    equityMultiple: 1.7,
    dscr: 1.45,
    rentPerUnit: 1680,
    fairMarketRent: 2200,
    valueAddUpside: 31,
    distressScore: 6.8,
    distressSignals: [
      "Under-rented by ~30% vs market (rent control history)",
      "Original 1960s finishes — renovation uplift 240/mo per unit",
      "Mortgage renewal due 2027 — refinance pressure"
    ],
    ownerName: "SCI Louise Residential",
    ownerType: "LLC",
    ownerAddress: "Rue de la Loi 42, 1000 Brussels",
    ownershipYears: 19,
    phone: "+32 2 540 88 11",
    email: "admin@sci-louise.be",
    taxStatus: "Current",
    mortgageBalance: 2100000,
    assessedValue: 4850000,
    lastSaleDate: "2006-07-09",
    lastSalePrice: 2900000,
    lienHistory: [],
    source: ["Belgian Cadastre", "Brussels capital region rent database"],
    dateFound: "2026-04-08",
    status: "contacted",
    unitMix: [
      { type: "1BR", count: 4, rent: 1400 },
      { type: "2BR", count: 6, rent: 1750 },
      { type: "3BR", count: 2, rent: 2100 }
    ],
    expenses: [
      { category: "Property tax", annual: 42000 },
      { category: "Insurance", annual: 18000 },
      { category: "Common area + cleaning", annual: 38000 },
      { category: "Maintenance", annual: 28000 },
      { category: "Management (6%)", annual: 17100 },
      { category: "Vacancy reserve", annual: 14250 }
    ]
  },
  {
    id: "DEAL-BE-006",
    address: "Scheldestraat 112",
    city: "Antwerpen",
    state: "VL",
    county: "Antwerpen",
    units: 0,
    class: "C",
    yearBuilt: 1984,
    sqft: 68000,
    lotSize: "6,150 m\u00B2",
    askingPrice: null,
    estimatedValue: 4100000,
    pricePerUnit: 0,
    currentNOI: 220000,
    proFormaNOI: 410000,
    capRate: 5.4,
    proFormaCapRate: 10.0,
    cashOnCash: 7.8,
    irr5yr: 22.1,
    equityMultiple: 2.35,
    dscr: 1.55,
    rentPerUnit: 0,
    fairMarketRent: 0,
    valueAddUpside: 46,
    distressScore: 9.1,
    distressSignals: [
      "Former textile factory — brownfield, remediation ordered",
      "Bodemdecreet Art. 101 certificate pending",
      "Owner company KBO status: 'in vereffening' (in liquidation)",
      "Curator seeking rapid sale"
    ],
    ownerName: "NV Textiel De Vries (in liquidation)",
    ownerType: "LLC",
    ownerAddress: "c/o Curator Van Mieghem, Lange Gasthuisstraat 33, 2000 Antwerp",
    ownershipYears: 41,
    phone: "+32 3 224 65 40",
    email: "curator@vanmieghem-law.be",
    taxStatus: "Delinquent (2025)",
    mortgageBalance: 1400000,
    assessedValue: 3200000,
    lastSaleDate: "1985-02-18",
    lastSalePrice: 380000,
    lienHistory: ["Bank lien (2019)", "Soil remediation notice (2024)"],
    source: ["Belgian Cadastre", "KBO liquidation registry", "Staatsblad announcement"],
    dateFound: "2026-04-15",
    status: "new",
    unitMix: [
      { type: "Industrial hall", count: 1, rent: 0 }
    ],
    expenses: [
      { category: "Property tax (delinquent)", annual: 52000 },
      { category: "Site security", annual: 14000 },
      { category: "Soil monitoring", annual: 12000 }
    ],
    hidden: true
  },
  {
    id: "DEAL-BE-007",
    address: "Kasteelstraat 24",
    city: "Mechelen",
    state: "VL",
    county: "Antwerpen",
    units: 8,
    class: "B",
    yearBuilt: 1992,
    sqft: 9800,
    lotSize: "920 m\u00B2",
    askingPrice: 2150000,
    estimatedValue: 2280000,
    pricePerUnit: 268750,
    currentNOI: 148000,
    proFormaNOI: 185000,
    capRate: 6.9,
    proFormaCapRate: 8.6,
    cashOnCash: 7.2,
    irr5yr: 14.1,
    equityMultiple: 1.68,
    dscr: 1.58,
    rentPerUnit: 1540,
    fairMarketRent: 1720,
    valueAddUpside: 12,
    distressScore: 5.2,
    distressSignals: [
      "Steady rent but under market by 12%",
      "Solo owner, age 72, exploring exit",
      "Clean title — no liens"
    ],
    ownerName: "Dhr. Marc Janssens",
    ownerType: "Individual",
    ownerAddress: "Bruul 88, 2800 Mechelen",
    ownershipYears: 22,
    phone: "+32 15 33 87 02",
    email: "m.janssens@telenet.be",
    taxStatus: "Current",
    mortgageBalance: null,
    assessedValue: 2050000,
    lastSaleDate: "2003-12-03",
    lastSalePrice: 790000,
    lienHistory: [],
    source: ["Belgian Cadastre", "KBO owner profile"],
    dateFound: "2026-04-05",
    status: "passed",
    unitMix: [
      { type: "1BR", count: 4, rent: 1380 },
      { type: "2BR", count: 4, rent: 1700 }
    ],
    expenses: [
      { category: "Property tax", annual: 18000 },
      { category: "Insurance", annual: 7200 },
      { category: "Maintenance", annual: 14000 },
      { category: "Management (5%)", annual: 8880 }
    ]
  },
  {
    id: "DEAL-BE-008",
    address: "Hofstraat 3",
    city: "Schelle",
    state: "VL",
    county: "Antwerpen",
    units: 0,
    class: "C",
    yearBuilt: 1965,
    sqft: 28500,
    lotSize: "3,200 m\u00B2",
    askingPrice: null,
    estimatedValue: 2950000,
    pricePerUnit: 0,
    currentNOI: 62000,
    proFormaNOI: 215000,
    capRate: 2.1,
    proFormaCapRate: 7.3,
    cashOnCash: 3.8,
    irr5yr: 23.4,
    equityMultiple: 2.42,
    dscr: 1.35,
    rentPerUnit: 0,
    fairMarketRent: 0,
    valueAddUpside: 41,
    distressScore: 8.6,
    distressSignals: [
      "Old farm + surrounding plot — hoeve with outbuildings",
      "Zoning: permitted rural residential 12 units",
      "Inherited — three siblings dividing estate",
      "Absentee co-owners (NL, DE, FR)"
    ],
    ownerName: "Erven Peeters-Verbeeck",
    ownerType: "Estate",
    ownerAddress: "c/o Notaris Smets, Dorpstraat 4, 2627 Schelle",
    ownershipYears: 46,
    phone: "+32 3 887 42 10",
    email: null,
    taxStatus: "Current",
    mortgageBalance: null,
    assessedValue: 2400000,
    lastSaleDate: "1980-04-28",
    lastSalePrice: 160000,
    lienHistory: [],
    source: ["Belgian Cadastre", "Notarial estate announcement", "Regional zoning map"],
    dateFound: "2026-04-15",
    status: "new",
    unitMix: [
      { type: "Farmhouse", count: 1, rent: 1200 },
      { type: "Barn (storage rental)", count: 1, rent: 800 }
    ],
    expenses: [
      { category: "Property tax", annual: 14000 },
      { category: "Insurance", annual: 6800 },
      { category: "Maintenance", annual: 12000 }
    ],
    hidden: true
  }
]

export const dashboardStats = {
  totalDealsFound: 38,
  newThisWeek: 9,
  highDistress: 6,
  avgCapRate: 5.9,
  totalUnits: 127,
  avgDistressScore: 7.4,
  countiesMonitored: 4,
  sourcesActive: 12,
  lastScanTime: "2026-04-15T09:14:00",
  countyBreakdown: [
    { county: "Antwerpen, VL", deals: 14, units: 42 },
    { county: "Oost-Vlaanderen, VL", deals: 11, units: 38 },
    { county: "Brussels Capital", deals: 7, units: 28 },
    { county: "Vlaams-Brabant, VL", deals: 6, units: 19 },
  ],
  signalBreakdown: [
    { signal: "Brownfield / Bodemdecreet flag", count: 9 },
    { signal: "Estate / Succession", count: 7 },
    { signal: "KBO liquidation (company in vereffening)", count: 4 },
    { signal: "Permit at omgevingsloket", count: 8 },
    { signal: "Under-rented vs market", count: 5 },
    { signal: "Absentee / abroad owner", count: 6 },
    { signal: "Long-term owner (20+ yrs)", count: 11 },
    { signal: "No mortgage (free and clear)", count: 5 },
    { signal: "Rural rezoning opportunity", count: 4 },
  ]
}
