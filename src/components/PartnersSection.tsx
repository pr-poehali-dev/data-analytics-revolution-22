import Icon from "@/components/ui/icon"

const groups = [
  { name: "Группа «Звезда»", sub: "З-0 — З-50", icon: "Star" },
  { name: "Группа «Строитель»", sub: "С-1—С-48, С-50—С-70", icon: "Building2" },
  { name: "З-26 в Строителе", sub: "Специальный счётчик", icon: "Zap" },
  { name: "Онлайн-оплата", sub: "Фото и PDF квитанций", icon: "CreditCard" },
  { name: "Баланс и долги", sub: "Переплата и задолженность", icon: "BarChart2" },
  { name: "Архив показаний", sub: "История по месяцам", icon: "Archive" },
]

export function PartnersSection() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-4 py-8">
      {groups.map((g) => (
        <div key={g.name} className="flex items-center gap-2 text-gray-500">
          <Icon name={g.icon as "Star"} size={14} className="text-violet-500/70" fallback="Circle" />
          <div>
            <span className="text-sm font-medium text-gray-400">{g.name}</span>
            <span className="text-xs text-gray-600 ml-1.5">{g.sub}</span>
          </div>
        </div>
      ))}
    </section>
  )
}
