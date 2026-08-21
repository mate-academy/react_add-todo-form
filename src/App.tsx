import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import { useState } from 'react';
import { FormTodo } from './components/FormTodo';
import { getNewTodoId } from './services/idTodo';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId)!,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <section className="TodoList">
        <FormTodo onSubmit={addTodo} />
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
