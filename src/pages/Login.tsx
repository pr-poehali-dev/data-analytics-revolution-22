import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Icon from "@/components/ui/icon"

interface LoginProps {
  onLogin: (role: "admin" | "user", username: string) => void
}

const DEMO_USERS = [
  { username: "admin", password: "admin123", role: "admin" as const },
  { username: "ivanov", password: "pass123", role: "user" as const },
  { username: "petrov", password: "pass456", role: "user" as const },
]

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.username === username && u.password === password)
      if (user) {
        onLogin(user.role, user.username)
      } else {
        setError("Неверный логин или пароль")
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="8" cy="8" r="3" fill="#8B5CF6" />
              <circle cx="16" cy="8" r="3" fill="#8B5CF6" opacity="0.6" />
              <circle cx="8" cy="16" r="3" fill="#8B5CF6" opacity="0.6" />
              <circle cx="16" cy="16" r="3" fill="#8B5CF6" opacity="0.4" />
            </svg>
            <span className="text-2xl font-bold text-white">УчётЭнерго</span>
          </div>
          <p className="text-gray-400 text-sm">Система учёта электроэнергии</p>
        </div>

        <div className="rounded-2xl bg-[#141414] border border-[#262626] p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Вход в систему</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-400 text-sm mb-1.5 block">Логин</Label>
              <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Введите логин"
                className="bg-[#0f0f0f] border-[#262626] text-white placeholder:text-gray-600 focus:border-violet-500"
              />
            </div>
            <div>
              <Label className="text-gray-400 text-sm mb-1.5 block">Пароль</Label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="bg-[#0f0f0f] border-[#262626] text-white placeholder:text-gray-600 focus:border-violet-500"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <Icon name="AlertCircle" size={14} />
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-full mt-2"
            >
              {loading ? "Вход..." : "Войти"}
            </Button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          Для получения доступа обратитесь к администратору
        </p>
      </div>
    </div>
  )
}
