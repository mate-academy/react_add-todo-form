import { FormSubmitProps } from '../types/FormSubmitProps';

export const formSubmit = ({
  event,
  formState,
  setFormState,
  setTouchedState,
  currentTodos,
  setCurrentTodos,
}: FormSubmitProps) => {
  event.preventDefault();
  let errorFlag = false;

  if (formState.userValue === 0) {
    setTouchedState(prevState => ({
      ...prevState,
      userValue: true,
    }));

    errorFlag = true;
  }

  if (!formState.title || formState.title.trim().length === 0) {
    setTouchedState(prevState => ({
      ...prevState,
      title: true,
    }));

    errorFlag = true;
  }

  if (errorFlag) {
    return;
  }

  const newTodo = {
    id: Math.max(...currentTodos.map(todo => todo.id)) + 1,
    title: formState.title,
    completed: false,
    userId: formState.userValue,
  };

  setFormState({ title: '', userValue: 0 });
  setTouchedState({ title: false, userValue: false });
  errorFlag = false;

  setCurrentTodos([...currentTodos, newTodo]);
};
