import { useCallback, useState } from 'react';
import todosFromServer from './api/todos';
import './App.scss';

import { PreparedTodo, Todo } from './types/Todo';
import { getUserById } from './utils';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

const prepareTodos = (todos: Todo[]): PreparedTodo[] => {
  return todos.map(todo => {
    return {
      ...todo,
      user: getUserById(todo.userId),
    };
  }) as PreparedTodo[];
};

export const App = () => {
  const [todos, setTodos] = useState(
    prepareTodos(todosFromServer),
  );

  const addTodo = useCallback((newTodo: PreparedTodo) => {
    setTodos(prevState => {
      return [
        ...prevState,
        newTodo,
      ];
    });
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        todos={todos}
        createNewTodo={addTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
