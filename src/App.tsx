import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoUser } from './types/TodoUser';

function assignData(users: User[], todos: Todo[]): TodoUser[] {
  const newData: TodoUser[] = [];

  users.forEach(user => {
    todos.forEach(todo => {
      if (user.id === todo.userId) {
        newData.push(Object.assign({ ...todo }, { user: user }));
      }
    });
  });

  return newData;
}

const list = assignData(usersFromServer, todosFromServer);

export const App = () => {
  const [todoList, setTodoList] = useState(list);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo users={usersFromServer} todos={todoList} onAdd={setTodoList} />

      <TodoList todos={todoList} />
    </div>
  );
};
