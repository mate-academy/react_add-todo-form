/// <reference types="react-scripts" />

interface Todo {
  user: User | null
  userId: number;
  id: string;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  username?: string;
  email:string;
  adress?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  }
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}
