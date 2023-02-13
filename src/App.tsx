import { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  return usersFromServer.find((user) => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState(todos);

  const [newTodo, setNewTodo] = useState({
    title: '',
    userName: '',
    isTitleValid: true,
    isUserNameValid: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const allowedChars
    = '0123456789abcdefghigklmnopqrstuvwxyz абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const { name, value } = e.target;

    if (
      name === 'title'
      && allowedChars.includes(value.slice(-1).toLowerCase())
    ) {
      setNewTodo((todo) => ({
        ...todo,
        [name]: value,
        isTitleValid: true,
      }));
    }

    if (name === 'userName') {
      setNewTodo((todo) => ({
        ...todo,
        [name]: value,
        isUserNameValid: true,
      }));
    }
  };

  const handleAddTodo = () => {
    if (!newTodo.title && !newTodo.userName) {
      setNewTodo((todo) => ({
        ...todo,
        isTitleValid: false,
        isUserNameValid: false,
      }));

      return;
    }

    if (!newTodo.title) {
      setNewTodo((todo) => ({
        ...todo,
        isTitleValid: false,
      }));

      return;
    }

    if (!newTodo.userName) {
      setNewTodo((todo) => ({
        ...todo,
        isUserNameValid: false,
      }));

      return;
    }

    const lastTodoId = Math.max(...todoList.map((todo) => todo.id));

    const todoUser: User | undefined = usersFromServer.find(
      (user) => user.name === newTodo.userName,
    );

    const todoToAdd: Todo = {
      id: lastTodoId + 1,
      title: newTodo.title,
      userId: todoUser?.id,
      completed: false,
      user: todoUser,
    };

    setTodoList((prevTodos) => {
      prevTodos.push(todoToAdd);

      return [...prevTodos];
    });

    setNewTodo({
      title: '',
      userName: '',
      isTitleValid: true,
      isUserNameValid: true,
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="field">
          <label htmlFor="todoTitle">Title: </label>
          <input
            id="todoTitle"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            name="title"
            value={newTodo.title}
            onChange={handleChange}
          />
          {!newTodo.isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todoUser">User: </label>
          <select
            id="todoUser"
            data-cy="userSelect"
            name="userName"
            value={newTodo.userName}
            onChange={handleChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {!newTodo.isUserNameValid && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleAddTodo}>
          Add
        </button>
      </form>

      {todos.length && <TodoList todos={todoList} />}
    </div>
  );
};
