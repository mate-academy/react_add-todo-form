import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { getUserById } from './service/user';
import { NewTodo } from './components/NewTodo/NewTodo';
import { useState } from 'react';
import { Todo } from './types/Todo';

function setNewPostId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const initialTodos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todos, setTodo] = useState<Todo[]>(initialTodos);
  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: setNewPostId(todos),
      ...data,
    };

    setTodo(currectTodos => [...currectTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
