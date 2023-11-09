import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const theBiggestId = Math.max(...todosFromServer.map(todo => todo.id));

const EMPTY_TODO = {
  id: theBiggestId + 1,
  title: '',
  completed: false,
  userId: 0,
};

export const App = () => {
  const [todoList, setTodoList] = useState(todosFromServer);
  const [newTodo, setNewTodo] = useState(EMPTY_TODO);

  const [isOptionWrong, setIsOptionWrong] = useState(false);
  const [isTitleValueWrong, setIsTitleValueWrong] = useState(false);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isDataWrong = false;

    if (newTodo.userId === 0) {
      isDataWrong = true;
      setIsOptionWrong(true);
    }

    if (newTodo.title.trim() === '') {
      isDataWrong = true;
      setIsTitleValueWrong(true);
    }

    if (isDataWrong) {
      return;
    }

    setTodoList([...todoList, newTodo]);
    EMPTY_TODO.id += 1;
    setNewTodo(EMPTY_TODO);
  };

  const setTitle
  = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const clearValue = value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setNewTodo({ ...newTodo, title: clearValue });
    setIsTitleValueWrong(false);
  };

  const setOption
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setNewTodo({ ...newTodo, userId: +value });
    setIsOptionWrong(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodo.title}
            onChange={setTitle}
          />
          {isTitleValueWrong && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={String(newTodo.userId)}
            onChange={setOption}
          >
            <option value="0" disabled>Choose a user</option>

            { usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {isOptionWrong && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todoList}
      />
    </div>
  );
};
