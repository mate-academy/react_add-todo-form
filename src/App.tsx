/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './App.css';
import TodoList from './TodoList';

import users from './api/users';
import todos from './api/todos';

const App: React.FC = () => {
  const [todo, setTodo] = useState('');
  const [person, setPerson] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [nextUserId, setNextUserId] = useState(0);
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidPerson, setIsValidPerson] = useState(false);

  // Methods which handle input and select events
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    if (event.target.name === 'todo') {
      setTodo(event.target.value);
    } else {
      setPerson(event.target.value);
    }
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    const nextUser = users.find(user => user.name === event.target.value);

    if (!nextUser) {
      return;
    }

    setNextUserId(nextUser?.id);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const newTodo = {
      userId: nextUserId,
      id: Date.now(),
      title: todo,
      completed: false,
    };

    if (!person.trim() || !todo.trim()) {
      setIsValidTitle(true);
      setIsValidPerson(true);
    } else {
      setTodoList([...todoList, newTodo]);
      setTodo('');
      setPerson('');
      setIsValidTitle(false);
      setIsValidPerson(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <p>
          Todos:
          {' '}
          {todoList.length === 0
            ? TodoList.length + 1
            : todoList.length + TodoList.length + 1}
        </p>
      </header>

      <form
        className="Form-todo"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >

        <div className="Form-todo__title">
          <label htmlFor="title">
            Title:
            {' '}
          </label>
          <input
            type="text"
            name="todo"
            id="title"
            value={todo}
            placeholder="Todo title"
            onChange={handleChange}
          />

          {(isValidTitle && !todo) && (
            <span className="warning">Please enter the title</span>
          )}
        </div>

        <div className="Form-todo__person">
          <select
            name="user"
            value={person}
            onChange={(event) => {
              handleChange(event);
              handleSelect(event);
            }}
          >
            <option>
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {(isValidPerson && !person) && (
            <span className="warning">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          className="Form-todo__add"
        >
          Add
        </button>

      </form>

      <TodoList todos={
        todoList.length === 0
          ? todos
          : todos.concat(todoList)
      }
      />

    </div>
  );
};

export default App;
