import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../../config/firebase';

export default function AllUsers() {

    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllUsers = async () => {
        let array = []
        const q = query(collection(firestore, "users"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
        });
        setAllUsers(array)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchAllUsers()
    })

    return (
        <>
            <div className="allusers">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>All Users</h1>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col table-responsive">
                            <div className="card table-responsive p-5">
                                {!isLoading
                                    ?
                                    <table className="table">
                                        <thead className="table-dark">
                                            <tr className='text-center'>
                                                <th scope="col">No.</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Uid</th>
                                            </tr>
                                        </thead>
                                        {
                                            allUsers.map((user, i) => {
                                                return <tbody key={i}>
                                                    <tr className='text-center'>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>
                                                            {user.firstName} {user.lastName}
                                                        </td>
                                                        <td>{user.email}</td>
                                                        <td>{user.uid}</td>
                                                    </tr>
                                                </tbody>
                                            })
                                        }
                                    </table>
                                    : <div className='text-center'>
                                        <div className='spinner-border text-info'></div></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
