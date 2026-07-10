export function Header() {
  return (
    <header className="w-full bg-blue-600 text-white shadow-md relative">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
            <div>
                Lirili-larilá
            </div>
        </div>
        
        <div className="flex-1 text-center">
            <p className="font-bold text-xl tracking-wide">Minhas localizações maneiras</p>
        </div>

        <div className="flex gap-4">
          <button className="font-semibold hover:underline transition">
            Logar
          </button>
          
          <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-bold hover:bg-gray-100 transition">
            Cadastrar
          </button>
        </div>
      </div>
    </header>
  );
}
