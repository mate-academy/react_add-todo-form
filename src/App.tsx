import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './servis/userServ';
import { useState } from 'react';
import { Todos } from './components/typses/Todo';

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodosId(todos: Todos[]): number {
  const masId = Math.max(...todos.map(todo => todo.id));

  return masId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todos) => {
    const newTodo = {
      id: getNewTodosId(todos),
      ...data,
    };

    setTodos(currentTodo => [...currentTodo,newTodo]);
  };

  return (
    <div className="section">
      <h1 className="title">Add todo form</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
