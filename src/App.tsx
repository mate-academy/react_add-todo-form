import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoAggregated } from './types/Todo';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';
import { useState } from 'react';

const todos: TodoAggregated[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(item => item.id === todo.userId) ?? null;

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todoList, setTodoList] = useState<TodoAggregated[]>(todos);

  function handleAddTodo(title: string, userId: number) {
    const maxId = Math.max(...todoList.map(item => item.id));

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user: usersFromServer.find(item => item.id === userId) ?? null,
    };

    setTodoList(prev => [...prev, newTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={handleAddTodo} userList={usersFromServer} />

      <TodoList todos={todoList} />
    </div>
  );
};
