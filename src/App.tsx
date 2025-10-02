import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() =>
    todosFromServer.map(todo => {
      const user = usersFromServer.find(
        userItem => userItem.id === todo.userId,
      )!;

      return { ...todo, user };
    }),
  );

  const addTodo = (title: string, userId: number) => {
    const userItem = usersFromServer.find(item => item.id === userId);

    if (!userItem) {
      return;
    }

    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const newTodo: Todo = {
      id: newId,
      title,
      completed: false,
      userId,
      user: userItem,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoList users={usersFromServer} todos={todos} onAddTodo={addTodo} />
    </div>
  );
};
