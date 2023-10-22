import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form/Form';
import { Todos } from './types/Todos';
import { getUserById } from './functions/user';

const initialToDo: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

function getNewPostId(todo: Todos[]) {
  const maxId = Math.max(...todo.map(t => t.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodo] = useState<Todos[]>(initialToDo);

  const addToDo = ({ id, ...data }: Todos) => {
    const newTodo = {
      id: getNewPostId(todos),
      ...data,
    };

    setTodo(currentToDo => [...currentToDo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form
        onSubmit={addToDo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
