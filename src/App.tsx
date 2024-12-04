import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { Todo } from './types/Todo';
import { getUsersById } from './utils/getUsersById';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  const preparingUser = getUsersById(todo.userId);

  return {
    ...todo,
    user: preparingUser,
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [userIdError, setUserIdError] = useState<boolean>(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm
        setTodos={setTodos}
        title={title}
        setTitle={setTitle}
        titleError={titleError}
        setTitleError={setTitleError}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        userIdError={userIdError}
        setUserIdError={setUserIdError}
      />

      <TodoList todos={todos} />
    </div>
  );
};
