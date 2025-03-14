import { useNavigate } from 'react-router-dom';

export function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Editar Perfil</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              className="block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent sm:text-base border-gray-300"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent sm:text-base border-gray-300"
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">Telefone</label>
            <input
              id="phone"
              type="text"
              className="block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent sm:text-base border-gray-300"
              placeholder="Digite seu telefone"
            />
          </div>
          <button type="submit" className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Salvar</button>
        </form>
        <button onClick={() => navigate('/')} className="w-full py-3 mt-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">Voltar para Home</button>
      </div>
    </div>
  );
}