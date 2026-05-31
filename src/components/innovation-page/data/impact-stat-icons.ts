import {
  BarChart3,
  Bot,
  Clock,
  Flag,
  Monitor,
  Package,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export const IMPACT_STAT_ICON_KEYS = [
  "accuracy",
  "cleaning",
  "delivery",
  "digitization",
  "efficiency",
  "service",
  "safety",
  "automation",
  "uptime",
  "cost",
] as const

export type ImpactStatIconKey = (typeof IMPACT_STAT_ICON_KEYS)[number]

export const IMPACT_STAT_ICONS: Record<ImpactStatIconKey, LucideIcon> = {
  accuracy: Flag,
  cleaning: Sparkles,
  delivery: Package,
  digitization: Monitor,
  efficiency: TrendingUp,
  service: Bot,
  safety: ShieldCheck,
  automation: Bot,
  uptime: Clock,
  cost: Wallet,
}

export function getImpactStatIcon(key: string): LucideIcon {
  if (IMPACT_STAT_ICON_KEYS.includes(key as ImpactStatIconKey)) {
    return IMPACT_STAT_ICONS[key as ImpactStatIconKey]
  }

  return BarChart3
}
