"use client"

import PageAbout from "@/components/shared/PageAbout"
import { useTranslation } from "react-i18next"

export default function InnovationAbout() {
  const { t } = useTranslation()

  const images = [
    { src: "/innovation/about/1.jpg", alt: "AI Innovation" },
    { src: "/innovation/about/2.png", alt: "Smart Technology" },
    { src: "/innovation/about/3.jpg", alt: "Sustainable Energy" },
    { src: "/innovation/about/4.jpg", alt: "Robotics" },
  ]

  return (
    <PageAbout
      title={t("innovation.about.title")}
      description={t("innovation.about.description")}
      images={images}
    />
  )
}
