export interface TodoProps {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: UsetProps | undefined
}

export interface UsetProps {
  id: number,
  name: string,
  username: string,
  email: string,
}
