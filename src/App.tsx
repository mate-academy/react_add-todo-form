import { FormEventHandler, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('asdasd');
  const [newTaskUserId, setNewTaskUserId] = useState(1);
  // const [todoList, setTodoList] = useState<Todo[]>(todos);

  const todos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const addNewTask: FormEventHandler = (event) => {
    event.preventDefault();
    todosFromServer.push({
      title: newTaskTitle,
      completed: false,
      userId: newTaskUserId,
      id: Math.random(),
    });
    setNewTaskTitle('');
    setNewTaskUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addNewTask}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            name="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTaskTitle}
            onChange={event => setNewTaskTitle(event.target.value)}
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            name="userSelect"
            data-cy="userSelect"
            defaultValue={0}
            value={newTaskUserId}
            onChange={event => setNewTaskUserId(Number(event.target.value))}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map((user: User) => {
              return (
                <option value={user.id}>{user.name}</option>
              );
            })}
          </select>

          <span className="error">Please choose a user</span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
