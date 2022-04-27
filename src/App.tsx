import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import todos from './api/todos';

import { Todo } from './types/Todo';

const preparedTodos: Todo[] = todos
  .map(todo => {
    const user = users.find(person => person.id === todo.userId) || null;

    return {
      ...todo,
      user,
    };
  });

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const [todoList, setTodoList] = useState(preparedTodos);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (title && userId) {
      const todo = {
        id: todos.length + 1,
        title,
        completed: false,
        user: users.find(user => user.id === userId) || null,
      };

      setTodoList([...todoList, todo]);
      setTitle('');
      setUserId(0);
    }
  };

  const onSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="get" onSubmit={onSubmit}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={onTitleChange}
          />

          {titleError && <span className="error">Please enter a title</span>}

          <select
            name="user"
            id="user"
            value={userId}
            onChange={onSelectUser}
          >
            <option value="0">Choose user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}

          <button
            type="submit"
          >
            Add
          </button>

        </label>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};

export default App;
