import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './type/Todo';
import { NewTodo, TodoCreateData } from './components/NewTodo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const handleAddTodo = (data: TodoCreateData) => {
    const todo = {
      user: getUserById(data.userId),
      id: Math.max(...todos.map(item => item.id)) + 1,
      title: data.title,
      completed: false,
      userId: data.userId,
    };

    setTodos([...todos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo onAdd={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
