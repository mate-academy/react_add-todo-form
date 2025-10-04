import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getUserById } from './services/user';
import { PostForm } from './PostForm';
import { TodoList } from './components/TodoList';

function getNewTodoId(todos: Todo[]) {
  return todos.length > 0
    ? Math.max(...todos.map(todo => todo.id)) + 1
    : 1;
}

export const App: React.FC = () => {
  const [users] = useState<User[]>(usersFromServer);

  const enrichedTodos: Todo[] = todosFromServer
    .map(todo => {
      const user = getUserById(todo.userId, users);
      if (!user) return null;
      return { ...todo, user };
    })
    .filter((todo): todo is Todo => todo !== null);

  const [todos, setTodos] = useState<Todo[]>(enrichedTodos);

  const handleAddTodo = ({
    title,
    userId,
  }: {
    title: string;
    userId: number;
  }) => {
    const user = getUserById(userId, users);
    if (!user) {
      alert('User not found');
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title: title.trim(),
      userId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <PostForm onSubmit={handleAddTodo} users={users} />
      <TodoList todos={todos} />
    </div>
  );
};
