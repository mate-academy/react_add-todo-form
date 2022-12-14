import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { TodosList } from './types/TodoList';
// import { TodoListWithUsers } from './types/TodoListWithUsers';

const maxId = (...todos: TodosList[]) => {
  const getAllIds = todos.map(todo => {
    return todo.id;
  });

  return Math.max(...getAllIds);
};

export const App: React.FC = () => {
  const [todo, setToDo] = useState('');
  const [selectedNameId, setSelectedNameId] = useState(0);
  const [todos, setTodoList] = useState([...todosFromServer]);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isSelectEmpty, setIsSelectEmpty] = useState(false);
  const [todoId, setTodoId] = useState(maxId(...todos));
  // const [todosWithUsers, setTodosWithUsers] = useState([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDo(
      event.target.value.replace(/[^a-zA-Za-åa-ö-w-я 0-9_]/gi, ''),
    );

    if (event.target.value.length > 0) {
      setIsTitleEmpty(false);
    }
  };

  // eslint-disable-next-line max-len
  const concatTodoUsers = todos.map(todoFromTodos => ({
    ...todoFromTodos,
    user: usersFromServer.find(user => user.id === todoFromTodos.userId),
  }));

  // console.log(concatTodoUsers);

  const handleChangeSlect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedNameId(+event.target.value);

    if ((+event.target.value) > 0) {
      setIsSelectEmpty(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTodoEmpty = todo !== '';
    const isSelectName = selectedNameId > 0;

    if (isTodoEmpty && isSelectName) {
      setTodoList([...todos, {
        id: todoId + 1,
        title: todo,
        completed: false,
        userId: +selectedNameId,
      }]);

      setTodoId(todoId + 1);
      setToDo('');
      setSelectedNameId(0);
    }

    if (!isSelectName) {
      setIsSelectEmpty(true);
    }

    if (!isTodoEmpty) {
      setIsTitleEmpty(true);
    }
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
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            value={todo}
            onChange={handleChange}
            placeholder="Enter a title"
          />

          {isTitleEmpty && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="usernames">User: </label>
          <select
            data-cy="userSelect"
            value={selectedNameId}
            onChange={handleChangeSlect}
            name="usernames"
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {isSelectEmpty && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={concatTodoUsers} />
    </div>
  );
};
