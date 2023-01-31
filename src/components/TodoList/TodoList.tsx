import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import debounce from 'lodash/debounce';
import { TodoInfo } from '../TodoInfo';
import { TodoForm } from '../TodoForm';
import { TodosContext } from '../TodosProvider';

export const TodoList: React.FC = React.memo(() => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const { todos, addTodo } = useContext(TodosContext);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => (
      todo.title.toLowerCase().includes(appliedQuery.toLowerCase())
    ));
  }, [todos, appliedQuery]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          applyQuery(event.target.value);
        }}
      />

      <TodoForm addNewTodo={addTodo} />

      <section className="TodoList">
        {visibleTodos.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))}
      </section>
    </>
  );
});
