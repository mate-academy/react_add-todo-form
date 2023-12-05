import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import Todo from './types/Todo';
import { TodoForm } from './components/TodoForm/TodoForm';
import User from './types/User';

function getNewTodoId(todos: Todo[]): number {
  const biggestId = Math.max(...todos.map((todo) => todo.id));

  return biggestId + 1;
}

function findUserById(users: User[], userId: number): User | null {
  return users.find(user => user.id === userId) || null;
}

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: findUserById(usersFromServer, todo.userId),
  }));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setTitle(input);

    setTitleErrorMessage('');
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    setUserErrorMessage('');
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    }

    if (userId <= 0) {
      setUserErrorMessage('Please choose a user');
    }

    if (userId <= 0 || !title) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: getNewTodoId(todos),
        title,
        completed: false,
        userId,
      },
    ]);

    resetForm();
  };

  return (
    <div className="App">
      <TodoForm
        title={title}
        userId={userId}
        titleErrorMessage={titleErrorMessage}
        userErrorMessage={userErrorMessage}
        handleUserIdChange={handleUserIdChange}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <TodoList todos={todosWithUsers} />

    </div>
  );
};
