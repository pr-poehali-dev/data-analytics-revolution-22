import { ArrowUpRight } from "lucide-react"
import Icon from "@/components/ui/icon"

const meters = [
  { id: "З-14", group: "Звезда", reading: "1 398 кВт·ч", color: "bg-amber-600" },
  { id: "З-26", group: "Строитель", reading: "2 104 кВт·ч", color: "bg-violet-600" },
  { id: "С-23", group: "Строитель", reading: "3 567 кВт·ч", color: "bg-blue-600" },
  { id: "С-45", group: "Строитель", reading: "891 кВт·ч", color: "bg-teal-600" },
]

export function LinkAccountsCard() {
  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a]">
        <Icon name="Zap" size={20} className="text-gray-400" fallback="Zap" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Все счётчики в одном окне</h3>
      <p className="mb-4 text-sm text-gray-400">Счётчики групп «Звезда» и «Строитель» — передавайте показания и контролируйте потребление</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto space-y-2 rounded-xl bg-[#1a1a1a] border border-[#262626] p-3">
        {meters.map((m, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg bg-[#0f0f0f] px-3 py-2">
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-lg ${m.color} flex items-center justify-center text-xs font-bold text-white`}>
                {m.id.split("-")[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{m.id}</p>
                <p className="text-xs text-gray-500">{m.group}</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">{m.reading}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
