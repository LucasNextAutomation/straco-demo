export type PipelineStage = "new" | "skip_traced" | "sequence_active" | "replied" | "meeting_set"

export interface OutreachLead {
  id: string
  ownerName: string
  propertyAddress: string
  city: string
  state: string
  units: number
  distressScore: number
  distressSignals: string[]
  phone: string | null
  email: string | null
  mailingAddress: string
  stage: PipelineStage
  skipTraceStatus: "hit" | "miss" | "pending"
  sequenceDay: number | null
  lastActivity: string
  openRate: number | null
  replied: boolean
  meetingDate: string | null
}

// For the Portfolio demo, each "lead" represents a Straco development / investment project.
// "distressScore" is repurposed as a portfolio health score (0-10, higher = healthier / more active).
// "distressSignals" become key project milestones or status notes.
// Pipeline stages map to: new = permitting, skip_traced = construction, sequence_active = sales, replied = near-completion, meeting_set = delivered.

export const outreachLeads: OutreachLead[] = [
  {
    id: "PROJ-MIR",
    ownerName: "Mirador Antwerp",
    propertyAddress: "Scheldekaai 142, 2000 Antwerpen",
    city: "Antwerpen",
    state: "VL",
    units: 118,
    distressScore: 6.5,
    distressSignals: ["Permit phase — omgevingsvergunning pending", "Pre-sales open Q3 2026"],
    phone: "+32 3 232 11 40",
    email: "mirador@stracorealestate.be",
    mailingAddress: "Brusselsesteenweg 197, 9090 Melle",
    stage: "new",
    skipTraceStatus: "pending",
    sequenceDay: null,
    lastActivity: "Omgevingsvergunning submitted \u2014 decision expected Jun 2026",
    openRate: null,
    replied: false,
    meetingDate: null,
  },
  {
    id: "PROJ-RIV",
    ownerName: "Rivus Deurne",
    propertyAddress: "Kloosterstraat 18, 2100 Deurne",
    city: "Deurne",
    state: "VL",
    units: 84,
    distressScore: 8.2,
    distressSignals: ["Construction 45% complete", "62% units sold", "On schedule Q3 2027"],
    phone: "+32 3 888 24 66",
    email: "rivus@stracorealestate.be",
    mailingAddress: "Brusselsesteenweg 197, 9090 Melle",
    stage: "sequence_active",
    skipTraceStatus: "hit",
    sequenceDay: 12,
    lastActivity: "Weekly site report \u2014 structural concrete Floor 6 complete",
    openRate: 78,
    replied: true,
    meetingDate: null,
  },
  {
    id: "PROJ-PKS",
    ownerName: "Park aan de Stroom",
    propertyAddress: "Zuidersluis 4, 2030 Antwerpen",
    city: "Antwerpen",
    state: "VL",
    units: 210,
    distressScore: 9.1,
    distressSignals: ["Phase 1: 62% sold", "Construction finishing works started", "Phase 2 pre-sales Q1 2027"],
    phone: "+32 3 232 88 15",
    email: "parkstroom@stracorealestate.be",
    mailingAddress: "Brusselsesteenweg 197, 9090 Melle",
    stage: "sequence_active",
    skipTraceStatus: "hit",
    sequenceDay: 8,
    lastActivity: "Sales velocity +18% vs. forecast \u2014 pricing review this week",
    openRate: 94,
    replied: true,
    meetingDate: null,
  },
  {
    id: "PROJ-NEX",
    ownerName: "Nexuss Gent",
    propertyAddress: "Nieuwe Dokken, Gent",
    city: "Gent",
    state: "VL",
    units: 142,
    distressScore: 7.4,
    distressSignals: ["Sales phase open", "38% units reserved after 4 weeks", "Marketing campaign live"],
    phone: "+32 9 245 60 02",
    email: "nexuss@stracorealestate.be",
    mailingAddress: "Brusselsesteenweg 197, 9090 Melle",
    stage: "sequence_active",
    skipTraceStatus: "hit",
    sequenceDay: 5,
    lastActivity: "Open house this weekend \u2014 34 viewings booked",
    openRate: 71,
    replied: false,
    meetingDate: null,
  },
  {
    id: "PROJ-DNA",
    ownerName: "De Naeyer",
    propertyAddress: "Kanaaldijk 22, 2850 Boom",
    city: "Boom",
    state: "VL",
    units: 96,
    distressScore: 8.8,
    distressSignals: ["Phase 2 permit approved today", "Notify 23-person waiting list"],
    phone: "+32 3 880 14 22",
    email: "denaeyer@stracorealestate.be",
    mailingAddress: "Brusselsesteenweg 197, 9090 Melle",
    stage: "new",
    skipTraceStatus: "hit",
    sequenceDay: null,
    lastActivity: "Permit granted \u2014 sales launch materials to update",
    openRate: null,
    replied: false,
    meetingDate: "2026-05-02T10:00:00",
  },
  {
    id: "PROJ-MDW",
    ownerName: "The Meadow",
    propertyAddress: "Kanaalzicht 12, 9000 Gent",
    city: "Gent",
    state: "VL",
    units: 48,
    distressScore: 9.4,
    distressSignals: ["Investment portfolio \u2014 94% occupied", "2 leases expiring Q1 2027", "Lease renewal outreach due"],
    phone: "+32 9 245 33 18",
    email: "meadow@stracorealestate.be",
    mailingAddress: "Brusselsesteenweg 197, 9090 Melle",
    stage: "replied",
    skipTraceStatus: "hit",
    sequenceDay: 22,
    lastActivity: "2 tenants opened renewal conversation \u2014 positive signal",
    openRate: 89,
    replied: true,
    meetingDate: null,
  },
  {
    id: "PROJ-KZC",
    ownerName: "Kanaelzicht",
    propertyAddress: "Kanaelzicht 8, 9500 Geraardsbergen",
    city: "Geraardsbergen",
    state: "VL",
    units: 54,
    distressScore: 5.8,
    distressSignals: ["Sales 87% complete", "3 units stale >90 days", "Price review recommended"],
    phone: "+32 54 41 20 08",
    email: "kanaelzicht@stracorealestate.be",
    mailingAddress: "Brusselsesteenweg 197, 9090 Melle",
    stage: "sequence_active",
    skipTraceStatus: "hit",
    sequenceDay: 19,
    lastActivity: "AI flagged 3 stale units \u2014 suggest 4-6% price reduction",
    openRate: 62,
    replied: false,
    meetingDate: null,
  },
  {
    id: "PROJ-L31",
    ownerName: "Loods 31 Mechelen",
    propertyAddress: "Industriepark 31, 2800 Mechelen",
    city: "Mechelen",
    state: "VL",
    units: 0,
    distressScore: 7.2,
    distressSignals: ["Industrial investment \u2014 100% occupied", "Long-lease tenant (18 yrs remaining)"],
    phone: "+32 15 41 88 02",
    email: "loods31@stracorealestate.be",
    mailingAddress: "Brusselsesteenweg 197, 9090 Melle",
    stage: "meeting_set",
    skipTraceStatus: "hit",
    sequenceDay: 31,
    lastActivity: "Delivered 2024 \u2014 stabilized operations",
    openRate: 100,
    replied: true,
    meetingDate: "2026-04-22T14:00:00",
  },
]

export const emailSequence = [
  {
    day: 1,
    channel: "email" as const,
    subject: "Project kickoff notification \u2014 {{address}}",
    preview: "Hi team,\n\nNew phase milestone on {{address}}: permit granted / sales opening / construction milestone as applicable. Project dashboard has been updated.\n\nStraco Portfolio Automation",
    status: "sent" as const,
  },
  {
    day: 3,
    channel: "sms" as const,
    subject: "",
    preview: "Portfolio alert: {{address}} has a status change. Check dashboard for details.",
    status: "sent" as const,
  },
  {
    day: 7,
    channel: "email" as const,
    subject: "Weekly portfolio intelligence \u2014 {{city}} projects",
    preview: "Weekly AI brief: velocity, risks, stale inventory, and next-week priorities across Straco's Flanders + Brussels portfolio.\n\nSee dashboard for full report.\n\nStraco Portfolio Automation",
    status: "queued" as const,
  },
  {
    day: 14,
    channel: "email" as const,
    subject: "Milestone recap \u2014 {{address}}",
    preview: "Final recap for the week's milestones at {{address}}. All next-step tasks assigned and tracked.",
    status: "queued" as const,
  },
]

export const outreachStats = {
  totalLeads: 25,
  skipTraceHitRate: 98,
  openRate: 82,
  replyRate: 47,
  meetingsSet: 4,
  pipelineValue: 48600000,
  sequencesActive: 12,
  avgResponseTime: "1.4 days",
}
