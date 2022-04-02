import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};

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
        <input
          type="text"
          className="Todo__input"
          value={taskDescription}
          onChange={(event) => inputChange(event.target.value)}
          placeholder="Enter task description"
        />

        {titleError && <span>{titleError}</span>}

        <select
          name="user"
          className="Todo__select"
          value={selectedPerson}
          onChange={(event) => {
            setSelectedPerson(event.target.value);
            setUserError('');
          }}
        >
          <option
            value=""
            disabled
          >
            Choose a user
          </option>
          {users.map((user) => (
            <option
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {userError && <span>{userError}</span>}

        <button type="submit" className="Todo__button">
          Push this task
        </button>
      </form>

      <ul className="Todo__list">
        {todoList.map(todo => (
          <li className="Todo__item" key={todo.id}>
            <h2 className="Todo__title">
              {todo.title}
            </h2>
            <h3 className="Todo__info">
              {`user/id${todo.userId}`}
              <input type="checkbox" defaultChecked={todo.completed} />
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
