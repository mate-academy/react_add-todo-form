import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './services/userService';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = ({ title, userId }: { title: string; userId: number }) => {
    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(current => [...current, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={usersFromServer} onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
