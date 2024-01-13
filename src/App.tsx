import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './services/userFind';
import { Todo } from './types/todo';
import todosFromServer from './api/todos';

export const App = () => {
  const todosIncludesUser = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todoItems, setTodoItems] = useState(todosIncludesUser);

  function getMaxId(todos: Todo[]) {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  }

  const addPost = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getMaxId(todoItems),
      ...data,
    };

    setTodoItems(current => [...current, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm addPost={addPost} />
      <TodoList todos={todoItems} />
    </div>
  );
};
