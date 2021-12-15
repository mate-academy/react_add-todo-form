/// <reference types="react-scripts" />

interface Todo {
  userId: number;
  id: any;
  title: string;
  completed: boolean;
  user?: User | null;
}

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
    },
  },
}
