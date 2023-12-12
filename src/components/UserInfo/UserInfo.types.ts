export interface UserProps {
  user: User | undefined
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}
