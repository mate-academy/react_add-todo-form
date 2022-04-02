import {
  FC, memo, useCallback, useState,
} from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  onSubmit: (todo: Todo) => void;
}

export const TodoForm: FC<Props> = memo(({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleInputChange = useCallback((value) => {
    setTitle(value);
  }, []);

  return (
    <div className="TodoForm">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({
            user: null,
            userId: Infinity,
            todoId: Infinity,
            completed: false,
            title,
          });
        }}
      >
        <input
          value={title}
          onChange={({ target }) => {
            handleInputChange(target.value);
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
});
