import React, { useState } from 'react';
import './App.scss';

// import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoType } from './types/TodoType';
import { getUserById, getNewTodoId } from './servises/functions';
import { TodoList } from './components/TodoList';
import { Todo } from './components/Todo/Todo';

const initialTodos: TodoType[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

  const addTodo = ({ id, ...data }: TodoType): void => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Todo
        handleSubmit={handleSubmit}
        title={title}
        handleTitleChange={handleTitleChange}
        hasTitleError={hasTitleError}
        userId={userId}
        handleUserIdChange={handleUserIdChange}
        hasUserIdError={hasUserIdError}
      />

      <TodoList todos={todos} />
    </div>
  );
};
