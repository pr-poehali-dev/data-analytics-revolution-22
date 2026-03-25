import { ArrowUpRight } from "lucide-react"
import Icon from "@/components/ui/icon"

export function SendFundsCard() {
  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a]">
        <Icon name="BarChart2" size={20} className="text-gray-400" fallback="BarChart2" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Потребление по месяцам</h3>
      <p className="mb-4 text-sm text-gray-400">Следите за динамикой потребления и переплатой или задолженностью в реальном времени</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto space-y-4 rounded-xl bg-[#1a1a1a] border border-[#262626] p-4">
        <div className="space-y-2">
          {[
            { month: "Январь", kwh: 98, amount: 490 },
            { month: "Февраль", kwh: 145, amount: 726 },
            { month: "Март", kwh: 153, amount: 764 },
          ].map((row) => (
            <div key={row.month} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-16">{row.month}</span>
              <div className="flex-1 bg-[#0f0f0f] rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-violet-600 rounded-full transition-all"
                  style={{ width: `${(row.kwh / 200) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-14 text-right">{row.kwh} кВт</span>
              <span className="text-xs text-white w-14 text-right">{row.amount} ₽</span>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-[#333] pt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={14} className="text-green-400" fallback="TrendingUp" />
            <span className="text-xs text-gray-400">Баланс</span>
          </div>
          <div className="text-right">
            <span className="text-green-400 font-semibold text-sm">+236 ₽</span>
            <p className="text-xs text-gray-600">переплата</p>
          </div>
        </div>

        <div className="rounded-lg bg-[#0f0f0f] border border-[#1a1a1a] px-3 py-2 flex items-center gap-2">
          <Icon name="Upload" size={14} className="text-violet-400" fallback="Upload" />
          <span className="text-xs text-gray-400">Прикрепить чек оплаты (фото / PDF)</span>
        </div>
      </div>
    </div>
  )
}
