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
    const [isEditting, setIsEditting] = useState(false)

    const { isLoading, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>  axios.get('api/getData')
    })

    useEffect(()=>{
        if(data){
            setUserData(data?.data)
        }
            },[data])


    const cardClassName = (base_class: string) => {
        if (isEditting) {
            return base_class + " edit-page"
        }
        return base_class
    }


    return (
        <div className="wrapper">
           <ViewUser cardClassName={cardClassName} isEditting={isEditting} setIsEditting={setIsEditting} userData={userData}/>
           <EditForm cardClassName={cardClassName} isEditting={isEditting} setIsEditting={setIsEditting} userData={userData} setUserData={setUserData}/>
        </div>
    );
};

export default UserProfile;