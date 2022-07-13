type Props = {
  userId: number;
  title: string;
  completed: boolean;
};

export const TodoInfo: React.FC<Props> = ({ userId, title, completed }) => (
  <>
    <p>{`User: ${userId}`}</p>
    <p data-cy="title">{`Task: ${title}`}</p>
    <p data-cy="status">{`Status: ${completed === true ? 'Done' : 'Not done'}`}</p>
  </>
);
