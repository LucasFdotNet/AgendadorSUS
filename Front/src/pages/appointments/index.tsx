import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../../context/AppointmentContext';

export function Appointments() {
  const navigate = useNavigate();
  const { appointments } = useAppointments();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Ver Consultas</h1>
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="p-4 border rounded-lg shadow-sm">
              <p className="text-gray-800"><strong>Data:</strong> {appointment.date}</p>
              <p className="text-gray-800"><strong>Hora:</strong> {appointment.time}</p>
              <p className="text-gray-800"><strong>Médico:</strong> {appointment.doctor}</p>
              <p className="text-gray-800"><strong>Observações:</strong> {appointment.notes}</p>
            </li>
          ))}
        </ul>
        <button onClick={() => navigate('/')} className="w-full py-3 mt-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">Voltar para Home</button>
      </div>
    </div>
  );
}