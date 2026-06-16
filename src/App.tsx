import { useState } from 'react';
//import 'bulma/css/bulma.min.css';
import todosFromServer, { Todo } from './api/todos';
import { usersFromServer } from './api/users';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleAddTodo = (todoToAdd: Todo) => {
    setTodos(prevTodos => [...prevTodos, todoToAdd]);
  };

  return (
    <div className="section">
      <h1 className="title">Add todo form</h1>
      <TodoForm todos={todos} users={usersFromServer} onAdd={handleAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
