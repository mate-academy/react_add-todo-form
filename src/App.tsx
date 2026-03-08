import './App.scss';
import { TodoList } from './components/TodoList';
import { initialTodos } from './services/initialTodos.services';
import { PostForm } from './components/PostForm';
import { useState } from 'react';
import { Todos } from './types/todos';
import { getUser } from './services/user.service';
import usersFromServer from './api/users';

function getNewTodoId(todos: Todos[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>(initialTodos);

  const addTodo = ({ title, userId }: { title: string; userId: number }) => {
    const newTodo: Todos = {
      id: getNewTodoId(todos),
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <PostForm users={usersFromServer} onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
