import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/cashercomponents/Sidebar';
import Topbar from '../../components/cashercomponents/Topbar';
import Axios from 'axios';
import axios from 'axios';
axios.defaults.withCredentials = true;
const Casher = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    Axios.post('http://94.130.104.15/api/auth/refresh').then((response) => {
        setUserName(response.data.adminName);
        setEmail(response.data.email);
        console.log(username);
        console.log(email);
       }).catch((error) => {
        console.log(error);
       })
}, [])

  return (
    <div className="app">
            <>
              <Sidebar isSidebar={isSidebar} username ={username}  email ={email}/>
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />

                </main>
            </>
            </div>
  )
}

export default Casher;