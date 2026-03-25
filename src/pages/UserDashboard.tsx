import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

interface Meter {
  id: string
  group: "star" | "builder"
  lastReading: number
  lastDate: string
}

interface Reading {
  date: string
  value: number
  consumption: number
}

interface Payment {
  date: string
  amount: number
  status: "учтена" | "на проверке"
  doc?: string
}

interface UserDashboardProps {
  username: string
  onLogout: () => void
}

const MOCK_METERS: Meter[] = [
  { id: "З-14", group: "star", lastReading: 1245, lastDate: "01.02.2026" },
  { id: "С-23", group: "builder", lastReading: 3482, lastDate: "01.02.2026" },
]

const MOCK_READINGS: Reading[] = [
  { date: "01.01.2026", value: 1100, consumption: 98 },
  { date: "01.02.2026", value: 1245, consumption: 145 },
  { date: "01.03.2026", value: 1398, consumption: 153 },
]

const MOCK_PAYMENTS: Payment[] = [
  { date: "15.01.2026", amount: 980, status: "учтена" },
  { date: "18.02.2026", amount: 1450, status: "учтена" },
  { date: "10.03.2026", amount: 1530, status: "на проверке" },
]

const TARIFF = 4.85
const LOSS_COEF = 1.03

export default function UserDashboard({ username, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<"meters" | "readings" | "payments">("meters")
  const [selectedMeter, setSelectedMeter] = useState<Meter>(MOCK_METERS[0])
  const [newReading, setNewReading] = useState("")
  const [readingSubmitted, setReadingSubmitted] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentFile, setPaymentFile] = useState<File | null>(null)
  const [paymentSent, setPaymentSent] = useState(false)

  const totalPaid = MOCK_PAYMENTS.filter(p => p.status === "учтена").reduce((s, p) => s + p.amount, 0)
  const totalCharged = MOCK_READINGS.reduce((s, r) => s + r.consumption, 0) * TARIFF * LOSS_COEF
  const balance = totalPaid - totalCharged

  const handleReadingSubmit = () => {
    if (!newReading) return
    setReadingSubmitted(true)
    setTimeout(() => setReadingSubmitted(false), 3000)
    setNewReading("")
  }

  const handlePaymentSubmit = () => {
    if (!paymentAmount) return
    setPaymentSent(true)
    setTimeout(() => setPaymentSent(false), 3000)
    setPaymentAmount("")
    setPaymentFile(null)
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
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            <Icon name="User" size={14} className="inline mr-1" />
            {username}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-gray-400 hover:text-white"
          >
            <Icon name="LogOut" size={14} className="mr-1" /> Выйти
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Личный кабинет</h1>
          <p className="text-gray-400 text-sm">Управление показаниями и оплатой</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-4">
            <p className="text-xs text-gray-500 mb-1">Начислено</p>
            <p className="text-xl font-bold text-white">{totalCharged.toFixed(0)} ₽</p>
          </div>
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-4">
            <p className="text-xs text-gray-500 mb-1">Оплачено</p>
            <p className="text-xl font-bold text-white">{totalPaid} ₽</p>
          </div>
          <div className="rounded-xl bg-[#141414] border border-[#262626] p-4">
            <p className="text-xs text-gray-500 mb-1">Баланс</p>
            <p className={`text-xl font-bold ${balance >= 0 ? "text-green-400" : "text-red-400"}`}>
              {balance >= 0 ? "+" : ""}{balance.toFixed(0)} ₽
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{balance >= 0 ? "переплата" : "задолженность"}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {(["meters", "readings", "payments"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "bg-[#141414] border border-[#262626] text-gray-400 hover:text-white"
              }`}
            >
              {tab === "meters" && "Мои счётчики"}
              {tab === "readings" && "Показания"}
              {tab === "payments" && "Оплата"}
            </button>
          ))}
        </div>

        {activeTab === "meters" && (
          <div className="space-y-3">
            {MOCK_METERS.map(meter => (
              <div key={meter.id} className="rounded-xl bg-[#141414] border border-[#262626] p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <Icon name="Zap" size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{meter.id}</p>
                    <p className="text-xs text-gray-500">
                      Группа: {meter.group === "star" ? "Звезда" : "Строитель"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm">{meter.lastReading} кВт·ч</p>
                  <p className="text-xs text-gray-500">от {meter.lastDate}</p>
                </div>
                <Badge className={meter.group === "star" ? "bg-amber-500/20 text-amber-400 border-0" : "bg-blue-500/20 text-blue-400 border-0"}>
                  {meter.group === "star" ? "★ Звезда" : "С Строитель"}
                </Badge>
              </div>
            ))}
            <p className="text-gray-500 text-xs mt-2">
              Тариф: {TARIFF} ₽/кВт·ч · Коэффициент потерь: {LOSS_COEF}
            </p>
          </div>
        )}

        {activeTab === "readings" && (
          <div className="space-y-4">
            <div className="rounded-xl bg-[#141414] border border-[#262626] p-5">
              <h3 className="text-white font-medium mb-4">Передать показания</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {MOCK_METERS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMeter(m)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedMeter.id === m.id
                        ? "border-violet-500 bg-violet-500/10"
                        : "border-[#262626] bg-[#0f0f0f] hover:border-gray-500"
                    }`}
                  >
                    <p className="text-white text-sm font-medium">{m.id}</p>
                    <p className="text-gray-500 text-xs">пред.: {m.lastReading}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Input
                  type="number"
                  value={newReading}
                  onChange={e => setNewReading(e.target.value)}
                  placeholder="Новое показание, кВт·ч"
                  className="bg-[#0f0f0f] border-[#262626] text-white placeholder:text-gray-600 focus:border-violet-500"
                />
                <Button
                  onClick={handleReadingSubmit}
                  className="bg-violet-600 hover:bg-violet-700 text-white whitespace-nowrap"
                >
                  Передать
                </Button>
              </div>
              {readingSubmitted && (
                <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                  <Icon name="CheckCircle" size={14} /> Показание успешно передано
                </p>
              )}
            </div>

            <div className="rounded-xl bg-[#141414] border border-[#262626] p-5">
              <h3 className="text-white font-medium mb-4">История показаний — {selectedMeter.id}</h3>
              <div className="space-y-2">
                {MOCK_READINGS.map((r, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3">
                    <p className="text-gray-400 text-sm">{r.date}</p>
                    <p className="text-white text-sm font-medium">{r.value} кВт·ч</p>
                    <p className="text-violet-400 text-sm">{r.consumption} кВт·ч</p>
                    <p className="text-gray-400 text-sm">{(r.consumption * TARIFF * LOSS_COEF).toFixed(0)} ₽</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 text-xs text-gray-600 mt-2 px-4">
                <span>Дата</span>
                <span className="ml-auto mr-16">Показание</span>
                <span className="mr-10">Потреблено</span>
                <span>Начислено</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-4">
            <div className="rounded-xl bg-[#141414] border border-[#262626] p-5">
              <h3 className="text-white font-medium mb-4">Передать оплату</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-gray-400 text-sm mb-1.5 block">Сумма оплаты, ₽</Label>
                  <Input
                    type="number"
                    value={paymentAmount}
                    onChange={e => setPaymentAmount(e.target.value)}
                    placeholder="Введите сумму"
                    className="bg-[#0f0f0f] border-[#262626] text-white placeholder:text-gray-600 focus:border-violet-500"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-sm mb-1.5 block">Документ подтверждения (фото или PDF)</Label>
                  <label className="flex items-center gap-3 cursor-pointer rounded-lg bg-[#0f0f0f] border border-dashed border-[#333] p-4 hover:border-violet-500 transition-colors">
                    <Icon name="Upload" size={18} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-300">{paymentFile ? paymentFile.name : "Нажмите для загрузки"}</p>
                      <p className="text-xs text-gray-600">JPG, PNG или PDF</p>
                    </div>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={e => setPaymentFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
                <Button
                  onClick={handlePaymentSubmit}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-full"
                >
                  Отправить оплату
                </Button>
                {paymentSent && (
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <Icon name="CheckCircle" size={14} /> Оплата отправлена на проверку
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-[#141414] border border-[#262626] p-5">
              <h3 className="text-white font-medium mb-4">История оплат</h3>
              <div className="space-y-2">
                {MOCK_PAYMENTS.map((p, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-[#0f0f0f] border border-[#1a1a1a] px-4 py-3">
                    <p className="text-gray-400 text-sm">{p.date}</p>
                    <p className="text-white font-medium">{p.amount} ₽</p>
                    <Badge className={p.status === "учтена" ? "bg-green-500/20 text-green-400 border-0" : "bg-yellow-500/20 text-yellow-400 border-0"}>
                      {p.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
