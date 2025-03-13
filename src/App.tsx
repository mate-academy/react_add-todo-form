import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './type/User';
import { Todo } from './type/Todo';
import { useState } from 'react';

function getUserById<T>(userId: T): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getIdTodo(list: Todo[]) {
  const maxId = Math.max(...list.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todoList, setTodos] = useState<Todo[]>(todos);

  const [titleInput, setTitleInput] = useState('');
  const [userSelect, setUserSelect] = useState('');

  const [titleError, setTitleError] = useState('');
  const [userSelectError, setUserSelectError] = useState('');

  function defaultForm() {
    setTitleInput('');
    setUserSelect('');
  }

  function onAdd() {
    const newTodo: Todo = {
      id: getIdTodo(todoList),
      title: titleInput,
      completed: false,
      userId: +userSelect,
      user: getUserById(+userSelect),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  function validationTitle() {
    if (titleInput.trim() === '') {
      return 'Please enter a title';
    }

    return '';
  }

  function validationSelect() {
    if (userSelect === '') {
      return 'Please choose a user';
    }

    return '';
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errorTitle = validationTitle();
    const errorSelect = validationSelect();

    setTitleError(errorTitle);
    setUserSelectError(errorSelect);

    if (errorTitle || errorSelect) {
      return;
    }

    defaultForm();
    onAdd();
  }

  function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitleInput(event.target.value);
    setTitleError('');
  }

  function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserSelect(event.target.value);
    setUserSelectError('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            onChange={event => handleChangeTitle(event)}
            placeholder="Enter title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={event => handleChangeSelect(event)}
          >
            <option value={''} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userSelectError && <span className="error">{userSelectError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
