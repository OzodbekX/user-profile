import React, {useEffect, useState} from 'react';
import {useQuery} from "react-query";
import axios from 'axios';
import  ViewUser  from '../ViewUser';
import  EditForm  from '../EditForm';
import "./index.scss"

export type TUserData={
    firstName: string,
    lastName: string,
    email: string,
    note: string
}
const UserProfile = () => {
    const [userData, setUserData] = useState<TUserData>()
    const [isEditing, setIsEditing] = useState(false)
    //gets data from backend
    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>  axios.get('api/getData')
    })

    useEffect(()=>{
        if(data){
            setUserData(data?.data)
        }
            },[data])
    //to apply smooth transition in css I added new class by function.
    const cardClassName = (base_class: string) => {
        if (isEditing) {
            return base_class + " edit-page"
        }
        return base_class
    }


    return (
        <div className="wrapper">
           <ViewUser cardClassName={cardClassName} isEditing={isEditing} setIsEditing={setIsEditing} userData={userData}/>
           <EditForm cardClassName={cardClassName} setIsEditing={setIsEditing} userData={userData} setUserData={setUserData}/>
        </div>
    );
};

export default UserProfile;