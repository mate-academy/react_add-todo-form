import users from '../../api/users';

type Props = {
    todoUserId: number;
}

export const UserInfo = ({ todoUserId }: Props) => {
    const userOne = users.find(user => user.id === todoUserId);

    if (userOne) {
        return (
           <a href={`mailto:${userOne.email}`}>
            {userOne.name}
            </a>
        )
    }
    return null;
};
