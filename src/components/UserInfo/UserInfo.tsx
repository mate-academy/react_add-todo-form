import React from "react";
import users from "../../api/users";
import { user } from "../types";

type Props = {
    user: user
}
export const UserInfo: React.FC <Props> = ({user}) => {
    
    return ( 
        <a className="UserInfo" href={`mailto:${user.email}`}>
            {user.name}
        </a>
    )
};
