import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
  notes: string;
}

interface AppointmentContextProps {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
}

const AppointmentContext = createContext<AppointmentContextProps | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const storedAppointments = localStorage.getItem('appointments');
    return storedAppointments ? JSON.parse(storedAppointments) : [];
  });

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};