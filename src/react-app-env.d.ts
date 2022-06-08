/// <reference types="react-scripts" />
export interface TodoType {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: UsersType | null,
}

export interface UsersType {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Address,
  phone: string,
  website: string,
  company: Company,
}

type Address = {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geo,
};

type Geo = {
  lat: string,
  lng: string,
};

type Company = {
  name: string,
  catchPhrase: string,
  bs: string
};
