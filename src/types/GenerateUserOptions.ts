import { FormDataFields } from './FormDataFields';
import { TouchedDataValues } from './TouchedDataValues';
import { User } from './User';

export interface GenerateUserOptions {
  currentUsers: User[];
  formState: FormDataFields;
  setFormState: React.Dispatch<React.SetStateAction<FormDataFields>>;
  touchedState: TouchedDataValues;
}
