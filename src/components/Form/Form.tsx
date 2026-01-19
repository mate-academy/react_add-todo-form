import { Button } from '../Button';
import { Input } from './Input';
import React, { useState } from 'react';
import { Select } from './Select';
import { Users } from '../../types/Users';
import { Todo } from '../../types/Todo';

type Props = {
  usersForSelect: Users;
  todoId: number;
  addTodo: (todoForUser: Todo) => void;
};

export const Form: React.FC<Props> = ({ usersForSelect, addTodo, todoId }) => {
  const [title, setTitle] = useState('');
  const [select, setSelect] = useState('0');
  const [errorInput, setErrorInput] = useState('');
  const [errorSelect, setErrorSelct] = useState('');

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorInput('');
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value);
    setErrorSelct('');
  };

  const onAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorInput(!title ? 'Please enter a title' : '');
    setErrorSelct(select === '0' ? 'Please choose a user' : '');

    if (!title || select === '0') {
      return;
    }

    const user = usersForSelect.find(selectUser => selectUser.name === select)!;

    const newTodo = {
      id: todoId + 1,
      title,
      completed: false,
      userId: user.id,
      user,
    };

    addTodo(newTodo);
    setTitle('');
    setSelect('0');
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={onAdd}>
      <Input
        handleChangeTitle={handleChangeTitle}
        errorInput={errorInput}
        value={title}
      />

      <Select
        users={usersForSelect}
        handleChangeSelect={handleChangeSelect}
        errorMessage={errorSelect}
        value={select}
      />

      <Button type="submit" content="Add" />
    </form>
  );
};
