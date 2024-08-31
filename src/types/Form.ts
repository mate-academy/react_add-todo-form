export type Form = {
  title: string;
  userId: number;
};

export enum FormFields {
  TITLE = 'title',
  USER_ID = 'userId',
}

export type FormError = Partial<Record<keyof Form, string>>;
