import './App.scss';

import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Task } from './types/Task';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const tasksFromServer: Task[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: { ...usersFromServer.find(user => user.id === todo.userId) },
  };
});

export const App = () => {
  const storageItemsCount: number
    = JSON.parse(localStorage.getItem('tasks') || '{}').length;
  const storageSavedTasks: Task[]
    = JSON.parse(localStorage.getItem('tasks') || '{}');

  const [tasks, setTasks] = useState(storageItemsCount > 3
    ? storageSavedTasks
    : tasksFromServer);
  const [titleTask, setTitleTask] = useState('');
  const [taskOwnerName, setTaskOwnerName] = useState('0');
  const [taskOwner, setTaskOwner] = useState<User | {}>({});
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isTaskOwnerEmpty, setIsTaskOwnerEmpty] = useState(false);

  function getNextId(addedTasks: Task[]): number {
    addedTasks.sort((taskOne, taskTwo) => taskTwo.id - taskOne.id);

    return addedTasks[0].id + 1;
  }

  function addNewTask() {
    if (titleTask.length !== 0 && Object.keys(taskOwner).length > 0) {
      setTasks((prevTasks) => {
        return [...prevTasks,
          {
            id: getNextId(tasks),
            title: titleTask,
            completed: false,
            userId: 'id' in taskOwner ? taskOwner.id : 0,
            user: {
              id: 'id' in taskOwner ? taskOwner.id : 0,
              name: 'name' in taskOwner ? taskOwner.name : '',
              username: 'username' in taskOwner ? taskOwner.username : '',
              email: 'email' in taskOwner ? taskOwner.email : '',
            },
          },
        ];
      });
      setTaskOwnerName('0');
      setTitleTask('');
    } else {
      setIsTitleEmpty(titleTask.length === 0);
      setIsTaskOwnerEmpty(Object.keys(taskOwner).length === 0);
    }
  }

  if (tasks.length > 3) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  //localStorage.clear();

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            placeholder="Enter task title"
            data-cy="titleInput"
            value={titleTask}
            onChange={(event) => {
              setTitleTask(event.target.value);
              setIsTitleEmpty(false);
            }}
          />
          {isTitleEmpty && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={taskOwnerName}
            onChange={(event) => {
              setIsTaskOwnerEmpty(false);
              setTaskOwnerName(event.target.value);
              setTaskOwner({
                ...usersFromServer
                  .find(user => user.name === event.target.value),
              });
            }}
          >
            <option value="0" disabled>Select task performer</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>
          {isTaskOwnerEmpty
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={event => {
            addNewTask();
            event.preventDefault();
          }}
        >
          Add
        </button>
      </form>
      <TodoList tasks={tasks} />
    </div>
  );
};
