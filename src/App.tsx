import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';
import { getUserById } from './services/user';
import { EnrichedTodo } from './types/EnrichedTodo';
import { useState } from 'react';


export const userTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todo: EnrichedTodo[]) {
  const maxId = Math.max(...todo.map(todo => todo.id))

  return maxId + 1;
}


export const App = () => {
  const [todos, setTodos] = useState<EnrichedTodo[]>(userTodos)

  const addTodo = ( todo: EnrichedTodo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(prevTodo => [...prevTodo, newTodo])
    console.log(newTodo)
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
