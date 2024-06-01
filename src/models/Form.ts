export enum FormKeys {
  TITLE = 'title',
  USER_ID = 'userId',
}

export const defaultValues = {
  [FormKeys.TITLE]: '',
  [FormKeys.USER_ID]: 0,
};

export type FormValues = typeof defaultValues;

export type FormErrors = Partial<Record<keyof FormValues, string>>;
