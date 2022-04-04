import React, { ChangeEvent, useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

import { FullTodo, Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function preparedTodos(
  todosList: Todo[],
): FullTodo[] {
  return todosList.map((todo) => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
}

const prepareTodos = preparedTodos(todos);

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todo, addTodo] = useState(prepareTodos);

  const [userError, setUserError] = useState('');
  const [titleError, setTitleError] = useState('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter the title');
    }

    if (!userId) {
      setUserError('Please choose a user');
    }

    if (userId && title) {
      addTodo(allTodos => [...allTodos, {
        userId,
        title,
        id: todo.length + 1,
        completed: false,
        user: users.find(user => user.id === userId) || null,
      }]);
    }

    setUserId(0);
    setTitle('');
  };

  const handlerChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    switch (event.target.name) {
      case 'title':
        setTitle(event.target.value);
        setTitleError('');
        break;
      case 'user':
        setUserId(Number(event.target.value));
        setUserError('');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1 className="main">Add Todo Form</h1>
      <form
        method="post"
        action="#"
        onSubmit={submitHandler}
        className="form"
      >
        <div className="label">
          <label htmlFor="title">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Write the title"
              value={title}
              onChange={handlerChange}
              className="title"
            />
          </label>
        </div>
        {titleError && <p className="title_error">{titleError}</p>}
        <div className="select">
          <select
            id="user"
            name="user"
            value={userId}
            onChange={handlerChange}
            className="user_select"
          >
            <option value="">Choose a user</option>
            {users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {userError && <p className="user_error">{userError}</p>}
        </div>
        <div className="button">
          <button className="button_add" type="submit">
            Add the Form
          </button>
        </div>
      </form>
      <TodoList todos={todo} />
    </>
  );
};

export default App;
