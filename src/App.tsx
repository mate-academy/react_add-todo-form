import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { NewTodo } from './components/NewTodo/NewTodo';
import { useState } from 'react';
import { Todo } from './types/types';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>(todos);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    setTodoList(currentTodos => [
      ...currentTodos,
      { ...newTodo, id: Math.max(0, ...currentTodos.map(todo => todo.id)) + 1 },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo users={usersFromServer} onAdd={addTodo} />

      <TodoList todos={todoList} />
    </div>
  );
};
