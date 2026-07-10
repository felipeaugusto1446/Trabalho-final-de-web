// Recebendo as props que vêm lá do App.jsx
export function Header({ estaLogado, aoSair }) {
  return (
    <header className="w-full bg-blue-600 text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">
                L
            </div>
            <p className="ml-2 font-bold text-xl tracking-wide">lirili-larila</p>
        </div>

        <div className="flex-1 text-center">
            <p className="font-bold text-xl tracking-wide">Minhas localizações maneiras</p>
        </div>

        <div className="flex gap-4">
          {estaLogado ? (
            <button 
              onClick={aoSair}
              className="bg-red-500 text-white px-4 py-2 rounded-md font-bold hover:bg-red-600 transition shadow-sm"
            >
              Sair
            </button>
          ) : (
            <>
              <button className="font-semibold hover:underline transition">
                Logar
              </button>
        
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-bold hover:bg-gray-100 transition shadow-sm">
                Cadastrar
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
