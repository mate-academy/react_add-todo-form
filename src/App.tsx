import React, { useState } from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

import { Todo } from './types';

const preparedTodos: Todo[] = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.id) || null,
  };
});

const App: React.FC = () => {
  const [todoList, addTodoList] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleChange = (event: any) => {
    const { name, value, checked } = event.target;

    setIsTitleError(false);
    setIsUserError(false);

    switch (name) {
      case 'title':
        return setTitle(value.replace(/[^a-zA-Za-яА-Я0-9 ]/g, ''));

      case 'userId':
        return setUserId(+value);

      case 'completed':
        return setCompleted(checked);

      default:
        return value;
    }
  };

  const addTodo = () => {
    const newTodo: Todo = {
      id: Date.now(),
      userId,
      title,
      completed,
      user: users.find(user => user.id === userId) || null,
    };

    return addTodoList([...todoList, newTodo]);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setCompleted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '' && userId === 0) {
      setIsTitleError(true);
      setIsUserError(true);

      return;
    }

    if (title.trim() === '') {
      setIsTitleError(true);

      return;
    }

    if (userId === 0) {
      setIsUserError(true);

      return;
    }

    addTodo();
    resetForm();
  };

  const removeTodo = (todoId:number) => {
    addTodoList(
      todoList.filter(
        todo => todo.id !== todoId,
      ),
    );
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <form
        className="App__form"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="title"
          className="App__lable"
        >
          Title:
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
          />
          {isTitleError && (
            <span className="App__span">Please enter the title</span>
          )}
        </label>
        <label
          htmlFor="userId"
          className="App__lable"
        >
          <select
            name="userId"
            id="userId"
            value={userId}
            onChange={handleChange}
          >
            <option value={0}>Set User Id</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {isUserError && (
            <span className="App__span">Select a user</span>
          )}
        </label>
        <label
          htmlFor="completed"
          className="App__lable"
        >
          Completed
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={completed}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className="App__form-submit"
        >
          Create
        </button>
      </form>
      {todoList.length > 0 && (
        <>
          <h1 className="App__todo-title">Todo List</h1>
          <ul className="App__todo-list">
            {todoList.map(todo => (
              <li
                key={todo.id}
                className={
                  todo.completed ? 'completed App__todo-item' : 'App__todo-item'
                }
              >
                <div className="todo__container">
                  <div className="todo__info">
                    <h1 className="todo__title">
                      Title:
                      {todo.title}
                    </h1>
                    <p className={todo.completed
                      ? 'todo__status todo__completed'
                      : 'todo__status todo__in-progress'}
                    >
                      Status:
                      {todo.completed ? 'completed' : 'in progress'}
                    </p>
                    <p className="todo__name">
                      Name:
                      {todo.user?.name}
                    </p>
                    <p className="todo__email">
                      Email:
                      {todo.user?.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="todo__btn-reset"
                    onClick={() => removeTodo(todo.id)}
                  >
                    Remove task
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
