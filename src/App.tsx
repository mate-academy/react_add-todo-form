import { FormEvent, useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

const getUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const initialTodoInfo = {
  title: '',
  userId: 0,
};

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);
  const [todoInfo, setTodoInfo] = useState(initialTodoInfo);

  const handleInputChange = (value: string) => {
    setIsTitleValid(true);
    setTodoInfo(prev => ({
      ...prev,
      title: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setIsUserValid(true);
    setTodoInfo(prev => ({
      ...prev,
      userId: +value,
    }));
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todoInfo.title.trim()) {
      setIsTitleValid(false);
    }

    if (!todoInfo.userId) {
      setIsUserValid(false);
    }

    if (todoInfo.title && todoInfo.userId) {
      const ids = todos.map(todo => todo.id);
      const newTodo = {
        ...todoInfo,
        id: Math.max(...ids) + 1,
        completed: false,
        user: getUserById(todoInfo.userId),
      };

      setTodos(prev => ([...prev, newTodo]));
      setTodoInfo(initialTodoInfo);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            value={todoInfo.title}
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={(e) => handleInputChange(e.target.value)}
          />
          {!isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userId">User: </label>
          <select
            id="userId"
            name="userId"
            data-cy="userSelect"
            onChange={e => handleSelectChange(e.target.value)}
            value={todoInfo.userId}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {!isUserValid && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
