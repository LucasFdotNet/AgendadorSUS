import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppointments } from '../../context/AppointmentContext';

interface ScheduleFormData {
  date: string;
  time: string;
  doctor: string;
  notes: string;
}

export function Schedule() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<ScheduleFormData>();
  const { addAppointment } = useAppointments();

  const onSubmit = (data: ScheduleFormData) => {
    const newAppointment = {
      id: Date.now(),
      ...data,
    };
    addAppointment(newAppointment);
    reset();
    navigate('/appointments');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Agendar Consulta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="date">Data</label>
            <input
              id="date"
              type="date"
              className="block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent sm:text-base border-gray-300"
              {...register('date', { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="time">Hora</label>
            <input
              id="time"
              type="time"
              className="block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent sm:text-base border-gray-300"
              {...register('time', { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="doctor">Médico</label>
            <select
              id="doctor"
              className="block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent sm:text-base border-gray-300"
              {...register('doctor', { required: true })}
            >
              <option value="">Selecione um médico</option>
              <option value="Dra. Rebeca">Dra. Rebeca</option>
              <option value="Dr. Erik">Dr. Erik</option>
              <option value="Dr. Rafael">Dr. Rafael</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="notes">Observações</label>
            <textarea
              id="notes"
              rows={4}
              className="block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent sm:text-base border-gray-300"
              placeholder="Adicione observações sobre a consulta"
              {...register('notes')}
            ></textarea>
          </div>
          <button type="submit" className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Agendar</button>
        </form>
        <button onClick={() => navigate('/')} className="w-full py-3 mt-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">Voltar para Home</button>
      </div>
    </div>
  );
}