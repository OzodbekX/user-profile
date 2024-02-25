import React, {Dispatch, FC, SetStateAction} from "react";
import {TUserData} from "../UserProfile";


const ViewUser: FC<TProps> = ({userData, isEditing, cardClassName, setIsEditing}) => {

    return <div className={cardClassName("card front-face ")}>
        <div>
            <div className='user-info'>
                {userData?.firstName} {userData?.lastName}
                <div>{userData?.email}</div>
                <p>
                    {userData?.note}
                </p>
                <button onClick={() => setIsEditing(true)} className="button-30"
                        role="button">{isEditing ? "submit" : "Edit"}</button>
            </div>
            <img
                src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/>

        </div>
    </div>
}

type TProps = {
    cardClassName: (s: string) => string,
    userData?: TUserData,
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    isEditing: boolean
}
export default ViewUser
