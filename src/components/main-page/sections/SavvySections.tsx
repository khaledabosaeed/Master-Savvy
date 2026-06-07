"use client"

import { useTranslation } from "react-i18next"
import SavvySectionCard from "./SavvySectionCard"
import FormattedText from "@/components/shared/FormattedText"

type SavvySectionCardData = {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
  image: string
  link: string
  buttonText: string
}

export default function SavvySections() {
    const { t } = useTranslation()
    const content = t("savvySections", { returnObjects: true }) as {
      sectionTitle: string
      cards: SavvySectionCardData[]
    }

    return (
        <section className="bg-[oklch(0.99_0.004_255)] py-14 md:py-18 lg:py-24">
            <div className="container">
                <h2
                    id="savvy-sections-title"
                    className="mx-auto mb-8 max-w-3xl text-center text-2xl font-extrabold leading-tight text-gray-950 md:mb-12 md:text-4xl lg:mb-16"
                >
                    <FormattedText text={content.sectionTitle} />
                </h2>

                <div className="space-y-6 md:space-y-8">
                    {content.cards.map((card, index) => (
                        <SavvySectionCard
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            features={card.features}
                            icon={card.icon}
                            image={card.image}
                            link={card.link}
                            buttonText={card.buttonText}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
