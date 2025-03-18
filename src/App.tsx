import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import React, { useState } from 'react';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | null;
}

type NewTodoProps = {
  onAdd: (todo: Todo) => void;
  todoList: Todo[];
};

function getUserById(userId: number): User | null {
  return usersFromServer.find((user: User) => user.id === userId) || null;
}

export const initialTodos: Todo[] = todosFromServer.map((todo: Todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  if (todos.length === 0) {
    return 1;
  }

  return Math.max(0, ...todos.map(todo => todo.id)) + 1;
}

const TodoForm: React.FC<NewTodoProps> = ({ onAdd, todoList }) => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [isUserSelected, setIsUserSelected] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!isUserSelected);

    if (!title || !isUserSelected) {
      return;
    }

    const newId = getNewTodoId(todoList);
    const newTodo: Todo = {
      id: newId,
      title,
      completed: false,
      userId: selectedUser,
      user: getUserById(selectedUser),
    };

    onAdd(newTodo);
    setTitle('');
    setIsUserSelected(false);
    setSelectedUser(0);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setIsUserSelected(true);
    setHasUserError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <span>Title: </span>
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setHasTitleError(false);
          }}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <span>User: </span>
        <select
          data-cy="userSelect"
          value={selectedUser}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>(initialTodos);

  const handleAddTodo = (newTodo: Todo) => {
    setTodoList(prevTodos => {
      return [...prevTodos, newTodo];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onAdd={handleAddTodo} todoList={todoList} />
      <TodoList todos={todoList} />
    </div>
  );
};
