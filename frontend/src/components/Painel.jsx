import { useState, useEffect } from "react";
import { useCep } from "../hooks/useCep";

export function Painel() {
  const [enderecos, setEnderecos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [exibirFormulario, setExibirFormulario] = useState(false);
  
  const [idEmEdicao, setIdEmEdicao] = useState(null);
  const { consultarCep, buscando } = useCep();

  const [descricao, setDescricao] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    buscarEnderecos();
  }, []);

  const buscarEnderecos = async () => {
    try {
      const token = localStorage.getItem("token");
      const resposta = await fetch("http://127.0.0.1:8000/enderecos/", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        setEnderecos(dados);
      }
    } catch (error) {
      console.error("Erro ao buscar endereços", error);
    } finally {
      setCarregando(false);
    }
  };

  const preencherEndereco = async () => {
    const dados = await consultarCep(cep);
    if (dados) {
      if (dados.street) setRua(dados.street);
      if (dados.neighborhood) setBairro(dados.neighborhood);
      if (dados.city) setCidade(dados.city);
      if (dados.state) setEstado(dados.state);
    }
  };

  const abrirEdicao = (endereco) => {
    setIdEmEdicao(endereco.id); 
    setDescricao(endereco.descricao);
    setCep(endereco.cep);
    setRua(endereco.rua);
    setNumero(endereco.numero);
    setBairro(endereco.bairro);
    setCidade(endereco.cidade);
    setEstado(endereco.estado);
    setExibirFormulario(true); 
  };

  const fecharFormulario = () => {
    setIdEmEdicao(null);
    setDescricao(""); setCep(""); setRua(""); setNumero(""); setBairro(""); setCidade(""); setEstado("");
    setExibirFormulario(false);
  };

  const excluirEndereco = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este endereço?");
    if (!confirmacao) return; 

    try {
      const token = localStorage.getItem("token");
      const resposta = await fetch(`http://127.0.0.1:8000/enderecos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (resposta.ok) {
        buscarEnderecos();
      } else {
        alert("Erro ao excluir o endereço.");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    }
  };

  const salvarEndereco = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    const dadosEndereco = { descricao, cep, rua, numero, bairro, cidade, estado };

    const url = idEmEdicao 
      ? `http://127.0.0.1:8000/enderecos/${idEmEdicao}` 
      : "http://127.0.0.1:8000/enderecos/";             
      
    const metodo = idEmEdicao ? "PUT" : "POST";

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dadosEndereco)
      });

      if (resposta.ok) {
        alert(idEmEdicao ? "Endereço atualizado!" : "Endereço salvo!");
        fecharFormulario();
        buscarEnderecos(); 
      } else {
        alert("Erro ao salvar endereço. Verifique os dados.");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor.");
    }
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64 mt-10">
        <p className="text-xl text-blue-600 font-semibold animate-pulse">Carregando seus endereços...</p>
      </div>
    );
  }

  if (exibirFormulario) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-2">
          {idEmEdicao ? "Editar Endereço" : "Novo Endereço"}
        </h2>
        
        <form onSubmit={salvarEndereco} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Descrição do Endereço</label>
            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Minha Casa, Trabalho..." className="border p-2 rounded focus:outline-blue-500" required />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">CEP</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={cep} 
                onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))} 
                maxLength="8"
                placeholder="Apenas 8 números" 
                className="border p-2 rounded flex-1 focus:outline-blue-500" 
                required 
              />
              <button 
                type="button"
                onClick={preencherEndereco}
                disabled={cep.length !== 8 || buscando}
                className="bg-gray-600 text-white px-4 py-2 rounded font-bold hover:bg-gray-700 disabled:bg-gray-300 transition"
              >
                {buscando ? "..." : "Buscar"}
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">Rua</label>
              <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} className="border p-2 rounded focus:outline-blue-500" required />
            </div>
            <div className="flex flex-col w-1/3">
              <label className="text-gray-700 font-semibold mb-1">Número</label>
              <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="border p-2 rounded focus:outline-blue-500" required />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">Bairro</label>
              <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className="border p-2 rounded focus:outline-blue-500" required />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-gray-700 font-semibold mb-1">Cidade</label>
              <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} className="border p-2 rounded focus:outline-blue-500" required />
            </div>
            <div className="flex flex-col w-1/4">
              <label className="text-gray-700 font-semibold mb-1">Estado</label>
              <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} maxLength="2" placeholder="UF" className="border p-2 rounded focus:outline-blue-500 uppercase" required />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={fecharFormulario} className="px-4 py-2 text-gray-500 font-semibold hover:bg-gray-100 rounded transition">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition shadow-sm">
              {idEmEdicao ? "Atualizar Endereço" : "Salvar Endereço"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (enderecos.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-12 mt-10 bg-white rounded-md shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Você ainda não tem endereços salvos!</h2>
        <p className="text-gray-600 mb-8">Adicione o seu primeiro endereço para facilitar as suas próximas entregas.</p>
        <button onClick={() => setExibirFormulario(true)} className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold text-lg hover:bg-blue-700 transition shadow-md">
          + Adicionar Novo Endereço
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-blue-600">Meus Endereços</h2>
        <button onClick={() => setExibirFormulario(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700 transition shadow-sm">
          + Novo Endereço
        </button>
      </div>
      
      <div className="grid gap-4">
        {enderecos.map((endereco) => (
          <div key={endereco.id} className="border p-4 rounded-md shadow-sm hover:shadow-md transition bg-gray-50 flex justify-between items-center">
            <div>
                <p className="font-bold text-blue-600 mb-1">{endereco.descricao}</p>
                <p className="font-bold text-gray-800">{endereco.rua}, {endereco.numero}</p>
                <p className="text-gray-600 text-sm">{endereco.bairro} - {endereco.cidade}/{endereco.estado}</p>
                <p className="text-gray-500 text-sm mt-1">CEP: {endereco.cep}</p>
            </div>
            
            <div className="flex flex-col gap-3 items-end ml-4">
              <button 
                onClick={() => abrirEdicao(endereco)}
                className="text-blue-500 font-semibold hover:text-blue-700 hover:underline transition"
              >
                Editar
              </button>
              
              <button 
                onClick={() => excluirEndereco(endereco.id)}
                className="text-red-500 font-semibold hover:text-red-700 hover:underline transition"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
