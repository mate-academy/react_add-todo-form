import usersFromServer from './users';

const todosFromServer = [
  {
    id: 1,
    title: 'delectus aut autem',
    userId: 1,
    completed: false,
    user: usersFromServer.find(user => user.id === 1),
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    userId: 2,
    completed: false,
    user: usersFromServer.find(user => user.id === 2),
  },
  {
    id: 3,
    title: 'fugiat veniam minus',
    userId: 3,
    completed: false,
    user: usersFromServer.find(user => user.id === 3),
  },
  {
    id: 4,
    title: 'et porro tempora',
    userId: 4,
    completed: true,
    user: usersFromServer.find(user => user.id === 4),
  },
  {
    id: 5,
    title: 'laboriosam mollitia et enim quasi',
    userId: 5,
    completed: false,
    user: usersFromServer.find(user => user.id === 5),
  },
];

export default todosFromServer;
