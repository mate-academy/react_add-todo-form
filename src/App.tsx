import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUser(userId: number): Users | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [inputInfo, setInputInfo] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [todoList, setTodoList] = useState(todosFromServer);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const onAdd = () => {
    const newTodoObj = {
      id: todoList.length += 1,
      title: inputInfo,
      completed: false,
      userId: selectedName,
      user: getUser(userId),
    };

    setTodoList(previous => {
      return [...previous, newTodoObj];
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!inputInfo || !selectedName) {
      return;
    }

    if (!inputInfo) {
      setErrorTitle(true);
    }

    if (!selectedName) {
      setErrorUser(true);
    }

    onAdd();

    setInputInfo('');
    setSelectedName('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={inputInfo}
              onChange={(event) => {
                setInputInfo(event.target.value);
                // setErrorTitle(false);
              }}
            />
          </label>
          {errorTitle && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              name="selectedName"
              data-cy="userSelect"
              value={selectedName}
              onChange={(event) => {
                setSelectedName(event.target.value);
                // setErrorUser(false);
              }}
            >
              <option
                value=""
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  // value={user.name}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {errorUser && (<span className="error">Please enter a title</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
// const handleSubmit = (event) => {
//   const {value, name} = event.target;

//   setSelectedName({[name]: value})

// }

// const onAdd = (todo: Todo) => {
//   setTodos(previous => {
//     const newTodoObj = {
//       ...todo,
//       title: inputInfo,
//       selectedName,
//       id: generadeId += 1,
//     };

//     return [...previous, newTodoObj];
//   });
// };

// const onAdd = () => {
//   setTodoList(previous => {
//     const newTodoObj = {
//       title: inputInfo,
//       selectedName,
//       user: getUser(),
//       completed: false,
//       // id: todo.id,
//     };

//     return [...previous, newTodoObj];
//   });
// };

// const onAdd = () => {
//   setTodoList(previous => {
//     const newTodoObj = {
//       ...todoList,
//       id: todoList.length += 1,
//       title: inputInfo,
//       selectedName,
//       // user: getUser(),
//       completed: false,
//       // id: todo.id,
//     };

//     return [...previous, newTodoObj];
//   });
// };
