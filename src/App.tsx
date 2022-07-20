import { FC, useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: FC = () => {
  const [inputedTitle, setInputedTitle] = useState('');
  const [choosedUser, setCoosedUser] = useState('');
  const [isTryAddTodo, setIsTryAddTodo] = useState(false);

  const addNewTodo = () => {
    const lastTodo = preparedTodos[preparedTodos.length - 1];
    const findedUser = users.find(user => user.name === choosedUser);

    if (inputedTitle.length > 0 && choosedUser !== 'Choose a user') {
      preparedTodos.push({
        userId: findedUser?.id || 0,
        id: lastTodo.id + 1,
        title: inputedTitle,
        user: findedUser || null,
        completed: false,
      });

      setInputedTitle(() => (''));
      setCoosedUser(() => ('Choose a user'));
      setIsTryAddTodo(false);
    } else {
      setIsTryAddTodo(true);
    }
  };

  const titleHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputedTitle(event.target.value);
    if (isTryAddTodo) {
      setIsTryAddTodo(false);
    }
  };

  const nameHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCoosedUser(event.target.value);
    if (isTryAddTodo) {
      setIsTryAddTodo(false);
    }
  };

  return (
    <div className="App">
      <h1 hidden>Add todo form</h1>
      <form method="post" className="App__form">
        <h4 className="title">Add new TODO</h4>
        <label className="Input-field">
          Title:
          <textarea
            name="title"
            data-cy="titleInput"
            value={inputedTitle}
            placeholder="title"
            onChange={(event) => titleHandler(event)}
          />
          {isTryAddTodo && !inputedTitle && 'Please enter the title'}
        </label>

        <label className="Input-field">
          {'User: '}
          <select
            name="user"
            data-cy="userSelect"
            value={choosedUser}
            className="Input-field__select"
            onChange={event => nameHandler(event)}
          >
            <option value="">Choose a user</option>
            {users.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {isTryAddTodo && !choosedUser && 'Please choose a user'}
        </label>

        <button
          type="button"
          className="button"
          onClick={addNewTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};

export default App;
