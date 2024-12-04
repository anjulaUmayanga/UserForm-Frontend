import { Box } from "@mui/material";
import UserForms from "./UserForm";
import UsersTable from "./UsersTable";
import  Axios  from "axios";
import { useEffect, useState } from "react";


const UsersEnter = ()=>{
    const [users, setUsers] = useState([]);
    const [submited, setSubmited]=useState([false]);
    const [isEdit, setIsEdit] = useState([false]);
    const [selectedUser, setSelectedUser] = useState({})

    //run getusers when page is load *useEffect* hook
    useEffect(()=>{
        getUsers();
    },[]);
    useEffect(() => {
        setIsEdit(false);
        setSelectedUser({});
        getUsers();
    }, []);

    const getUsers = ()=>{
        Axios.get('http://localhost:3001/api/users')
            .then(response => {
                
                setUsers(response.data?.response || []);
            })
            .catch(error =>{
                console.error("Axios Error", error);
            })
    };
//add user
    const addUser =(data)=>{
        setSubmited (true);
        
        const payload ={
            id:data.id,
            name:data.name,
        }

        Axios.post('http://localhost:3001/api/createusers',payload)
            .then(() => {         
                getUsers();
                setSubmited(false);
                isEdit(false)
                setSelectedUser({});
            })
            .catch(error =>{
                console.error("Axios Error", error);
            })
    };
//update user
    const updateUser =(data) =>{
        setSubmited(true);
        
        const payload ={
            id:data.id,
            name:data.name,
        }
        Axios.post('http://localhost:3001/api/updateusers',payload)
            .then(() => {         
                getUsers();
                setSubmited(false);
                isEdit(false)
                setSelectedUser({});
            })
            .catch(error =>{
                console.error("Axios Error", error);
            })
    };
//delete user
    const deleteUser=(data)=>{
        
    
        Axios.post('http://localhost:3001/api/deleteusers',data)
            .then(() => {         
                getUsers();
                
            })
            .catch(error =>{
                console.error("Axios Error", error);
            })
    };
    return(
        <Box 
        sx={{
            width:'calc(100% -100px)',
            margin:'auto',
            marginTop:'100px'
        }}
        >
            <UserForms
                addUser= {addUser}
                submited={submited}
                data ={selectedUser}
                updateUser={updateUser}
                isEdit={isEdit}
            />
            <UsersTable 
            rows={users}
            selectedUser={data =>{
                setSelectedUser(data);
                setIsEdit(true);
            }}
            deleteUser={data=>{window.confirm('Are you sure?' )&& deleteUser(data)}}
            />
        </Box>
    );

}
export default UsersEnter