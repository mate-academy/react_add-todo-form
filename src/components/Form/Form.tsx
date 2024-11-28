import React, { useState } from 'react';
import { Todo } from '../../types/Todos';
import { DefaultErrorsState, User } from '../../types';
import { TextField } from '../TextField/TextField';
import { getRandomDigits } from '../../utils';
import { SelectUser } from '../SelectUser';
import todos from '../../api/todos';

type Props = {
  users: User[];
  addTodo: (newTodo: Todo) => void;
};

type DefaultState = {
  titleInput: string;
  userSelect: string;
};

const defaultState: DefaultState = {
  titleInput: '',
  userSelect: '0',
};

const defaultErrorState: DefaultErrorsState = {
  titleInput: '',
  userSelect: '',
};

const inputId = `${getRandomDigits()}`;

export const Form: React.FC<Props> = ({ users, addTodo }) => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState(defaultState);
  const [errors, setErrors] = useState(defaultErrorState);

  const maxTodoId = () =>
    todos.reduce((acc, curr) => Math.max(acc, curr.id), 0);

  const [todoId, setTodoId] = useState<number>(maxTodoId);

  const validationForm = () => {
    const newError: DefaultErrorsState = { ...defaultErrorState };

    if (!state.titleInput.trim()) {
      newError.titleInput = 'Please enter a title';
    }

    if (state.userSelect === '0') {
      newError.userSelect = 'Please choose a user';
    }

    setErrors(newError);

    return !Object.values(newError).some(value => value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validationForm()) {
      const newTodoId = todoId + 1;

      addTodo({
        id: newTodoId,
        title: state.titleInput,
        completed: false,
        userId: +state.userSelect,
      });

      setTodoId(newTodoId);
      setState(defaultState);
      setCount(currentValue => currentValue + 1);
    }
  };

  const handleChangeByField = (field: keyof DefaultState) => {
    return (value: string) => {
      setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
      setState(prevState => {
        return { ...prevState, [field]: value };
      });
    };
  };

  return (
    <form
      action="/api/todos"
      key={count}
      onSubmit={handleFormSubmit}
      method="POST"
    >
      <TextField
        inputId={inputId}
        name="titleInput"
        placeholder=""
        label="Title: "
        value={state.titleInput}
        onChange={handleChangeByField('titleInput')}
        errors={errors}
      />

      <SelectUser
        selectId={inputId}
        name="userSelect"
        label="Users: "
        value={state.userSelect}
        onChange={handleChangeByField('userSelect')}
        users={users}
        errors={errors}
      />

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
