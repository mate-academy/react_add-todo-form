import { createContext, ReactNode, useState } from 'react';
import usersFromServer from '../api/users';
import { Todo } from '../Types/Todo';
import { User } from '../Types/User';

// Typ danych kontekstu
interface AppContextType {
  userId: number;
  setUserId: (id: number) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  users: User[]; // todoUser może być null, jeśli nie ma takiego użytkownika
}

// Tworzymy kontekst
const AppContext = createContext<AppContextType>({
  userId: 0,
  setUserId: () => {},
  todos: [],
  setTodos: () => {},
  users: usersFromServer,
  todoUser: usersFromServer.find(user => user.id === userId),
});

interface AppProviderProps {
  children: ReactNode;
}

// Komponent Provider, który będzie udostępniał zmienne i stałe
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  // Szukamy użytkownika na podstawie userId
  const todoUser = usersFromServer.find(user => user.id === userId) || null; // Jeśli nie ma użytkownika, ustawiamy null

  return (
    <AppContext.Provider
      value={{ todos, setTodos, users, userId, setUserId, todoUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
