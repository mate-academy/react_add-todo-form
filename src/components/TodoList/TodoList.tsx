interface Users {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

type Props = {
  users: Users[],
};

export const TodoList: React.FC<Props> = ({ users }) => {
  <section className="TodoList">
    <article data-id="1" className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">
        delectus aut autem
      </h2>

      <a className="UserInfo" href="mailto:Sincere@april.biz">
        Leanne Graham
      </a>
    </article>

    <article data-id="15" className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">delectus aut autem</h2>

      <a className="UserInfo" href="mailto:Sincere@april.biz">
        Leanne Graham
      </a>
    </article>

    <article data-id="2" className="TodoInfo">
      <h2 className="TodoInfo__title">
        quis ut nam facilis et officia qui
      </h2>

      <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
        Patricia Lebsack
      </a>
    </article>
  </section>
};
