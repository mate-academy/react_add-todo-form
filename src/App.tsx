import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDo } from './types/ToDo';
import { User } from './types/User';
import { NewTodo } from './components/NewTodo/NewTodo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const App = () => {
  const [todos, setTodo] = useState(todosFromServer);

  const addTodo = (todo: ToDo) => {
    setTodo(currentTodos => [...currentTodos, todo]);
  };

  const getTodoId = (): number => {
    const ids = todos.map(todo => todo.id);
    const maxId = Math.max(...ids);

    return maxId + 1;
  };

  const todoList: ToDo[] = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  return (
    <div className="App">
      <NewTodo onAdd={addTodo} getTodoId={getTodoId} />

      <TodoList todos={todoList} />
    </div>
  );
};
