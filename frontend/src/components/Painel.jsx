export function Painel({ aoSair }) {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Meus Endereços</h2>        
        <button
        // botao para limpar o token ao voltar pro login
          onClick={aoSair} 
          className="bg-red-500 text-white px-4 py-2 rounded-md font-bold hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>
      
      <p className="text-gray-600">aqui vai entrar a lista de endereços</p>
    </div>
  );
}
