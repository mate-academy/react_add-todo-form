import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

import './App.scss';

const users: User[] = [...usersFromServer];

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

type IndexedUsers = {
  [index: number]: User;
};

const indexedUsers = users.reduce((
  total: IndexedUsers, current: User,
): IndexedUsers => {
  // eslint-disable-next-line no-param-reassign
  total[current.id] = { ...current };

  return total;
}, {});

export const App = () => {
  const [todosToRender, setTodosToRender] = useState(todos);

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    const lastTodoIndex = todosToRender.reduce((maxI, curI) => {
      return curI.id > maxI ? curI.id : maxI;
    }, 0);

    const user = indexedUsers[todo.userId];

    setTodosToRender(currentList => [...currentList, {
      ...todo,
      id: lastTodoIndex + 1,
      user,
    }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo
        users={users}
        onAdd={addTodo}
      />

      <TodoList
        todos={todosToRender}
      />
    </div>
  );
};
