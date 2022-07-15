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
  const [InputedTitle, setInputedTitle] = useState('');
  const [ChoosedUser, setCoosedUser] = useState('Choose a user');
  const [IsTryAddTodo, setIsTryAddTodo] = useState(false);

  const addNewTodo = () => {
    const lastTodo = preparedTodos[preparedTodos.length - 1];
    const findedUser = users.find(user => user.name === ChoosedUser);

    if (InputedTitle.length > 0 && ChoosedUser !== 'Choose a user') {
      preparedTodos.push({
        userId: findedUser?.id || 0,
        id: lastTodo.id + 1,
        title: InputedTitle,
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
            value={InputedTitle}
            placeholder="title"
            onChange={({ target }) => {
              setInputedTitle(target.value);
              if (IsTryAddTodo) {
                setIsTryAddTodo(false);
              }
            }}
          />
          {IsTryAddTodo
            && InputedTitle.length === 0
            && 'Please enter the title'}
        </label>

        <label className="Input-field">
          {'User: '}
          <select
            name="user"
            data-cy="userSelect"
            value={ChoosedUser}
            className="Input-field__select"
            onChange={({ target }) => {
              setCoosedUser(target.value);
              if (IsTryAddTodo) {
                setIsTryAddTodo(false);
              }
            }}
          >
            <option>Choose a user</option>
            {users.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {IsTryAddTodo
            && ChoosedUser === 'Choose a user'
            && 'Please choose a user'}
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
