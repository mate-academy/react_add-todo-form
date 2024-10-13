import React, { useState } from 'react';
import { SelectOption } from '../SelectOption/SelectOption';
import { TextField } from '../TextField/TextField';
import { addNewTodo } from '../../utils/addNewTodo';
import { Todo } from '../../types/Todo';

interface Props {
  // eslint-disable-next-line prettier/prettier
  todos: Todo[];
  onTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const NewTodo: React.FC<Props> = ({ todos, onTodos }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const hasErrorTextField = !title.trim().length && submitted;
  const hasErrorSelectOption = !selectedUserId && submitted;

  function resetForm() {
    setSelectedUserId(0);
    setTitle('');
    setCount(currentCount => currentCount + 1);
    setSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedUserId || !title.trim().length) {
      setSubmitted(true);

      return;
    }

    addNewTodo(todos, onTodos, title, selectedUserId);

    resetForm();
  }

  return (
    <form key={count} action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <TextField
        title={title}
        name="title"
        label="Title:&nbsp;"
        placeholder="Enter a title"
        hasError={hasErrorTextField}
        onChange={setTitle}
      />

      <SelectOption
        name="select"
        label="User:&nbsp;"
        placeholder="Choose a user"
        hasError={hasErrorSelectOption}
        onSelectedUserId={setSelectedUserId}
      />

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
