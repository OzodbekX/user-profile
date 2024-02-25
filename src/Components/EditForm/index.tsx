import {Dispatch, FC, SetStateAction, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {TUserData} from "../UserProfile";

const EditForm: FC<{
    cardClassName: (s: string) => string,
    userData?: TUserData,
    setUserData: Dispatch<SetStateAction<TUserData | undefined>>,
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    isEditing: boolean
}> = ({userData, setUserData, isEditing, cardClassName, setIsEditing}) => {
    const [errorFields, setErrorFields] = useState<string[]>([])
    const queryClient = useQueryClient();
    const errorClassname = (base_class: string, field: string) => {
        if (errorFields?.includes(field)) {
            return base_class + " error-field"
        }
        return base_class
    }

    const validateFields = (field?: string, value?: string) => {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //validate field one by one
        if (field) {
            if ((field === "firstName" || field === "lastName") && !value) {
                setErrorFields(prev => [...prev, field])
            } else if (field === "email" && value && !value.match(validRegex)) {
                setErrorFields(prev => [...prev, field])
            }
        } else {
            //validates fields on submit
            let result = true
            userData && Object.entries(userData).forEach((i: any) => {
                let key: "firstName" | "lastName" | "email" = i[0] || "firstName"
                let value = i?.[1] || ""
                if ((key === "firstName" || key === "lastName") && !value) {
                    result = false
                    setErrorFields(prev => [...prev, key])
                } else if (key === "email" && null == value.match(validRegex)) {
                    result = false
                    setErrorFields(prev => [...prev, key])
                }
            })
            return result
        }

    }


    const submitUserData = async (postData: TUserData) => {
        //sends user edited data to backend
        try {
            const response = await axios.post('api/userData', postData);
            return response.data;
        } catch (error: any) {
            throw new Error(`Error creating post: ${error.message}`);
        }
    };


    const mutation = useMutation(submitUserData, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('api/userData');
            setUserData(data)
            setIsEditing(!isEditing)
        },
    });

    const onClickEdit = () => {
        let valid = validateFields()
        if (valid) {
            userData && mutation.mutate(userData);
        }
    }

    const handleOnchange = (v: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
        setErrorFields(errorFields?.filter(i => i !== key))
        setUserData(prev => prev && ({...prev, [key]: v.target?.value}))
        validateFields(key, v.target?.value)
    }
    return <div className={cardClassName("card back-face ")}>
        <img
            src="https://images.unsplash.com/photo-1492288991661-058aa541ff43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"/>

        <div className={"edit"}>
            <div id={'edit-form'} className={'edit-form'}>
                <div className={errorClassname("form-item", "firstName")}>
                    <label htmlFor={"firstName"}>
                        Firstname {errorFields?.includes("firstName") && " is required"}:
                    </label>
                    <input value={userData?.firstName} onChange={(e) => handleOnchange(e, "firstName")}
                           type="text" id="firstName"/>
                </div>
                <div className={errorClassname("form-item", "lastName")}>
                    <label htmlFor={"lastName"}>
                        Lastname {errorFields?.includes("lastName") && " is required"}:
                    </label>
                    <input value={userData?.lastName} onChange={(e) => handleOnchange(e, "lastName")}
                           type="text" name="lastName"/>
                </div>
                <div className={errorClassname("form-item", "email")}>
                    <label className={"email"}>
                        Email {errorFields?.includes("email") && " is not valid"}:
                    </label>
                    <input value={userData?.email} onError={() => {
                    }} onChange={(e) => handleOnchange(e, "email")} type="email" name="email"/>
                </div>
                <div className={errorClassname("form-item", "note")}>
                    <label htmlFor={"note"}>
                        Essay:
                    </label>
                    <textarea value={userData?.note} onChange={(e) => handleOnchange(e, "note")} name="note"/>

                </div>
            </div>
            <button onClick={onClickEdit} className="button-30"
                    role="button">{isEditing ? "submit" : "Edit"}</button>

        </div>
    </div>
}
export default EditForm
