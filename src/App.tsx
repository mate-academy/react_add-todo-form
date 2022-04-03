import React, { useState } from 'react';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';

import './App.scss';

const App: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>(todos);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const formSubmit = () => {
    if (!selectedPerson || !taskDescription.trim()) {
      if (!selectedPerson) {
        setUserError('choose user');
      }

      if (!taskDescription.trim()) {
        setTitleError('enter task description');
      }

      return;
    }

    setTodoList(prevState => ([
      ...prevState,
      {
        userId: users.filter(user => user.name === selectedPerson)[0].id,
        id: prevState.length + 1,
        title: taskDescription,
        completed: false,
      },
    ]));

    setSelectedPerson('');
    setTaskDescription('');
  };

  const inputChange = (value: string) => {
    setTaskDescription(value);

    if (value.length > 5) {
      setTitleError('');
    }
  };

  return (
    <div className="App">
      <h1 className="Todo__welcome">Add todo form</h1>
      <form
        method="POST"
        action="#"
        className="Todo__form"
        onSubmit={(event) => {
          event.preventDefault();
          formSubmit();
        }}
      >
        <textarea
          className="Todo__textarea"
          value={taskDescription}
          onChange={(event) => inputChange(event.target.value)}
          placeholder="Enter task description"
        />

        {titleError && <span className="Todo__error">{titleError}</span>}

        <select
          name="user"
          className="Todo__select"
          value={selectedPerson}
          onChange={(event) => {
            setSelectedPerson(event.target.value);
            setUserError('');
          }}
        >
          <option value="" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userError && <span className="Todo__error">{userError}</span>}

        <button type="submit" className="Todo__button">
          Push this task
        </button>
      </form>

      <ul className="Todo__list">
        {todoList.map(todo => (
          <li className="Todo__item" key={todo.id}>
            <p className="Todo__info">
              {`user/id${todo.userId}`}
              {' | '}
              {!todo.completed && ' completed: false'}
            </p>
            <h2 className="Todo__title">
              {todo.title}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
