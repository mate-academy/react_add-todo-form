import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

const getUserByid = (id: number) => {
  return usersFromServer.find(user => user.id === id);
};

const todoList: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserByid(todo.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todoList);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const handleReset = () => {
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserIdError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      setUserIdError('Please choose a user');
    }

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!title || !userId) {
      return;
    }

    const id = Math.max(...todos.map(todo => todo.id)) + 1;

    const todo: Todo = {
      id,
      title,
      completed: false,
      userId,
      user: getUserByid(userId),
    };

    setTodos(currentTodos => [...currentTodos, todo]);

    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        onSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        titleError={titleError}
        setTitleError={setTitleError}
        userId={userId}
        setUserId={setUserId}
        userIdError={userIdError}
        setUserIdError={setUserIdError}
      />

      <TodoList todos={todos} />
    </div>
  );
};
