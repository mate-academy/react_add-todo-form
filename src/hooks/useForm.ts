import { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from '../types/Todo.model';
import usersFromServer from '../api/users';

interface Props {
  id: number;
  onFormSubmit: (todo: Todo) => void;
}

export const useForm = ({ id, onFormSubmit }: Props) => {
  const initialValue = {
    id: id + 1,
    title: '',
    completed: false,
    userId: 0,
  };

  const [formValues, setFormValues] = useState<Todo>(initialValue);
  const [formErrors, setFormErrors] = useState<{
    [key in keyof Todo]?: string;
  }>({});

  const onValidate = () => {
    let isValid = true;
    let errors = {};
    let key: keyof typeof formValues;

    for (key in formValues) {
      const value = formValues[key];

      if (key === 'title') {
        if (!String(value).trim()) {
          errors = { ...errors, [key]: 'Please enter a title' };
          isValid = false;
        }

        continue;
      }

      if (key === 'userId') {
        if (!value) {
          errors = { ...errors, [key]: 'Please choose a user' };
          isValid = false;
        }
      }
    }

    setFormErrors(errors);

    return isValid;
  };

  const reset = () => {
    setFormValues(initialValue);
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    let newValue: string | number = value;

    if (name === 'userId') {
      newValue = +newValue;
    }

    if (name === 'title' && typeof newValue === 'string') {
      newValue = newValue.replace(/[^0-9a-zA-Zа-яА-Я\s]/g, '');
    }

    setFormErrors(prev => ({ ...prev, [name]: '' }));
    setFormValues(prev => ({ ...prev, [name]: newValue }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const isValid = onValidate();

    if (!isValid) {
      return;
    }

    const preparedFormValues = {
      ...formValues,
      user: usersFromServer.find(user => user.id === formValues.userId),
    };

    onFormSubmit(preparedFormValues);
    reset();
  };

  return { formErrors, formValues, onChange, onSubmit };
};
