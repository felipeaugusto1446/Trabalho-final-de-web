import { useState } from 'react';

export function useCep() {
  const [buscando, setBuscando] = useState(false);

  const consultarCep = async (cep) => {
    if (cep.length !== 8) return null;

    setBuscando(true);
    try {
      const resposta = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
      
      if (!resposta.ok) {
        alert("CEP não encontrado.");
        return null;
      }
      
      const dados = await resposta.json();
      return dados;
    } catch (error) {
      alert("Erro ao buscar CEP.");
      return null;
    } finally {
      setBuscando(false);
    }
  };

  return { consultarCep, buscando };
}
