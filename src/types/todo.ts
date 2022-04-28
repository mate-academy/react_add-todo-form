export interface Todo {
  id?: number,
  title: string,
  completed: boolean,
  user: User | null,
}

interface User {
  id?: number,
  name: string,
  email: string,
  phone: string,
  website: string,
}

// interface User {
//   id: number,
//   name: string,
//   username: string,
//   email: string,
//   address: {
//     street: string,
//     suite: string,
//     city: string,
//     zipcode: string,
//     geo: {
//       lat: string,
//       lng: string,
//     },
//   },
//   phone: string,
//   website: string,
//   company: {
//     name: string,
//     catchPhrase: string,
//     bs: string,
//   },
// }
