import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todosTypes';
import React from 'react';
import todos from './api/todos';
import { User } from './types/userTypes';
import users from './api/users';
import { NewTodoForm } from './components/AddTodoForm/AddTodoForm';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App = () => {
  const initialTodos = todos.map(to => ({
    ...to,
    user: users.find(u => u.id === to.userId) || null,
  }));

  const [todoList, setTodoList] = React.useState<Todo[]>(initialTodos);
  const [userList] = React.useState<User[]>(users);

  if (!todoList) {
    return null;
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodoForm
        todoList={todoList}
        setTodoList={setTodoList}
        users={userList}
      />

      <TodoList todos={todoList} />
    </div>
  );
};
