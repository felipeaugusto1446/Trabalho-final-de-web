import { useState } from "react";

export function Cadastro({ irParaLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [erro, setErro] = useState("");

  const fazerCadastro = async (e) => {
    e.preventDefault();
    setErro("");

    if (senha !== senhaConfirmacao) {
      setErro("As senhas não coincidem!");
      return;
    }

    try {
      const resposta = await fetch("http://127.0.0.1:8000/auth/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha, confirmacao_senha: senhaConfirmacao }), 
      });

      if (!resposta.ok) {
        const dados = await resposta.json();
        const mensagemErro = typeof dados.detail === 'string' 
          ? dados.detail 
          : "Erro ao realizar cadastro.";
        setErro(mensagemErro);
        return;
      }

      alert("Conta criada com sucesso! Faça seu login.");
      irParaLogin();

    } catch (error) {
      setErro("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 border">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Crie sua Conta</h2>
        
        {erro && <p className="text-red-500 text-sm mb-4 text-center">{erro}</p>}
        
        <form onSubmit={fazerCadastro} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Seu E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-2 rounded focus:outline-blue-500" 
            required 
          />
          <input 
            type="password" 
            placeholder="Sua Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            className="border p-2 rounded focus:outline-blue-500" 
            required 
          />
          <input 
            type="password" 
            placeholder="Confirme sua Senha" 
            value={senhaConfirmacao} 
            onChange={(e) => setSenhaConfirmacao(e.target.value)} 
            className="border p-2 rounded focus:outline-blue-500" 
            required 
          />
          
          <button type="submit" className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition mt-2">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
