import './App.scss';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo'

import todosFromServer from './api/todos';
import { getUserById } from './service/user';
import { useState } from 'react';


const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}))

const getId = (todos: Todo[]) => {
  const maxId = Math.max(
    ...todos.map(todo => todo.id)
  )

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addPost = (todo: Todo) => { 
    const newTodo = {
      ...todo,
      id: getId(todos)
    }

    setTodos(currrentTodos => [...currrentTodos, newTodo]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addPost} />
      <TodoList todos={todos} />
    </div>
  );
};

