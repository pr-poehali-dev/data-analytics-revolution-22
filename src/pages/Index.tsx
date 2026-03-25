import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { PartnersSection } from "@/components/PartnersSection"
import { FeaturesSection } from "@/components/FeaturesSection"

interface IndexProps {
  onLoginClick: () => void
}

export default function Index({ onLoginClick }: IndexProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Header onLoginClick={onLoginClick} />
      <HeroSection onLoginClick={onLoginClick} />
      <PartnersSection />
      <FeaturesSection />
      <footer className="py-8 text-center text-sm text-gray-400">
        Группы «Звезда» и «Строитель» —{" "}
        <span className="font-medium text-white">учёт, оплата и контроль в одном месте.</span>
      </footer>
    </main>
  )
}
