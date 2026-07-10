import { Header } from "./components/Header"
import { Login } from "./components/Login"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Login />
      <h1 className="text-4xl font-bold text-blue-600">
        deu tudo certo
      </h1>
    </div>
  )
}

export default App
