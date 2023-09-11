import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, TodoWithUser } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { FormAddTodo } from './components/FormAddTodo/FormAddTodo';
import { findUserById } from './utils/findUserById';

const preparedTodos = (todos: Todo[]) => {
  return todos.map((todo: Todo) => ({
    ...todo,
    user: findUserById(usersFromServer, todo.userId),
  }));
};

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos(todosFromServer));

  const handleSubmit = (todo: TodoWithUser) => {
    setTodos((prevState) => [...prevState, todo]);
  };

  return (
    <div className="App">
      <FormAddTodo
        onSubmit={handleSubmit}
        todos={todos}
      />
      <TodoList todos={todos} />
    </div>
  );
};
