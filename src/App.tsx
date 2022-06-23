import React, { ChangeEvent, useState } from 'react';
import './App.css';

import cn from 'classnames';
import users from './api/users';
import todos from './api/todos';

import { FinalFormToDo, ToDo, User } from './react-app-env';

const prepariedToDos: FinalFormToDo[] = (
  todos.map((action: ToDo) => (
    {
      ...action,
      user: users.find((person: User) => (
        person.id === action.userId
      )) || null,
    }
  ))
);

// eslint-disable-next-line no-console
console.log(prepariedToDos);

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [hasinputError, setInputError] = useState(false);

  const [selecedUserId, setSelecedUserId] = useState(0);
  const [hasIdError, setIdError] = useState(false);

  const [done, setDone] = useState(false);

  const [toDoList, setToDoList] = useState(prepariedToDos);

  const newToDoConstruct = (
    userId: number,
    title: string,
    status: boolean,
  ): FinalFormToDo => {
    const courentUser: User | undefined = users.find((person: User) => (
      person.id === userId) || null);

    return {
      userId,
      id: toDoList[toDoList.length - 1].id + 1,
      title,
      completed: status,
      user: courentUser,
    };
  };

  const inputFollower = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((/^[\wа-яА-Я ]+$/).test(event.target.value)) {
      setInput(event.target.value);
      if (hasinputError) {
        setInputError(false);
      }
    }
  };

  const addingNewTask = (event: React.FormEvent) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    console.log(selecedUserId, input);

    setIdError(!selecedUserId);
    setInputError(!input);

    if (selecedUserId && input) {
      setToDoList(corentList => (
        [...corentList, newToDoConstruct(selecedUserId, input, done)]
      ));
      setInput('');
      setSelecedUserId(0);
      setDone(false);
    }
  };

  const selectedId = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelecedUserId(+event.target.value);
    if (hasIdError) {
      setIdError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addingNewTask}>
        <input
          type="text"
          value={input}
          className={cn({ error: hasinputError })}
          onChange={inputFollower}
          placeholder="There what I need to do"
        />
        {hasinputError && (
          <span
            className="error__box"
          >
            Please enter the title
          </span>
        )}

        <select
          value={selecedUserId}
          onChange={selectedId}
          className={cn({ error: hasIdError })}
        >
          <option value="0">
            Choose a user
          </option>

          {users.map(person => (
            <option value={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        <input
          type="checkbox"
          checked={done}
          onChange={() => {
            setDone(curentState => !curentState);
          }}
        />

        {hasIdError && (
          <span
            className="error__box"
          >
            Please choose a user
          </span>
        )}

        <button
          type="submit"
        >
          Add
        </button>
      </form>
      <p>
        <span>Users: </span>
        <ul>
          {toDoList.map(toDo => (
            <li key={toDo.id}>
              <h1>{`Task ${toDo.id}`}</h1>
              <title>
                {toDo.title}
              </title>

              <p>{toDo.user?.name}</p>
              <p>{toDo.user?.email}</p>
            </li>
          ))}
        </ul>
      </p>
    </div>
  );
};

export default App;
