import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { NewTodo } from './components/NewTodo/NewTodo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [shownTodos, setShownTodos] = useState<Todo[]>(todos);

  const handleOnAdd = ({
    title,
    userId,
    id,
  }: Pick<Todo, 'title' | 'userId' | 'id'>) => {
    setShownTodos(currentTodos => [
      ...currentTodos,
      {
        title,
        userId,
        completed: false,
        id,
        user: getUserById(userId),
      },
    ]);
  };

  return (
    <div className="App">
      <NewTodo onAdd={handleOnAdd} />

      <TodoList todos={shownTodos} />
    </div>
  );
};
