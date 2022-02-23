/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  }
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoWithUser extends Todo {
  user: User | null;
}
