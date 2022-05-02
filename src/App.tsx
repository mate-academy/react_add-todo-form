import React, { useState } from 'react';
import { Todo } from './Types/Todo';
import { TodoList } from './Components/TodoList/TodoList';
import './App.scss';
import todos from './api/todos';
import users from './api/users';

const preparedTodos: Todo [] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [td, setTodo] = useState(preparedTodos);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const addTodo = () => {
    setTodo((prev => {
      const newTodo = {
        user: users.find(user => user.id === userId) || null,
        userId,
        id: prev.length + 1,
        title,
        completed: false,
      };

      return [newTodo, ...prev];
    }));
  };

  // eslint-disable-next-line max-len
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setTitle(value.replace(/[^a-zA-Z\d\s]/, ''));
        setTitleError(false);
        break;
      case 'userId':
        setUserId(+value);
        setUserIdError(false);
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handeleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    reset();
    addTodo();
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <>
        <form className="App__form" onSubmit={handeleSubmit}>
          <label htmlFor="title" className="App__form-item">

            <input
              type="text"
              name="title"
              className="App__form-title"
              value={title}
              placeholder="Title"
              onChange={handleInputChange}
            />
            {titleError && (
              <div className="App__form-error">
                Please, enter the title.
              </div>
            )}
          </label>
          <label htmlFor="" className="App__form-item">
            <select
              id="userId"
              name="userId"
              className="App__form-input"
              value={userId}
              onChange={handleInputChange}
            >
              <option value="0" disabled selected>
                Choose name
              </option>
              {users.map(user => (

                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {userIdError && (
              <div className="App__form-error">
                Please, choose a user.
              </div>
            )}
          </label>
          <button type="submit" className="App__form-button">
            Add Todo
          </button>
        </form>
      </>
      <TodoList preparedTodos={td} />
    </div>
  );
};

export default App;
