"use client"

import PageServices, { type ServiceData } from "@/components/shared/PageServices"
import { Monitor, Bot, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function ExpoServices() {
  const { t } = useTranslation()

  const services: ServiceData[] = [
    {
      id: 1,
      title: t("expo.services.service1Title"),
      description: t("expo.services.service1Description"),
      icon: Monitor,
    },
    {
      id: 2,
      title: t("expo.services.service2Title"),
      description: t("expo.services.service2Description"),
      icon: Bot,
    },
    {
      id: 3,
      title: t("expo.services.service3Title"),
      description: t("expo.services.service3Description"),
      icon: Sparkles,
    },
  ]

  return (
    <PageServices
      title={t("expo.services.title")}
      subtitle={t("expo.services.subtitle")}
      services={services}
    />
  )
}
