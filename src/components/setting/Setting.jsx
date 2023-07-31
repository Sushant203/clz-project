import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Setting = () => {
    const navigate = useNavigate();
    const [datas, setDatas] = useState([]);
    const userid = localStorage.getItem('user_id');
    const fetchData = () => {
        try {
            axios.get(`http://localhost:8000/user/${userid}`).then(res => {
                setDatas(res.data)
                console.log(res.data);
            }).catch(err => {
                console.log(err)
            })

        } catch (error) {

        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const handleDelete = (id) => {
        try {
            axios.delete(`http://localhost:8000/user/${id}`).then(res => {
                if (res.status === 200) {
                    localStorage.clear();
                    navigate('/login');
                }
            }).then(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='text-center flex flex-col items-center justify-center'>


            <div className=''>Welcome to Online cab booking system </div>
            <div>You can Update your Account/profle information and you can delete Your account</div>

            <div>
                <div>1.Delete Your Account </div>
                <div className='bg-red-500 text-white font-bold px-3 w-fit rounded-md cursor-pointer' onClick={() => {
                    handleDelete(userid)
                }}>Delete</div>
            </div>
            <div>
                <div>2.Update your Account</div>
                {datas.map((val, i) => {
                    return (
                        <div key={i}>
                            <Link state={val} to={`editprofile/${val.id}`} className='bg-blue-500 text-white font-bold px-3 w-fit rounded-md cursor-pointer' onClick={() => {

                            }}>Update</Link>
                        </div>
                    )
                })}

            </div>


        </div>



    )
}

export default Setting