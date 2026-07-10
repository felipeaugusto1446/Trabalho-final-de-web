import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Cadastro } from "./components/Cadastro"; 
import { Painel } from "./components/Painel";
import { Modal } from "./components/Modal";
import { CardsUsuarios } from "./components/CardsUsuários"; 

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
    if (telaAtiva === "inicio") {
      return (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo ao Minhas localizações maneiras!</h1>
          <p className="text-xl text-gray-600">Seu site preferido para guardar seus melhores endereços</p>
          <p className="text-xl text-gray-600">com uma segurança duvidosa e um design mais duvidoso ainda!</p>
        </div>
      );
    }

    return (
      <Modal fechar={() => setTelaAtiva("inicio")}>
        {telaAtiva === "login" && (
          <Login aoLogar={() => { setEstaLogado(true); setTelaAtiva("inicio"); }} />
        )}
        {telaAtiva === "cadastro" && (
          <Cadastro irParaLogin={() => setTelaAtiva("login")} />
        )}
      </Modal>
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
        <div className="bg-gray-50 pb-20">
        {renderizarAreaDeslogada()}
        <CardsUsuarios />
        </div>
      )}
    </div>
  );
}

export default App;
