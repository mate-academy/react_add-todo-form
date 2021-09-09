type Props = {
  title: string;
  status: boolean;
};

export const TodoInfo: React.FC<Props> = ({ title, status }) => (
  <>
    <td className="tbody__column">{title}</td>
    <td className="tbody__column">{status ? 'Done' : 'In progress'}</td>
  </>
);
