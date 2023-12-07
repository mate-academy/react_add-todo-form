import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './type/User';
import { Todo } from './type/Todo';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form/Form';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

const prepareTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(prepareTodos);

  const onAdd = (title: string, userId: number) => {
    const newTodo = {
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
      <Form onAdd={onAdd} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
