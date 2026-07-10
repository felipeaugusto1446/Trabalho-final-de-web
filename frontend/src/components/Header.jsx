import local from "../assets/local.png"

export function Header({ estaLogado, aoSair, aoClicarLogin, aoClicarCadastro }) {
  return (
    <header className="w-full bg-blue-600 text-white shadow-md">
      <div className="grid grid-cols-3 items-center px-6 py-4">
        
        <div className="flex justify-start">
            <img 
              src={local} 
              alt="Logo" 
              className="w-10 h-10 object-contain" 
            />
        </div>

        <div className="text-center font-bold text-xl tracking-wide">
            Minhas localizações maneiras
        </div>

        {/* LADO DIREITO: Botões (Largura igual ao lado esquerdo para manter o centro) */}
        <div className="flex gap-4 justify-end">
          {estaLogado ? (
            <button 
              onClick={aoSair}
              className="bg-red-500 text-white px-4 py-2 rounded-md font-bold hover:bg-red-600 transition shadow-sm"
            >
              Sair
            </button>
          ) : (
            <>
              <button 
                onClick={aoClicarLogin}
                className="font-semibold hover:underline transition"
              >
                Logar
              </button>
              
              <button 
                onClick={aoClicarCadastro}
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-bold hover:bg-gray-100 transition shadow-sm"
              >
                Cadastrar
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
