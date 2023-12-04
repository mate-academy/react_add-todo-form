import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import Todo from './types/Todo';
import { TodoForm } from './components/TodoForm/TodoForm';

function getNewTodoId(todos: Todo[]): number {
  const biggestId = Math.max(...todos.map((todo) => todo.id));

  return biggestId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [formInputs, setFormInputs] = useState({
    title: '',
    userId: 0,
  });
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(u => u.id === todo.userId),
  }));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setFormInputs({
      ...formInputs,
      title: input,
    });

    setTitleErrorMessage('');
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormInputs({
      ...formInputs,
      userId: +event.target.value,
    });

    setUserErrorMessage('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formInputs.title) {
      setTitleErrorMessage('Please enter a title');
    }

    if (formInputs.userId <= 0) {
      setUserErrorMessage('Please choose a user');
    }

    if (formInputs.userId <= 0 || !formInputs.title) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: getNewTodoId(todos),
        title: formInputs.title,
        completed: false,
        userId: formInputs.userId,
      },
    ]);

    setFormInputs({
      title: '',
      userId: 0,
    });
  };

  return (
    <div className="App">
      <TodoForm
        formInputs={formInputs}
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
