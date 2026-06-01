/**
 * One-time: copy hardcoded innovation media from industries.ts into locale JSON.
 * Usage: node src/script/migrate-innovation-media-to-locales.cjs
 */
const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..", "..")
const enPath = path.join(root, "public/locales/en.json")
const arPath = path.join(root, "public/locales/ar.json")

const INNOVATION_HERO_VIDEO =
  "https://cdn.savvyworld.ai/master/PUDU_Industry_Solutions_29dd55ee9d.mp4"

const SCENARIO_IMAGE_BASE = "https://cdn.savvyworld.ai/master/Robtics-pages"

const INDUSTRY_SCENARIO_IMAGES = {
  "food-beverage": `${SCENARIO_IMAGE_BASE}/_68694792ca.webp`,
  retail: `${SCENARIO_IMAGE_BASE}/_80d200d980.webp`,
  hospitality: `${SCENARIO_IMAGE_BASE}/_aaa66f1fc9.webp`,
  "industrial-logistics": `${SCENARIO_IMAGE_BASE}/_c7680a5a1b.webp`,
  healthcare: `${SCENARIO_IMAGE_BASE}/_a81a02f812.webp`,
  transportation: `${SCENARIO_IMAGE_BASE}/_760afca0ea.webp`,
  "entertainment-sports": `${SCENARIO_IMAGE_BASE}/_c89f272bff.webp`,
  "real-estate": `${SCENARIO_IMAGE_BASE}/_494d2b48c7.webp`,
  education: `${SCENARIO_IMAGE_BASE}/_048eb90ab6.webp`,
  "public-service": `${SCENARIO_IMAGE_BASE}/_a81a02f812.webp`,
}

const INDUSTRY_IMAGES = {
  "food-beverage":
    "https://cdn.savvyworld.ai/master/Food_and_Beverage_ecca2bbd37.webp",
  retail: "https://cdn.savvyworld.ai/master/_a9690a9d5d.webp",
  hospitality: "https://cdn.savvyworld.ai/master/Hospitality_e4c88c98ae.webp",
  "industrial-logistics": "https://cdn.savvyworld.ai/master/_373b0fa367.webp",
  healthcare: "https://cdn.savvyworld.ai/master/_d8c688b5e6.webp",
  transportation:
    "https://cdn.savvyworld.ai/master/Transportation_and_Related_Service_ab54fbe5b6.webp",
  "entertainment-sports":
    "https://cdn.savvyworld.ai/master/Entertainment_and_Sports_03db28cf1f.webp",
  "real-estate":
    "https://cdn.savvyworld.ai/master/Residential_and_Office_Buildings_81b4141216.webp",
  education: "https://cdn.savvyworld.ai/master/_50cce29ac7.webp",
  "public-service": "https://cdn.savvyworld.ai/master/_fa2aeeca28.webp",
}

const RECOMMENDED_ROBOTS = {
  "food-beverage": ["holabot", "bellabot", "kettybot"],
  retail: ["bellabot", "kettybot", "flashbot"],
  hospitality: ["bellabot", "holabot", "kettybot"],
  "industrial-logistics": ["t300", "flashbot", "pudubot2"],
  healthcare: ["cc1", "kettybot", "pudubot2"],
  transportation: ["flashbot", "pudubot2", "t300"],
  "entertainment-sports": ["holabot", "bellabot", "kettybot"],
  "real-estate": ["cc1", "kettybot", "bellabot"],
  education: ["pudubot2", "kettybot", "holabot"],
  "public-service": ["cc1", "pudubot2", "t300"],
}

const USE_CASE_KEYS = {
  "food-beverage": [
    { slideKeys: ["holabot", "bellabot"], solutionKeys: ["holabot", "bellabot"] },
    { slideKeys: ["holabot", "kettybot"], solutionKeys: ["holabot", "kettybot"] },
  ],
  retail: [
    { slideKeys: ["bellabot", "flashbot"], solutionKeys: ["bellabot", "flashbot"] },
    { slideKeys: ["kettybot", "bellabot"], solutionKeys: ["kettybot", "bellabot"] },
  ],
  hospitality: [
    { slideKeys: ["holabot", "bellabot"], solutionKeys: ["holabot", "bellabot"] },
    { slideKeys: ["kettybot", "bellabot"], solutionKeys: ["kettybot", "bellabot"] },
  ],
  "industrial-logistics": [
    { slideKeys: ["flashbot", "t300", "pudubot2"], solutionKeys: ["t300", "flashbot"] },
    { slideKeys: ["t300", "pudubot2"], solutionKeys: ["t300", "pudubot2"] },
  ],
  healthcare: [
    { slideKeys: ["pudubot2", "kettybot"], solutionKeys: ["pudubot2", "kettybot"] },
    { slideKeys: ["cc1", "kettybot"], solutionKeys: ["cc1", "kettybot"] },
  ],
  transportation: [
    { slideKeys: ["pudubot2", "flashbot"], solutionKeys: ["pudubot2", "flashbot"] },
    { slideKeys: ["flashbot", "t300"], solutionKeys: ["flashbot", "t300"] },
  ],
  "entertainment-sports": [
    { slideKeys: ["holabot", "bellabot"], solutionKeys: ["holabot", "bellabot"] },
    { slideKeys: ["kettybot", "holabot"], solutionKeys: ["kettybot", "holabot"] },
  ],
  "real-estate": [
    { slideKeys: ["bellabot", "kettybot"], solutionKeys: ["bellabot", "kettybot"] },
    { slideKeys: ["kettybot", "cc1"], solutionKeys: ["kettybot", "cc1"] },
  ],
  education: [
    { slideKeys: ["pudubot2", "holabot"], solutionKeys: ["pudubot2", "holabot"] },
    { slideKeys: ["kettybot", "pudubot2"], solutionKeys: ["kettybot", "pudubot2"] },
  ],
  "public-service": [
    { slideKeys: ["pudubot2"], solutionKeys: ["pudubot2"] },
    { slideKeys: ["t300", "cc1"], solutionKeys: ["t300", "cc1"] },
  ],
}

const ROBOT_IMAGES = {
  bellabot:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  kettybot:
    "https://images.unsplash.com/photo-1535378648346-b14a50899904?auto=format&fit=crop&w=800&q=80",
  holabot:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  flashbot:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  cc1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
  t300: "https://images.unsplash.com/photo-1565514020169-026cb4c4a2de?auto=format&fit=crop&w=800&q=80",
  pudubot2:
    "https://images.unsplash.com/photo-1526378722484-34553a2b2d7c?auto=format&fit=crop&w=800&q=80",
}

const ROBOT_NAME_TO_KEY = {
  bellabot: "bellabot",
  kettybot: "kettybot",
  holabot: "holabot",
  flashbot: "flashbot",
  cc1: "cc1",
  t300: "t300",
  pudubot2: "pudubot2",
  "pudubot 2": "pudubot2",
  "pudu t300": "t300",
  "pudu bot 2": "pudubot2",
}

function robotKeyFromName(name) {
  if (!name || typeof name !== "string") return null
  const normalized = name.trim().toLowerCase().replace(/\s+/g, "")
  for (const [label, key] of Object.entries(ROBOT_NAME_TO_KEY)) {
    if (normalized.includes(label.replace(/\s+/g, ""))) return key
  }
  return null
}

function patchInnovation(innovation) {
  innovation.hero = innovation.hero || {}
  if (!innovation.hero.videoUrl) {
    innovation.hero.videoUrl = INNOVATION_HERO_VIDEO
  }

  innovation.robots = innovation.robots || {}
  for (const [key, imageUrl] of Object.entries(ROBOT_IMAGES)) {
    innovation.robots[key] = innovation.robots[key] || {}
    if (!innovation.robots[key].imageUrl) {
      innovation.robots[key].imageUrl = imageUrl
    }
  }

  innovation.industries = innovation.industries || {}
  for (const [slug, imageUrl] of Object.entries(INDUSTRY_IMAGES)) {
    const industry = innovation.industries[slug] || {}
    if (!industry.imageUrl) industry.imageUrl = imageUrl
    if (!industry.recommendedRobots) {
      industry.recommendedRobots = RECOMMENDED_ROBOTS[slug] || []
    }
    if (Array.isArray(industry.scenarios)) {
      industry.scenarios = industry.scenarios.map((scenario, index) => ({
        ...scenario,
        imageUrl:
          scenario.imageUrl ||
          INDUSTRY_SCENARIO_IMAGES[slug] ||
          imageUrl,
      }))
    }
    if (Array.isArray(industry.useCases)) {
      const keys = USE_CASE_KEYS[slug] || []
      industry.useCases = industry.useCases.map((useCase, index) => {
        const cfg = keys[index] || { slideKeys: [], solutionKeys: [] }
        const next = {
          ...useCase,
          slideKeys: useCase.slideKeys || cfg.slideKeys,
          solutionKeys: useCase.solutionKeys || cfg.solutionKeys,
        }
        if (Array.isArray(next.slides)) {
          next.slides = next.slides.map((slide, slideIndex) => {
            const robotKey =
              cfg.slideKeys?.[slideIndex] || robotKeyFromName(slide.robotName)
            return {
              ...slide,
              imageUrl:
                slide.imageUrl ||
                (robotKey ? ROBOT_IMAGES[robotKey] : "") ||
                "",
            }
          })
        }
        if (Array.isArray(next.solutions)) {
          next.solutions = next.solutions.map((solution, solutionIndex) => {
            const robotKey =
              cfg.solutionKeys?.[solutionIndex] ||
              robotKeyFromName(solution.name)
            return {
              ...solution,
              imageUrl:
                solution.imageUrl ||
                (robotKey ? ROBOT_IMAGES[robotKey] : "") ||
                "",
            }
          })
        }
        return next
      })
    }
    innovation.industries[slug] = industry
  }

  return innovation
}

function patchLocale(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"))
  data.innovation = patchInnovation(data.innovation || {})
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`)
  console.log(`Patched ${filePath}`)
}

patchLocale(enPath)
patchLocale(arPath)
console.log("Done.")
