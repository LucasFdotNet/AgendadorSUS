import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center mb-6">
          <img className="w-16 h-16 rounded-full mr-4" src="./user.png" alt="User Avatar" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user?.username}</h2>
            <p className="text-gray-600">{user?.username}</p>
          </div>
        </div>
        <div className="space-y-4">
          <button onClick={() => navigate('/schedule')} className="w-full cursor-pointer py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Agendar Consulta</button>
          <button onClick={() => navigate('/appointments')} className="w-full cursor-pointer py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Ver Consultas</button>
          <button onClick={() => navigate('/profile')} className="w-full cursor-pointer py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">Editar Perfil</button>
          <button onClick={() => navigate('/logout')} className="w-full cursor-pointer py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Sair</button>
        </div>
      </div>
    </div>
  );
}