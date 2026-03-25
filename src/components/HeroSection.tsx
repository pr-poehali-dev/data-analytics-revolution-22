import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onLoginClick: () => void
}

export function HeroSection({ onLoginClick }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-12 pb-8 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] py-2 text-sm px-2">
        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-400">ОНЛАЙН</span>
        <span className="text-gray-300">Передавайте показания и оплату в любое время</span>
        <ArrowUpRight className="h-4 w-4 text-gray-400" />
      </div>

      <h1 className="mb-4 max-w-3xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
        Учёт электроэнергии в одном месте
      </h1>

      <p className="mb-8 max-w-xl text-gray-400">
        Группы «Звезда» и «Строитель» — передавайте показания счётчиков, отслеживайте потребление и контролируйте баланс онлайн.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          onClick={onLoginClick}
          className="rounded-full bg-violet-600 px-6 hover:bg-violet-700 text-white"
        >
          Войти в личный кабинет <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
