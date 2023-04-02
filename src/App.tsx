import './App.scss';
import { FormEventHandler, useState } from 'react';
import { TodoList, getUser } from './components/TodoList';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import todosFromServer from './api/todos';

function findMaxId(items: Title[]) {
  let maxId = 0;

  items.forEach(item => {
    if (item.id > maxId) {
      maxId = item.id;
    }
  });

  return maxId;
}

type Title = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

export const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState<Title>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const [todos, setTodos] = useState<Todo[]>(() => todosFromServer
    .map((todo) => ({
      ...todo,
      user: getUser(todo.userId),
    })));

  const [selectedUserId, setSelectedUserId] = useState({
    select: 0,
  });

  const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setSelectedUserId(prevState => ({
      ...prevState,
      [name]: +value,
    }));
    setFieldErrors({
      ...fieldErrors,
      select: value === '0' ? 'Please choose a user' : '',
    });
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: e.target.value,
    });
    setFieldErrors({
      ...fieldErrors,
      title: newTodo.title.trim() === '' ? 'Please enter a title' : '',
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const titleError = newTodo.title.trim() === ''
      ? 'Please enter a title' : '';
    const selectError = selectedUserId.select === 0
      ? 'Please choose a user' : '';

    setFieldErrors({
      title: titleError,
      select: selectError,
    });
    if (titleError === '' && selectError === '') {
      const maxId = findMaxId(todos);
      const nextId = maxId + 1;
      const newTodoItem = {
        ...newTodo, id: nextId, userId: selectedUserId.select,
      };

      setNewTodo(newTodoItem);

      const newTodos = [...todos, {
        ...newTodoItem, user: getUser(newTodoItem.userId),
      }];

      setTodos(
        newTodos,
      );
      setNewTodo({
        id: 0,
        title: '',
        completed: false,
        userId: 0,
      });
      setSelectedUserId({
        select: 0,
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={newTodo.title}
            onChange={handleTitle}
          />
          {fieldErrors.title
            && <span className="error">{fieldErrors.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="select"
            value={selectedUserId.select}
            onChange={handleSelected}
          >
            <option value="0">Choose a user</option>
            <>
              {usersFromServer.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </>
          </select>
          {fieldErrors.select
            && <span className="error">{fieldErrors.select}</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
