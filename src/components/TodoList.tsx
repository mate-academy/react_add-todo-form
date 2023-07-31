/* eslint-disable no-console */
import { memo, useContext, useState } from 'react';
import { TodoCard } from './TodoCard';
import { TodosContext } from './TodoContext';

export const TodoList = memo(() => {
  const [query, setQuery] = useState('');
  const todos = useContext(TodosContext);

  const visibleTodos = todos.filter(
    todo => todo.title.toLowerCase().includes(query),
  );

  return (
    <div className="TodoList">
      <input
        type="search"
        placeholder="Find a todo"
        onChange={e => setQuery(e.target.value.toLowerCase())}
      />

      {visibleTodos.map(todo => (
        <TodoCard todo={todo} key={todo.id} />
      ))}
    </div>
  );
});
