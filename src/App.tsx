import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './types';
import { TodoList } from './components/TodoList';

const findTodo: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find((user1: User) => user1.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [todoList, setTodoList] = useState(findTodo);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const hasTitleError = !title;
    const hasUserError = !selectedUser;

    setErrorTitle(hasTitleError);
    setErrorUser(hasUserError);

    if (hasTitleError || hasUserError) {
      return;
    }

    const maxId = Math.max(0, ...todoList.map(t => t.id));

    const todo: Todo = {
      id: maxId + 1,
      title: title,
      completed: false,
      userId: selectedUser,
      user: usersFromServer.find(user => user.id === selectedUser),
    };

    setTodoList(current => [...current, todo]);

    setTitle('');
    setSelectedUser(0);
  }

  function handleUserChange(id: number) {
    setSelectedUser(id);

    setErrorUser(false);
  }

  function handleTitleChange(text: string) {
    setTitle(text);
    setErrorTitle(false);
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
            placeholder="Enter todo title"
            value={title}
            onChange={event => handleTitleChange(event.target.value)}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => handleUserChange(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todoList={todoList} />
      </section>
    </div>
  );
};
