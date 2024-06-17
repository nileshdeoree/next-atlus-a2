import React, { useState } from 'react'

const Index = ({ users }) => {

  const [credentials, setCredentials] = useState({ name: "", email: "" })
  const [userList, setUserList] = useState(users)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log("baseUrl :: ",baseUrl);

  const fetchUsers = async()=>{
    const response = await fetch(`${baseUrl}/api/getuser`)
    const updatedUsers = await response.json()
    setUserList(updatedUsers)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/adduser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email })
    });
    const result = await response.json();
    console.log(result);

    if (result.message == 'success') {
      alert("success")
      fetchUsers()
    } else {
      alert("failed");
    }
  }


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} >
          <input type="text" onChange={onChange} name='name' value={credentials.name} className='text-black m-5' />
          <input type="text" onChange={onChange} name='email' value={credentials.email} className='text-black m-5' size="30" />
          <button type='submit'>Submit</button>
        </form>
      </div>

      <div>
          <ul>
            {userList.map(user =>(
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
      </div>
    </>

  )
}

export async function getServerSideProps(context) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/getuser`);
  const users = await res.json();

  return {
    props: {
      users
    }
  };
}


export default Index
