/// <reference types="react-scripts" />

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface Adress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geo,
}
interface Geo {
  lat: string,
  lng: string,
}
interface Company {
  name: string,
  catchPhrase: string,
  bs: string,
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Adress;
  phone: string;
  website: string;
  company: Company;
}
export interface FullTodo extends Todo{
  user: User | null,
}
