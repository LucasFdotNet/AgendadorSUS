import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  username: string;
  password: string;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }, [user]);

  const login = (username: string, password: string) => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers) as User[];
      const foundUser = users.find((u) => u.username === username && u.password === password);
      if (foundUser) {
        setUser(foundUser);
        return true;
      }
    }
    return false;
  };

  const register = (username: string, password: string) => {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) as User[] : [];
    const userExists = users.some((u) => u.username === username);
    if (!userExists) {
      const newUser = { username, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};