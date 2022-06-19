import React, { ChangeEvent, useState } from 'react';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { PreparedTodo } from './react-app-env';

const preparedTodos: PreparedTodo[] = todos.map((todo) => {
  const user = users.find(person => person.id === todo.userId) || undefined;

  return (
    {
      ...todo,
      user,
    }
  );
});

const App: React.FC = () => {
  const [todoList, setTodoList] = useState(preparedTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUser, setTodoUser] = useState(0);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const addTodo = (title: string, userId: number):void => {
    const todo: PreparedTodo = {
      userId,
      id: todoList.length + 1,
      title,
      completed: false,
      user: users.find(user => user.id === userId),
    };

    setTodoList([...todoList, todo]);
  };

  const handleSubmit = (event: React.FormEvent):void => {
    event.preventDefault();

    if (todoTitle && todoUser) {
      addTodo(todoTitle, todoUser);
      setTodoTitle('');
      setTodoUser(0);
    }

    setShowTitleError(!todoTitle);
    setShowUserError(!todoUser);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">
          <input
            id="input"
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter the title"
            value={todoTitle}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setShowTitleError(false);
              setTodoTitle(event.target.value);
            }}
          />

        </label>

        <select
          data-cy="userSelect"
          name="user"
          value={todoUser}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setShowUserError(false);
            setTodoUser(Number(event.target.value));
          }}
        >
          <option value={0} disabled>Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit">
          Add todo
        </button>

        {showTitleError
          && <p className="App__error">Please enter the title</p>}
        {showUserError
          && <p className="App__error">Please choose a user</p>}
      </form>
      <TodoList preparedTodos={todoList} />
    </div>
  );
};

export default App;
