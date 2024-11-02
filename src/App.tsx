import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { Select } from './components/Select/Select';
import { Input } from './components/Input/Input';

const getTodoList = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(u => u.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodoList);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
    user: null,
  });
  const [errorTitle, setErrorTitle] = useState('');
  const [errorUser, setErrorUser] = useState('');

  function addTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const id = (Math.max(...todos.map(u => u.id)) || 0) + 1;

    const user = usersFromServer.find(u => u.id === newTodo.userId) || null;

    if (newTodo.title && newTodo.userId !== 0) {
      setTodos(prev => [
        ...prev,
        {
          ...newTodo,
          id,
          user: user,
        },
      ]);

      setNewTodo({
        id: 0,
        title: '',
        completed: false,
        userId: 0,
        user: null,
      });

      setErrorTitle('');
      setErrorUser('');
    }

    if (!newTodo.title) {
      setErrorTitle('Please enter a title');
    }

    if (newTodo.userId === 0) {
      setErrorUser('Please choose a user');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Add todo form</h1>

      <form
        className="section box is-three-fifths"
        onSubmit={addTodo}
        method="POST"
        noValidate
      >
        <Input
          value={newTodo.title}
          isError={!!errorTitle}
          callback={(title: string) =>
            setNewTodo(prev => ({ ...prev, title: title }))
          }
        />

        <Select
          users={usersFromServer}
          value={newTodo.userId}
          callback={(userId: number) =>
            setNewTodo(prev => ({ ...prev, userId }))
          }
          isError={!!errorUser}
        />

        <div className="control">
          <button
            type="submit"
            data-cy="submitButton"
            className="button is-primary"
          >
            Add
          </button>
        </div>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
