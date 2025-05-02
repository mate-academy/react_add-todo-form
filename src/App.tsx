import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

type Task = {
  id: number;
  title: string;
  name: string;
};

export const App = () => {
  const [choseUser, setChoseUser] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [newTask, setNewTask] = useState<Task[]>([]);

  const userChose = (id: number) => setChoseUser(id);

  const [isInputTouched, setIsInputTouched] = useState(false);
  const [isSelectTouched, setSelectTouched] = useState(false);

  function addNewTask() {
    const task = {
      id: choseUser,
      title: inputValue,
      name: usersFromServer.find(item => item.id === choseUser).name,
    };

    if (!inputValue) {
      return;
    }

    setNewTask(prev => [...prev, task]);

    setInputValue('');
    setChoseUser(0);

    setIsInputTouched(false);
    setSelectTouched(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={inputValue}
            onBlur={() => setIsInputTouched(true)}
            onChange={e => setInputValue(e.target.value)}
          />

          {isInputTouched && !inputValue && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={choseUser}
            onChange={e => userChose(+e.target.value)}
            onBlur={() => setSelectTouched(true)}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {choseUser === 0 && isSelectTouched && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={e => {
            e.preventDefault();
            addNewTask();
          }}
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>

        <TodoList taskArray={newTask} />
      </section>
    </div>
  );
};
