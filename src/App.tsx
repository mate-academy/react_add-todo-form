import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Form } from './components/Form/Form';
import { getUserById } from './HelpFunction/getUserById';

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App:React.FC = () => {
  const [newTodos, setNewTodos] = useState(todos);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form
        newTodos={newTodos}
        setNewTodos={setNewTodos}
      />

      <section className="TodoList">
        <TodoList
          todos={newTodos}
        />
      </section>
    </div>
  );
};
