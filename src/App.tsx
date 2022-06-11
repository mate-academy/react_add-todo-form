import React, { useState } from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { PreparedTodo } from './react-app-env';
import { TodoList } from './componets/TodoList';

const getUserById = (userId: number) => {
  return users.find(person => person.id === userId) || null;
};

const usersPrepareTodos: PreparedTodo[] = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const App: React.FC = () => {
  const [todosList, setTodosList] = useState<PreparedTodo[]>(usersPrepareTodos);
  const [newTodosName, setNewTodosName] = useState('');
  const [selectUserId, setSelectUserId] = useState(0);
  const [isCompleted] = useState(false);
  const [error, setError] = useState({
    title: false,
    user: false,
  });

  const onTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (
      target.value.match(/[A-Za-zА-Яа-я 0-9]/gi)?.join('').length
        !== target.value.length) {
      return;
    }

    setNewTodosName(target.value);
    if (target.value !== '') {
      setError({
        ...error,
        title: false,
      });
    }
  };

  const onNameChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;

    setSelectUserId(+target.value);
    if (target.value !== '0') {
      setError({
        ...error,
        user: false,
      });
    }
  };

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: newTodosName,
      userId: selectUserId,
      user: getUserById(selectUserId),
      completed: isCompleted,
    };

    if (!newTodo.userId || newTodo.title === '') {
      setError({
        title: newTodo.title === '',
        user: newTodo.userId === 0,
      });

      return;
    }

    setTodosList([
      ...todosList,
      newTodo,
    ]);
    setSelectUserId(0);
    setNewTodosName('');
  };

  return (
    <div className="App">

      <h1>Form</h1>

      {error.title && (
        <h5>
          Please enter the title
        </h5>
      )}

      {error.user && (
        <h5>
          Please choose a user
        </h5>
      )}

      <TodoList
        preparedTodos={todosList}
      />

      <form
        onSubmit={handleSumbit}
      >
        <label>
          Title
          <input
            value={newTodosName}
            type="text"
            onChange={onTitleChange}
            placeholder="Fill the Todo title"
          />
        </label>

        <label>
          User Name
          <select
            value={selectUserId}
            onChange={onNameChange}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
