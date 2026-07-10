import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import img5 from "../assets/img5.png"
import img6 from "../assets/img6.png"
import img7 from "../assets/img7.png"
import img8 from "../assets/img8.png"

export function CardsUsuarios() {
  const usuarios = [
    { foto: img1 },
    { foto: img2 },
    { foto: img3 },
    { foto: img4 },
    { foto: img5 },
    { foto: img6 },
    { foto: img7 },
    { foto: img8 },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Alguns de nossos usuários!</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {usuarios.map((user, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition">
            <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
              <img 
                src={user.foto} 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-semibold text-center text-gray-700">{user.nome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
