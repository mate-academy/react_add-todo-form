import React, { useState, useMemo } from 'react';
import './App.scss';
import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const [todoList, addTodoToList] = useState(todos);
  const [user, addUser] = useState('');
  const [title, addTitle] = useState('');
  const [status, changeStatus] = useState('not completed');
  const [titleError, showTitleError] = useState<string | null>(null);
  const [userError, showUserError] = useState<string | null>(null);

  const addTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    addTitle(newTitle.replace(/[^a-zA-Z0-9А-Яа-я\s]/g, ''));
    showTitleError(null);
  };

  const validator = () => {
    if (!user) {
      showUserError('Please choose a user');
    }

    if (!title.trim()) {
      showTitleError('Please enter the title');
    }

    if (!user || !title.trim()) {
      return false;
    }

    return true;
  };

  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (validator()) {
      const preparedUser = users.find(({ name }) => name === user);

      const newTodo = {
        userId: preparedUser ? preparedUser.id : 0,
        id: todoList[todoList.length - 1].id + 1,
        title,
        completed: status === 'completed',
      };

      addTodoToList((current) => [...current, newTodo]);
      addTitle('');
      addUser('');
      changeStatus('not completed');
    }
  };

  const newTodosArr = (todosArr: Omit<Todo, 'user'>[]) => todosArr
    .map((todoItem) => ({
      ...todoItem,
      user: users.find((todoUser) => todoUser.id === todoItem.userId),
    }));

  const preparedTodos: Todo[] = useMemo(
    () => newTodosArr(todoList), [todoList],
  );

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form className="Form" onSubmit={addTodo}>
        <h2 className="Form__title">Create a new todo!</h2>

        <label>
          <input
            type="text"
            name="title"
            className="Form__inputTitle"
            value={title}
            placeholder="Title"
            onChange={addTodoTitle}
          />
        </label>
        {titleError && <span className="Form__error">{titleError}</span>}

        <select
          name="user"
          className="Form__select"
          value={user}
          onChange={(event) => {
            addUser(event.target.value);
            showUserError(null);
          }}
        >
          <option value="">Choose a user</option>
          {users.map(({ name, id }) => (
            <option value={name} key={id}>{name}</option>
          ))}
        </select>
        {userError && <span className="Form__error">{userError}</span>}

        <div className="Form__status">
          <label htmlFor="status_true">Completed</label>
          <input
            type="radio"
            name="status"
            id="status_true"
            value="completed"
            checked={status === 'completed'}
            onChange={(event) => changeStatus(event.target.value)}
          />

          <label htmlFor="status_false">Not completed</label>
          <input
            type="radio"
            name="status"
            id="status_false"
            value="not completed"
            checked={status === 'not completed'}
            onChange={(event) => changeStatus(event.target.value)}
          />
        </div>

        <button type="submit" className="Form__button">Add</button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
