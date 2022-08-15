import './App.scss';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState('');
  const [isChooseTitile, setIsChooseTitile] = useState(false);
  const [isChooseUser, setIsChooseUser] = useState(false);

  function submitForm(event: React.SyntheticEvent) {
    event.preventDefault();

    const chooseUser = usersFromServer.find(user => user.name === selected);

    const addTodo = {
      id: todos.length + 1,
      title: input,
      completed: false,
      userId: (chooseUser ? chooseUser.id : 0),
    };

    if (addTodo.title.replace(/\s/g, '').trim().length > 1) {
      setIsChooseTitile(false);
    } else {
      setIsChooseTitile(true);
    }

    if (chooseUser) {
      setIsChooseUser(false);
    } else {
      setIsChooseUser(true);
    }

    if (input !== '' && addTodo.userId !== 0) {
      setTodos([...todos, addTodo]);
      setInput('');
      setSelected('');
    }
  }

  function titleSelect(event: any) {
    setInput(event.target.value);
    setIsChooseTitile(false);
  }

  function userSelect(event: any) {
    setSelected(event.target.value);
    setIsChooseUser(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          submitForm(event);
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={input}
            onChange={((event) => titleSelect(event))}
          />
          {isChooseTitile
            && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selected}
            onChange={(event) => userSelect(event)}
          >
            <option value="0" key={uuidv4()}>Choose a user</option>
            {[...usersFromServer].map(user => (
              <option value={user.name} key={uuidv4()}>{user.name}</option>
            ))}
          </select>
          {isChooseUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onChange={() => setTodos(todos)}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
