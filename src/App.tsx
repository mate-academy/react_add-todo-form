import React, { useState } from 'react';
import { ToDoList } from './components/ToDoList';

import { ToDoWithUser } from './interfaces/ToDoWithUser';

import './App.scss';
import './styles/Title.scss';
import './styles/Grid.scss';

import users from './api/users';
import toDos from './api/todos';
import { FormErrors } from './components/FormErrors';

const App: React.FC = () => {
  const initialValue: Array<ToDoWithUser> = toDos.map((toDo) => {
    return {
      ...toDo,
      user: users.find((user) => toDo.userId === user.id) || null,
    };
  });

  const [toDoList, setToDoList] = useState<Array<ToDoWithUser>>(initialValue);
  const [toDoTitle, setToDoTitle] = useState('');
  const [toDoCompleted, setToDoCompleted] = useState('not completed');
  const [selectedUser, setSelectedUser] = useState('-1');
  const [isTitleValid, setTitleValid] = useState(false);
  const [isUserValid, setUserValid] = useState(false);
  const [showErrorForm, setShowErrorForm] = useState(false);

  const formRef = React.createRef<HTMLFormElement>();

  const titleChangeListener = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue
    = e.currentTarget.value.replace(/[^a-zA-Z0-9А-Яа-я\s]/g, '');

    setToDoTitle(() => {
      setTitleValid(enteredValue.trim().length > 0);
      setShowErrorForm(false);

      return enteredValue;
    });
  };

  const statusChangeListener = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDoCompleted(e.currentTarget.value);
  };

  const userChangeListener = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.currentTarget.value);
    setUserValid(Number(e.currentTarget.value) > 0);
    setShowErrorForm(false);
  };

  const addToDo = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!isTitleValid || !isUserValid) {
      setShowErrorForm(true);

      return;
    }

    const newUser
    = users.find(user => String(user.id) === selectedUser) || null;

    const newToDo: ToDoWithUser = {
      userId: Number(selectedUser),
      id: toDoList.length + 1,
      title: toDoTitle,
      completed: toDoCompleted === 'completed',
      user: newUser,
    };

    setToDoList((prevValue) => (
      [
        ...prevValue,
        newToDo,
      ]
    ));

    setToDoTitle('');
    setToDoCompleted('not completed');
    setSelectedUser('-1');
    setTitleValid(false);
    setUserValid(false);
  };

  return (
    <div className="app">
      <h1 className="title app__title">Add todo form</h1>

      <div className="app__content-container grid">
        <div className="wrap grid__item--1-1">
          <ToDoList toDos={toDoList} />
        </div>

        <div className="wrap grid__item--2-2">
          <form
            id="toDoForm"
            onSubmit={addToDo}
            className="app__form"
            ref={formRef}
          >
            <h1 className="title">
              Add task
            </h1>

            <div>
              <label className="app__form-input" htmlFor="task-name">
                Task name:
              </label>
              <input
                id="task-name"
                type="text"
                className="app__form-input"
                value={toDoTitle}
                onChange={titleChangeListener}
              />
            </div>

            <div>
              <label htmlFor="status-n">Not completed</label>
              <input
                type="radio"
                id="status-n"
                name="status-completed"
                value="not completed"
                checked={toDoCompleted === 'not completed'}
                onChange={statusChangeListener}
                className="App__radioNot"
              />
              <label htmlFor="status-y">Completed</label>
              <input
                type="radio"
                id="status-y"
                name="status-completed"
                value="completed"
                checked={toDoCompleted === 'completed'}
                onChange={statusChangeListener}
                className="App__radioYes"
              />
            </div>

            <select
              name="user"
              onChange={userChangeListener}
              value={selectedUser}
            >
              <option key="-1">
                Choose a user
              </option>

              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <button type="submit">
              Create Task
            </button>
          </form>

          {
            showErrorForm
           && (
             <FormErrors
               isTitleValid={isTitleValid}
               isUserValid={isUserValid}
             />
           )
          }
        </div>
      </div>
    </div>
  );
};

export default App;
