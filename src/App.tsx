import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './components/Services/User';
import { Todos } from './Types/Todos';

export const initialTodos: Todos[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todos[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todos) => {
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
