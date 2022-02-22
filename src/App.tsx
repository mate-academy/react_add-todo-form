import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodo: Todo[] = todos.map(task => {
  return {
    ...task,
    user: users.find(user => (user.id === task.userId)) || null,
  };
});

const App: React.FC = () => {
  const [todoList, setTodos] = useState([...preparedTodo]);
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [isValideTitle, setIsValideTitle] = useState(false);
  const [isValideUser, setIsValideUser] = useState(false);

  const selectionCall = 'Chose Your Fighter';

  const addNewTodo = () => {
    const newTodo: Todo = {
      userId: 1,
      id: todoList.length + 1,
      title,
      user: users.find(person => person.name === user) || null,
      completed: false,
    };

    setTodos([...todoList, newTodo]);
  };

  const submitAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      alert('please create your title');
      setIsValideTitle(false);
    }

    if (user === selectionCall || user === '') {
      alert('please, pick someone!');
      setIsValideUser(false);
    }

    if (!isValideTitle || !isValideUser) {
      return;
    }

    setIsValideUser(false);
    setIsValideTitle(false);
    addNewTodo();
    setUser(selectionCall);
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/"
        onSubmit={(event) => {
          submitAction(event);
        }}
      >
        <label htmlFor="text">
          <input
            id="text"
            value={title}
            type="text"
            placeholder="input some text..."
            onChange={(event) => {
              setTitle(event.target.value);
              if (event.target.value !== '') {
                setIsValideTitle(true);
              } else {
                setIsValideTitle(false);
              }
            }}
          />
          {isValideTitle || (
            'please, start typing'
          )}

        </label>
        <label htmlFor="select">
          <select
            id="select"
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
              if (event.target.value !== selectionCall) {
                setIsValideUser(true);
              } else {
                setIsValideUser(false);
              }
            }}
          >
            <option value={selectionCall}>
              Choose You Fighter
            </option>
            {users.map(el => {
              return (
                <option value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
          {isValideUser || (
            'please, chose someone!'
          )}

        </label>
        <button
          type="submit"
        >
          add
        </button>
      </form>

      <TodoList todos={todoList} />

    </div>

  );
};

export default App;
