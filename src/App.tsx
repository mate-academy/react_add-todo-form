import './App.scss';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const todos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
  const [todoList, setTodoList] = useState(todos);

  const handleAddTodo = (newTodo: Todo) => {
    setTodoList(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        onAdd={handleAddTodo}
        todos={todoList}
        users={usersFromServer}
      />
      <TodoList todos={todoList} />
    </div>
  );
};
