export type todo = {
    id : number,
    title: string,
    completed: boolean,
    userId: number
    user?: {
        id: number;
        name: string;
        username: string;
        email: string;
      };
};

export type user = {
    id: number,
    name: string,
    username: string,
    email: string
};
