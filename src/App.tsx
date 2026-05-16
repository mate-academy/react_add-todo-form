import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoAggregated } from './types/Todo';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { NewTodo } from './components/NewTodo/NewTodo';

const todos: TodoAggregated[] = todosFromServer.map(todo => {
  const user =
    usersFromServer.find(currentUser => currentUser.id === todo.userId) ?? null;

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todoList, setTodoList] = useState<TodoAggregated[]>(todos);

  function handleAddTodo(title: string, userId: number) {
    const maxId = Math.max(...todoList.map(todo => todo.id));

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      user:
        usersFromServer.find(currentUser => currentUser.id === userId) ?? null,
    };

    setTodoList(prev => [...prev, newTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={handleAddTodo} users={usersFromServer} />

      <TodoList todos={todoList} />
    </div>
  );
};
