import React, { useState } from 'react';
import { SelectOption } from '../SelectOption/SelectOption';
import { TextField } from '../TextField/TextField';

interface Props {
  onChangeTodo: (title: string, userId: number, completed?: boolean) => void;
}

export const NewTodo: React.FC<Props> = ({ onChangeTodo }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [submited, setSubmited] = useState<boolean>(false);

  const hasErrorTextField = title.trim() === '' && submited;
  const hasErrorSelectOption = selectedUser === 0 && submited;

  function resetForm() {
    setSelectedUser(0);
    setTitle('');
    setCount(cur => cur + 1);
    setSubmited(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedUser === 0 || title.trim() === '') {
      setSubmited(true);

      return;
    }

    onChangeTodo(title, selectedUser);

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
        onSelectedUser={setSelectedUser}
      />

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
