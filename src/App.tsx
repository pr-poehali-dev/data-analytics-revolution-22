import { useState } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Index from "./pages/Index"
import Login from "./pages/Login"
import UserDashboard from "./pages/UserDashboard"
import AdminDashboard from "./pages/AdminDashboard"

const queryClient = new QueryClient()

type AppState =
  | { screen: "landing" }
  | { screen: "login" }
  | { screen: "user"; username: string }
  | { screen: "admin" }

const App = () => {
  const [state, setState] = useState<AppState>({ screen: "landing" })

  const handleLogin = (role: "admin" | "user", username: string) => {
    if (role === "admin") {
      setState({ screen: "admin" })
    } else {
      setState({ screen: "user", username })
    }
  }

  const handleLogout = () => setState({ screen: "landing" })
  const handleLoginClick = () => setState({ screen: "login" })

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {state.screen === "landing" && <Index onLoginClick={handleLoginClick} />}
        {state.screen === "login" && <Login onLogin={handleLogin} />}
        {state.screen === "user" && <UserDashboard username={state.username} onLogout={handleLogout} />}
        {state.screen === "admin" && <AdminDashboard onLogout={handleLogout} />}
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
