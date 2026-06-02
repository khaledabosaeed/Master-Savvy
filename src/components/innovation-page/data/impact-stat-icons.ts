import {
  BarChart3,
  Bot,
  Building2,
  CalendarDays,
  Clock,
  Droplets,
  Flag,
  FlaskConical,
  GraduationCap,
  Heart,
  MapPin,
  Monitor,
  Package,
  Pill,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Warehouse,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react"

export const IMPACT_STAT_ICON_KEYS = [
  "accuracy",
  "automation",
  "building",
  "cleaning",
  "cost",
  "delivery",
  "digitization",
  "education",
  "efficiency",
  "events",
  "experience",
  "guidance",
  "maintenance",
  "medicine",
  "productivity",
  "production",
  "samples",
  "sanitization",
  "safety",
  "service",
  "speed",
  "transport",
  "uptime",
  "warehouse",
  "workforce",
] as const

export type ImpactStatIconKey = (typeof IMPACT_STAT_ICON_KEYS)[number]

export const IMPACT_STAT_ICONS: Record<ImpactStatIconKey, LucideIcon> = {
  accuracy: Flag,
  automation: Bot,
  building: Building2,
  cleaning: Sparkles,
  cost: Wallet,
  delivery: Package,
  digitization: Monitor,
  education: GraduationCap,
  efficiency: TrendingUp,
  events: CalendarDays,
  experience: Heart,
  guidance: MapPin,
  maintenance: Wrench,
  medicine: Pill,
  productivity: BarChart3,
  production: Wrench,
  samples: FlaskConical,
  sanitization: Droplets,
  safety: ShieldCheck,
  service: Bot,
  speed: Zap,
  transport: Truck,
  uptime: Clock,
  warehouse: Warehouse,
  workforce: Users,
}

export function getImpactStatIcon(key: string): LucideIcon {
  if (IMPACT_STAT_ICON_KEYS.includes(key as ImpactStatIconKey)) {
    return IMPACT_STAT_ICONS[key as ImpactStatIconKey]
  }

  return BarChart3
}
