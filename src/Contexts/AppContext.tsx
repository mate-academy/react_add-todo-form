import React, {
  ReactNode, createContext, useEffect, useState,
} from 'react';

import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type Props = {
  children: ReactNode;
};

type AppContextType = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  visibleTodos: Todo[];
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  inputError: string;
  setInputError: React.Dispatch<React.SetStateAction<string>>;
  userError: string;
  setUserError: React.Dispatch<React.SetStateAction<string>>;
  users: User[];
};

const defaultContextValues: AppContextType = {
  query: '',
  setQuery: () => null,
  userId: 0,
  setUserId: () => null,
  visibleTodos: [],
  setVisibleTodos: () => null,
  inputError: '',
  setInputError: () => null,
  userError: '',
  setUserError: () => null,
  users: [],
};

export const appContext = createContext<AppContextType>(defaultContextValues);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todosFromServer);
  const [users] = useState(usersFromServer);
  const [inputError, setInputError] = useState('');
  const [userError, setUserError] = useState('');

  useEffect(() => {
    const todosWithUsers = visibleTodos.map((todo) => {
      const todoWithUser: Todo = {
        ...todo,
        user: users.find((user) => user.id === todo.userId),
      };

      return todoWithUser;
    });

    setVisibleTodos(todosWithUsers);
  }, []);

  const state = {
    query,
    setQuery,
    userId,
    setUserId,
    visibleTodos,
    setVisibleTodos,
    inputError,
    setInputError,
    users,
    userError,
    setUserError,
  };

  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};
