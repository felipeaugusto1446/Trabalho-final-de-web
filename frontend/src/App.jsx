import { useState, useEffect } from "react"
import { Header } from "./components/Header"
import { Login } from "./components/Login"
import { Painel } from "./components/Painel"

function App() {
  const [estaLogado, setEstaLogado] = useState(false);

  // verifica se tem um token guardado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setEstaLogado(true);
    }
  }, []);

  // limpa tokens ao deslogar
  const fazerLogout = () => {
    localStorage.removeItem("token");
    setEstaLogado(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {estaLogado ? (
        <Painel aoSair={fazerLogout} />
      ) : (
        <Login aoLogar={() => setEstaLogado(true)} />
      )}
    </div>
  )
}

export default App
