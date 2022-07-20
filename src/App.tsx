import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map(todo => {
  const matchedUser = usersFromServer
    .find(user => user.id === todo.userId) || null;

  return { ...todo, user: matchedUser };
});

export const App = () => {
  const [tasks, setTasks] = useState(preparedTodos);
  const [taskTitle, setTaskTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [assignedUserId, setAssignedUserId] = useState(0);
  const [hasUserError, setUserError] = useState(false);

  function addNewTask(event: React.FormEvent) {
    event.preventDefault();

    const newTaskId = tasks
      .sort((taskA, taskB) => taskA.id - taskB.id)[tasks.length - 1].id + 1;

    const newTask: PrepearedTodo = {
      id: newTaskId,
      title: taskTitle,
      completed: false,
      userId: assignedUserId,
      user: usersFromServer.find(user => user.id === assignedUserId) || null,
    };

    setTitleError(!taskTitle);
    setUserError(!assignedUserId);

    if (!taskTitle || !assignedUserId) {
      return;
    }

    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setAssignedUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addNewTask}
      >
        <div className="field">
          <input
            data-cy="titleInput"
            onChange={(event) => {
              setTitleError(false);
              setTaskTitle(event.target.value);
            }}
            value={taskTitle}
            type="text"
            placeholder="Enter a title"
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={event => {
              setAssignedUserId(+event.target.value);
              setUserError(false);
            }}
            value={assignedUserId}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.username}</option>
            ))}
          </select>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={tasks} />
      </section>
    </div>
  );
};
