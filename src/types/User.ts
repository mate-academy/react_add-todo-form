import { Company } from './Company';

export interface User extends Company {
  id: number;
  name: string;
  username: string;
  email: string;
}
