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
        <section className="py-12 md:py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Title - Better mobile sizing */}
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 lg:mb-16 text-center`}>
                    <FormattedText text={content.sectionTitle} />
                </h2>

                {/* Cards Grid - Tighter spacing on mobile */}
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
