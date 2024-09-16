import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './Types/Todo';
import { User } from './Types/User';
import { NewPost } from './components/AddPost';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) as User;
}

export const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewPost onAdd={addTodo} users={usersFromServer} todos={todos} />

      <TodoList todos={todos} />
    </div>
  );
};
