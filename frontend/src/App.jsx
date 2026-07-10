import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Cadastro } from "./components/Cadastro"; 
import { Painel } from "./components/Painel";

function App() {
  const [estaLogado, setEstaLogado] = useState(false);
  
  const [telaAtiva, setTelaAtiva] = useState("inicio"); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setEstaLogado(true);
    }
  }, []);

  const fazerLogout = () => {
    localStorage.removeItem("token");
    setEstaLogado(false);
    setTelaAtiva("inicio"); 
  };

  const renderizarAreaDeslogada = () => {
    if (telaAtiva === "login") {
      return <Login aoLogar={() => setEstaLogado(true)} />;
    } 
    
    if (telaAtiva === "cadastro") {
      return <Cadastro irParaLogin={() => setTelaAtiva("login")} />;
    }

    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo ao Lirili-larilá</h1>
        <p className="text-xl text-gray-600">Faça login ou cadastre-se para gerenciar seus endereços.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        estaLogado={estaLogado} 
        aoSair={fazerLogout} 
        aoClicarLogin={() => setTelaAtiva("login")}       
        aoClicarCadastro={() => setTelaAtiva("cadastro")} 
      />
      
      {estaLogado ? (
        <Painel />
      ) : (
        renderizarAreaDeslogada()
      )}
      
    </div>
  )
}

export default App
