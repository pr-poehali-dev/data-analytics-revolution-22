import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

interface AdminDashboardProps {
  onLogout: () => void
}

const STAR_METERS = [
  ...Array.from({ length: 51 }, (_, i) => `З-${i}`),
]

const BUILDER_METERS = [
  ...Array.from({ length: 48 }, (_, i) => `С-${i + 1}`),
  ...Array.from({ length: 21 }, (_, i) => `С-${i + 50}`),
]

const MOCK_USERS = [
  { id: 1, name: "Иванов И.И.", username: "ivanov", meters: ["З-14", "С-23"] },
  { id: 2, name: "Петров П.П.", username: "petrov", meters: ["З-26"] },
  { id: 3, name: "Сидоров С.С.", username: "sidorov", meters: ["С-45", "С-67"] },
]

const MOCK_PAYMENTS = [
  { user: "Иванов И.И.", date: "10.03.2026", amount: 1530, status: "на проверке", meter: "З-14" },
  { user: "Петров П.П.", date: "12.03.2026", amount: 890, status: "на проверке", meter: "З-26" },
  { user: "Сидоров С.С.", date: "08.03.2026", amount: 2100, status: "учтена", meter: "С-45" },
]

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"users" | "meters" | "tariffs" | "payments">("users")
  const [tariff, setTariff] = useState("4.85")
  const [lossCoef, setLossCoef] = useState("1.03")
  const [tariffSaved, setTariffSaved] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<"star" | "builder">("star")
  const [payments, setPayments] = useState(MOCK_PAYMENTS)

  const handleSaveTariff = () => {
    setTariffSaved(true)
    setTimeout(() => setTariffSaved(false), 2000)
  }

  const handleApprovePayment = (idx: number) => {
    setPayments(prev => prev.map((p, i) => i === idx ? { ...p, status: "учтена" } : p))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="8" cy="8" r="3" fill="#8B5CF6" />
            <circle cx="16" cy="8" r="3" fill="#8B5CF6" opacity="0.6" />
            <circle cx="8" cy="16" r="3" fill="#8B5CF6" opacity="0.6" />
            <circle cx="16" cy="16" r="3" fill="#8B5CF6" opacity="0.4" />
          </svg>
          <span className="text-lg font-semibold text-white">УчётЭнерго</span>
          <Badge className="bg-violet-500/20 text-violet-400 border-0 ml-1 text-xs">Администратор</Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onLogout} className="text-gray-400 hover:text-white">
          <Icon name="LogOut" size={14} className="mr-1" /> Выйти
        </Button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Панель администратора</h1>
          <p className="text-gray-400 text-sm">Управление пользователями, счётчиками и тарифами</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-4 text-center">
            <p className="text-2xl font-bold text-white">{MOCK_USERS.length}</p>
            <p className="text-xs text-gray-500 mt-1">Пользователей</p>
          </div>
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{STAR_METERS.length}</p>
            <p className="text-xs text-gray-500 mt-1">Счётчиков Звезда</p>
          </div>
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{BUILDER_METERS.length}</p>
            <p className="text-xs text-gray-500 mt-1">Счётчиков Строитель</p>
          </div>
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{payments.filter(p => p.status === "на проверке").length}</p>
            <p className="text-xs text-gray-500 mt-1">Ожидают проверки</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["users", "meters", "tariffs", "payments"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "bg-[#141414] border border-[#262626] text-gray-400 hover:text-white"
              }`}
            >
              {tab === "users" && "Пользователи"}
              {tab === "meters" && "Счётчики"}
              {tab === "tariffs" && "Тарифы"}
              {tab === "payments" && "Оплаты"}
            </button>
          ))}
        </div>

        {activeTab === "users" && (
          <div className="space-y-3">
            {MOCK_USERS.map(user => (
              <div key={user.id} className="rounded-xl bg-[#141414] border border-[#262626] p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <Icon name="User" size={16} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300 border border-violet-500/20">
                    <Icon name="Settings" size={14} className="mr-1" /> Настроить
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.meters.map(m => (
                    <span key={m} className={`text-xs px-2 py-1 rounded-md border ${
                      m.startsWith("З")
                        ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                        : "border-blue-500/30 text-blue-400 bg-blue-500/10"
                    }`}>
                      {m} {m === "З-26" && <span className="text-gray-500">(Строитель)</span>}
                    </span>
                  ))}
                  <button className="text-xs px-2 py-1 rounded-md border border-dashed border-[#333] text-gray-500 hover:border-violet-500 hover:text-violet-400 transition-colors">
                    + Добавить счётчик
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "meters" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedGroup("star")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedGroup === "star" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-[#141414] border border-[#262626] text-gray-400"}`}
              >
                ★ Звезда (З-0 — З-50)
              </button>
              <button
                onClick={() => setSelectedGroup("builder")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedGroup === "builder" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-[#141414] border border-[#262626] text-gray-400"}`}
              >
                С Строитель (С-1—С-48, С-50—С-70)
              </button>
            </div>

            <div className="rounded-xl bg-[#141414] border border-[#262626] p-5">
              <p className="text-xs text-gray-500 mb-3">
                {selectedGroup === "star"
                  ? "51 счётчик · З-26 входит в группу Строитель"
                  : "69 счётчиков · включает З-26 из группы Звезда"}
              </p>
              <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto">
                {(selectedGroup === "star" ? STAR_METERS : [...BUILDER_METERS, "З-26"]).map(m => {
                  const assignedUser = MOCK_USERS.find(u => u.meters.includes(m))
                  return (
                    <div
                      key={m}
                      className={`text-xs px-2.5 py-1.5 rounded-md border cursor-pointer transition-colors ${
                        assignedUser
                          ? selectedGroup === "star"
                            ? "border-amber-500/40 text-amber-400 bg-amber-500/10"
                            : "border-blue-500/40 text-blue-400 bg-blue-500/10"
                          : "border-[#333] text-gray-500 hover:border-gray-500"
                      }`}
                    >
                      {m}
                      {assignedUser && <span className="ml-1 text-gray-600">·{assignedUser.username}</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "tariffs" && (
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-6 max-w-md">
            <h3 className="text-white font-medium mb-6 flex items-center gap-2">
              <Icon name="Settings" size={16} className="text-violet-400" />
              Настройка тарифов
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-400 text-sm mb-1.5 block">
                  Тариф, ₽/кВт·ч
                </Label>
                <Input
                  type="number"
                  value={tariff}
                  onChange={e => setTariff(e.target.value)}
                  step="0.01"
                  className="bg-[#0f0f0f] border-[#262626] text-white focus:border-violet-500"
                />
              </div>
              <div>
                <Label className="text-gray-400 text-sm mb-1.5 block">
                  Коэффициент потерь
                </Label>
                <Input
                  type="number"
                  value={lossCoef}
                  onChange={e => setLossCoef(e.target.value)}
                  step="0.001"
                  className="bg-[#0f0f0f] border-[#262626] text-white focus:border-violet-500"
                />
                <p className="text-xs text-gray-600 mt-1">Начисление = потребление × тариф × коэф. потерь</p>
              </div>
              <div className="rounded-lg bg-[#0f0f0f] border border-[#1a1a1a] p-3">
                <p className="text-xs text-gray-500">Пример: 100 кВт·ч × {tariff} × {lossCoef} = <span className="text-white">{(100 * parseFloat(tariff || "0") * parseFloat(lossCoef || "1")).toFixed(2)} ₽</span></p>
              </div>
              <Button
                onClick={handleSaveTariff}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-full"
              >
                {tariffSaved ? "Сохранено ✓" : "Сохранить тариф"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-3">
            {payments.map((p, i) => (
              <div key={i} className="rounded-xl bg-[#141414] border border-[#262626] p-5 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{p.user}</p>
                  <p className="text-xs text-gray-500">{p.date} · {p.meter}</p>
                </div>
                <p className="text-white font-semibold">{p.amount} ₽</p>
                <div className="flex items-center gap-3">
                  <Badge className={p.status === "учтена" ? "bg-green-500/20 text-green-400 border-0" : "bg-yellow-500/20 text-yellow-400 border-0"}>
                    {p.status}
                  </Badge>
                  {p.status === "на проверке" && (
                    <Button
                      size="sm"
                      onClick={() => handleApprovePayment(i)}
                      className="bg-violet-600 hover:bg-violet-700 text-white text-xs h-7"
                    >
                      Учесть
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
