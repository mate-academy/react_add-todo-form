import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

import { TodoList } from './components/TodoList';
import { Todo } from './entities';

const getTodos: Todo[] = todosFromServer.map(todo => {
  const todosUser = usersFromServer.find(user => user.id === todo.userId);

  return { user: todosUser, ...todo };
});

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>([...getTodos]);

  const [currentUserId, setCurrentUserId] = useState(0);
  const [textField, setTextField] = useState('');

  const [isTextFieldValid, setIsTextFieldValid] = useState(false);
  const [isUserOptionValid, setIsUserOptionValid] = useState(false);

  const isNotUser = currentUserId === 0;
  const isTextFieldEmpty = textField === '';

  const handleTitlePrepare = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawText = event.target.value.trimStart();

    const allowedCharsPattern =
      // eslint-disable-next-line max-len
      /[^a-zA-Z0-9іІїЇєЄґҐабвгдезжзийклмнопрстуфхцчшщьюяАБВГҐДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЮЯ\s]/g;

    const cleanedText = rawText.replace(allowedCharsPattern, '');

    setTextField(cleanedText);
    setIsTextFieldValid(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isTextFieldEmpty) {
      setIsTextFieldValid(true);
    }

    if (isNotUser) {
      setIsUserOptionValid(true);
    }

    if (isNotUser || isTextFieldEmpty) {
      return;
    }

    const currenIdsArr = todoList.map(todo => todo.id);
    const newId = (currenIdsArr.length ? Math.max(...currenIdsArr) : 0) + 1;
    const currentUser = usersFromServer.find(user => user.id === currentUserId);

    const newTodo: Todo = {
      user: currentUser,
      id: newId,
      title: textField,
      completed: false,
      userId: currentUser?.id ?? 0,
    };

    setTodoList(currentTodos => [...currentTodos, newTodo]);
    setIsTextFieldValid(false);
    setIsUserOptionValid(false);
    setTextField('');
    setCurrentUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={textField}
            onChange={event => handleTitlePrepare(event)}
          />

          {isTextFieldEmpty && isTextFieldValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={currentUserId}
            onChange={event => {
              setCurrentUserId(+event.target.value);
              setIsUserOptionValid(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {isNotUser && isUserOptionValid && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
