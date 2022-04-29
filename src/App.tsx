import React, { useState } from 'react';
import './App.scss';

// import { identity } from 'cypress/types/lodash';
import users from './api/users';
import todos from './api/todos';
import TodosList from './components/TodosList/TodosList';

function editText(inputText: string): string {
  const admittedSymbols
    = 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя 0123456789';

  if (admittedSymbols.includes(inputText[inputText.length - 1])
  || admittedSymbols.toUpperCase().includes(inputText[inputText.length - 1])) {
    return inputText
      .slice(0, inputText.length - 1) + inputText[inputText.length - 1];
  }

  return inputText.slice(0, inputText.length - 1);
}

const App: React.FC = () => {
  const [todosList, setTodos] = useState(todos);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [currentTitle, setCurrentTitle] = useState('');
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [isUserWarningVisible, setIsUserWarningVisible] = useState(false);
  const [isTitleWarningVisible, setIsTitleWarningVisible] = useState(false);
  const [todosIds, setTodosIds] = useState([...todos].map(todo => todo.id));
  const [selectValue, setSelectValue] = useState('');

  const handleSelectChange = (event: { target: { value: string; }; }) => {
    const user = users.find(curUser => curUser.username === event.target.value);

    if (user) {
      setCurrentUser(user);
      setIsUserSelected(true);
      setIsUserWarningVisible(false);
      setSelectValue(user.username);
    } else {
      setIsUserSelected(false);
      setSelectValue('');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputHandler = (event: { target: { value: any; }; }) => {
    const currentInput = event.target.value;

    setCurrentTitle(editText(currentInput));
    setIsTitleWarningVisible(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHandler = (event: any) => {
    event.preventDefault();

    let count = 0;

    for (let i = 0; i < currentTitle.length; i += 1) {
      if (currentTitle[i] !== ' ') {
        count += 1;
      }
    }

    if (!isUserSelected) {
      setIsUserWarningVisible(true);

      return;
    }

    if (count === 0) {
      setIsTitleWarningVisible(true);

      return;
    }

    if (!currentTitle) {
      setIsTitleWarningVisible(true);

      return;
    }

    const newTodo = {
      id: Math.max.apply(null, todosIds) + 1,
      userId: currentUser.id,
      title: currentTitle,
      completed: false,
    };

    setTodos([...todosList,
      newTodo]);
    setTodosIds([...todosIds,
      newTodo.id]);
    setSelectValue('');
    setCurrentTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        className="TodosForm"
        onSubmit={submitHandler}
      >

        <select
          value={selectValue}
          className="UsersList"
          onChange={handleSelectChange}
        >
          <option value="">
            Choose a user
          </option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.username}
            >
              {user.username}
            </option>
          ))}
        </select>

        <div
          className={isUserWarningVisible ? 'Warning' : 'hidden'}
        >
          Please choose a user
        </div>

        <label htmlFor="titleInput">
          TODO Title
        </label>

        <input
          className="TodosForm__title"
          type="text"
          name="title"
          id="titleInput"
          value={currentTitle}
          placeholder="Enter todo's title"
          onChange={inputHandler}
        />

        <div
          className={isTitleWarningVisible ? 'Warning' : 'hidden'}
        >
          Please enter the title
        </div>

        <button
          type="submit"
          className="Submit"
        >
          Add
        </button>
      </form>
      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <TodosList todosArr={todosList} />
    </div>
  );
};

export default App;
