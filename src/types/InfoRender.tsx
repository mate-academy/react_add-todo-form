//.. тип для рендеру на сторінці

export interface InfoRender {
  id: number;
  title: string;
  completed: boolean;
  user: {
    name: string;
    email: string;
  };
}
