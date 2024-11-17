import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TODO } from './types/todo';
import { NewTodo } from './components/NewTodo';
import { initialTodos } from './services/initialTodos';
import { getUserById } from './services/userById';

export const App = () => {
  const [todos, setTodos] = useState<TODO[]>(initialTodos);
  const maxId = Math.max.apply(
    null,
    todos.map(todo => todo.id),
  );

  const addTodo = ({ id, user, ...data }: TODO) => {
    const newTodo = {
      id: maxId + 1,
      ...data,
      user: getUserById(data.userId) || null,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App section">
      <h1 className="title">Add todo form</h1>

      <NewTodo onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
