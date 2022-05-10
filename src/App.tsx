import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css';

import users from './api/users';
import todos from './api/todos';

interface User {
  id: number,
  name: string,
  email: string,
}

interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user: User | null,
}

const preparedTodos: Todo[] = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.id) || null,
  };
});

const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserSelectedError, setIsUserSelectedError] = useState(false);

  const handleChange = (
    event: any,
  ) => {
    const { name, value, checked } = event.target;

    setIsTitleError(false);
    setIsUserSelectedError(false);

    switch (name) {
      case 'title':

        return setTitle(value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, ''));

      case 'selectedUserId':

        return setSelectedUserId(+value);

      case 'completed':
        return setCompleted(checked);

      default:
        return value;
    }
  };

  const addTodo = () => {
    const newTodo: Todo = {
      id: Date.now(),
      userId: selectedUserId,
      title,
      completed,
      user: users.find(user => user.id === selectedUserId) || null,
    };

    return setVisibleTodos([...visibleTodos, newTodo]);
  };

  const resetForm = () => {
    setTitle('');
    setSelectedUserId(0);
    setCompleted(false);
  };

  const toggleTask = (todoId: number, status: boolean) => {
    setVisibleTodos(
      visibleTodos.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, completed: !status };
        }

        return todo;
      }),
    );
  };

  const removeTodo = (todoId:number) => {
    setVisibleTodos(
      visibleTodos.filter(
        todo => todo.id !== todoId,
      ),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '' && selectedUserId === 0) {
      setIsTitleError(true);
      setIsUserSelectedError(true);

      return;
    }

    if (title === '') {
      setIsTitleError(true);

      return;
    }

    if (selectedUserId === 0) {
      setIsUserSelectedError(true);

      return;
    }

    addTodo();
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={handleSubmit}
      >

        <label htmlFor="title">
          {'Title: '}
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter task title"
            value={title}
            onChange={handleChange}
          />
          {isTitleError && (
            <span>Enter a valid title</span>
          )}
        </label>

        <label htmlFor="selectedUserId">
          {'Select user: '}
          <select
            name="selectedUserId"
            id="selectedUserId"
            value={selectedUserId}
            onChange={handleChange}
          >
            <option value={0} disabled>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isUserSelectedError && (
            <span>Select a user</span>
          )}
        </label>

        <label htmlFor="completed">
          {'Status: '}
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={completed}
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          className="button-form-submit"
        >
          Create new task
        </button>

      </form>
      {visibleTodos.length > 0 && (
        <>
          <h1>Todo list</h1>
          <ul>
            {visibleTodos.map(todo => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <div className="todo-info__container">
                  <div className="todo-info">
                    <h1>
                      {'Title: '}
                      {todo.title}
                    </h1>
                    <p>
                      {'Status: '}
                      {todo.completed ? 'Completed' : 'In progress'}
                    </p>
                    <p>
                      {'Name: '}
                      {todo.user?.name}
                    </p>
                    <p>
                      {'Email: '}
                      {todo.user?.email}
                    </p>
                  </div>
                  <div className="todo-controls">
                    <button
                      type="button"
                      className={classNames('button-todo-control', 'toggle')}
                      onClick={() => toggleTask(todo.id, todo.completed)}
                    >
                      Toggle status
                    </button>
                    <button
                      type="button"
                      className={classNames('button-todo-control', 'remove')}
                      onClick={() => removeTodo(todo.id)}
                    >
                      Remove task
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
