import { useState } from "react";

export function Login({aoLogar}) {
  // estados para guardar o que o usuário digita
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // listener para o botão de login
  const fazerLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const resposta = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.detail || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("token", dados.access_token);
      
      aoLogar(); 

    } catch (error) {
      setErro("Erro de conexão com o servidor.");
    }
  };

  return (
    // formulario para chamar a funcao
    <div className="flex justify-center mt-10">
      <form onSubmit={fazerLogin} className="bg-white p-6 rounded-md shadow-md flex flex-col gap-4 w-80">
        <h2 className="text-xl font-bold text-center text-blue-600">Acesse sua conta</h2>
        
        {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

        <input 
          type="email" 
          placeholder="Seu E-mail" 
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input 
          type="password" 
          placeholder="Sua Senha" 
          className="border p-2 rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        
        <button type="submit" className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  );
}
