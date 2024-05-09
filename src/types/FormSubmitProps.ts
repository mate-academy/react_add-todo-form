import { FormDataFields } from '../types/FormDataFields';
import { TouchedDataValues } from '../types/TouchedDataValues';
import { Todo } from './Todo';

export interface FormSubmitProps {
  event: React.FormEvent<HTMLFormElement>;
  formState: FormDataFields;
  setFormState: React.Dispatch<React.SetStateAction<FormDataFields>>;
  setTouchedState: React.Dispatch<React.SetStateAction<TouchedDataValues>>;
  currentTodos: Todo[];
  setCurrentTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
