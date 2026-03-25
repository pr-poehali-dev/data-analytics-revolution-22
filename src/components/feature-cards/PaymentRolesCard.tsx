import { ArrowUpRight } from "lucide-react"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"

export function PaymentRolesCard() {
  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a]">
        <Icon name="Shield" size={20} className="text-gray-400" fallback="Shield" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Управление тарифами</h3>
      <p className="mb-4 text-sm text-gray-400">Администратор устанавливает тарифы и коэффициенты потерь для точного начисления</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto space-y-4 rounded-xl bg-[#1a1a1a] border border-[#262626] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center">
              <Icon name="User" size={16} className="text-violet-400" fallback="User" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Иванов И.И.</p>
              <p className="text-xs text-gray-500">Счётчики: З-14, С-23</p>
            </div>
          </div>
          <button className="text-sm text-violet-400 hover:text-violet-300">Изменить</button>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-1 text-xs text-gray-400">
            Действующий тариф
          </label>
          <div className="flex items-center justify-between rounded-lg bg-[#0f0f0f] border border-[#262626] px-3 py-2.5">
            <span className="text-sm text-white">4,85 ₽ / кВт·ч</span>
            <span className="text-xs text-gray-500">актуальный</span>
          </div>
          <p className="mt-1 text-xs text-gray-500">Коэффициент потерь: 1,03</p>
        </div>

        <div className="border-t border-dashed border-[#333] pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Начисление за март</p>
              <p className="text-xs text-gray-500">153 кВт·ч × 4,85 × 1,03</p>
            </div>
            <p className="text-white font-semibold">764 ₽</p>
          </div>
        </div>

        <Button className="w-full bg-[#252525] text-gray-400 hover:bg-[#2a2a2a] hover:text-white">Просмотр деталей</Button>
      </div>
    </div>
  )
}
