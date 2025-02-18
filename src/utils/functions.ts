import { FormErrors, FormValues } from '../models/Form';
import { User } from '../models/User';

export const getUserById = (userId: number, users: User[]): User | undefined =>
  users.find(user => user.id === userId) as User;

export const validate = ({ title, userId }: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!title) {
    errors.title = 'Please enter a title';
  } else if (!/^[a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ0-9 ]*$/.test(title)) {
    errors.title = 'Please enter only letters (ua and en), digits, and spaces';
  }

  if (userId === 0) {
    errors.userId = 'Please choose a user';
  }

  return errors;
};
