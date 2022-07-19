import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

let todoWithUser = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId)?.name || null,
}));

todoWithUser.sort((todo1, todo2) => todo1.id - todo2.id);

const firstMaxId = todos.sort((todo1, todo2) => todo2.id - todo1.id)[0].id;

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userForTodo, setUserForTodo] = useState('');
  const [id, setId] = useState(firstMaxId + 1);
  const [isInputEntered, setIsInputEntered] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(true);

  const noInputMessage = 'Please enter the title';
  const noUserMessage = 'Please choose a user';

  const createACard = () => {
    const newCard = {
      [id - 1]: {
        id,
        title: title.replace(/[^a-z\d а-я]/ig, ''),
        completed: false,
        user: userForTodo,
      },
    };

    todoWithUser = Object.assign(todoWithUser, newCard);

    setId(state => state + 1);
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserForTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let cardWillBeCreated = true;

    if (!title || !title.replace(/[^a-z\d а-я]/ig, '').trim()) {
      setIsInputEntered(false);
      cardWillBeCreated = false;
    } else {
      setIsInputEntered(true);
    }

    if (!userForTodo) {
      setIsUserSelected(false);
      cardWillBeCreated = false;
    } else {
      setIsUserSelected(true);
    }

    if (cardWillBeCreated) {
      createACard();
    }
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          id="newTodo"
          name="newTodo"
          value={title}
          placeholder="New todo"
          onChange={inputChange}
          data-cy="titleInput"
        />
        <span className="message">{!isInputEntered && (noInputMessage)}</span>

        <div className="select">
          <select
            className="select__element"
            name="users"
            onChange={selectChange}
            data-cy="userSelect"
          >
            <option
              value=""
              disabled
              selected
            >
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.name}>{user.name}</option>
            ))}
          </select>
        </div>

        <span className="message">{!isUserSelected && (noUserMessage)}</span>
        <button className="button" type="submit">Add a new todo</button>
      </form>

      <TodoList todoWithUser={todoWithUser} />
    </div>
  );
};
