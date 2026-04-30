"use client"

import PageServices, { type ServiceData } from "@/components/shared/PageServices"
import { Leaf, Bot, Car, Brain, Handshake } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function InnovationServices() {
  const { t } = useTranslation()

  const services: ServiceData[] = [
    {
      id: 1,
      title: t("innovation.services.service1Title"),
      description: t("innovation.services.service1Description"),
      icon: Leaf,
    },
    {
      id: 2,
      title: t("innovation.services.service2Title"),
      description: t("innovation.services.service2Description"),
      icon: Bot,
    },
    {
      id: 3,
      title: t("innovation.services.service3Title"),
      description: t("innovation.services.service3Description"),
      icon: Car,
    },
    {
      id: 4,
      title: t("innovation.services.service4Title"),
      description: t("innovation.services.service4Description"),
      icon: Brain,
    },
    {
      id: 5,
      title: t("innovation.services.service5Title"),
      description: t("innovation.services.service5Description"),
      icon: Handshake,
    },
  ]

  return (
    <PageServices
      title={t("innovation.services.title")}
      services={services}
    />
  )
}
