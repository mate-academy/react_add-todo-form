import './App.scss';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoCard } from './types/TodoCard';

import todosFromServer from './api/todos';
import { getUserById } from './services/functions';
import { getNewTodoId } from './services/functions';
import { useState } from 'react';

const initialTodos: TodoCard[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoCard[]>(initialTodos);
  const addTodo = ({ id, ...data }: TodoCard) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
