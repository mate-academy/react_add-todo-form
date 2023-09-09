import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { PreparedTodo } from './types/PreparedTodo';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoAddForm } from './components/TodoAddForm';

function findUserById(id: number): User | undefined {
  return usersFromServer.find(user => user.id === id) ?? undefined;
}

const preparedTodoList: PreparedTodo[] = todosFromServer
  .map((todo: Todo) => {
    return {
      ...todo,
      user: findUserById(todo.userId),
    };
  });

export const App = () => {
  const [renderedTodos, setRenderedTodos] = useState(preparedTodoList);

  const onAdd = (todo: PreparedTodo) => {
    setRenderedTodos((prevTodos) => [...prevTodos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoAddForm
        todos={renderedTodos}
        users={usersFromServer}
        onAdd={onAdd}
      />

      <TodoList todoList={renderedTodos} />
    </div>
  );
};
