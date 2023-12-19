import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { UsersProvider } from './components/UsersProvider/UsersProvider';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { TodoList } from './components/TodoList';
import { ITodo } from './types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const handleTodoAdd = (newTodo: ITodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <UsersProvider users={usersFromServer}>
        <AddTodoForm
          todos={todos}
          onTodoAdd={handleTodoAdd}
        />
        <TodoList todos={todos} />
      </UsersProvider>
    </div>
  );
};
