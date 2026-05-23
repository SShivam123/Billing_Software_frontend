import { useEffect, useState } from 'react'
import UserForm from './UserForm'
import UserList from './UserList'
import toast from 'react-hot-toast'

const ManageUser = () => {
  const [Users, setUsers] = useState([])
  const [loadingUser, setloadingUser] = useState(false)
  const fetchAllusers = async () => {
    try {
      setloadingUser(true)
      let response = await fetch("http://localhost:8080/admin/users", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      let data = await response.json()
      if (response.ok) {
        console.log(data);

        setUsers(data)
      } else {
        toast.error("Some error occured" + data.message)
      }
    } catch (error) {
      toast.error("Some error occured")
    } finally {
      setloadingUser(false)
    }
  }

  useEffect(() => {
    fetchAllusers()
  }, [])

  return (
    <div className='sm:h-[calc(100vh-80px)] h-full w-full p-5 flex gap-5 bg-black/85 sm:flex-row flex-col'>
      <div className='left md:w-[70%] sm:w-[50%] h-full rounded border border-white p-3'>
        <UserForm Users={Users} setUsers={setUsers} loadingUser={loadingUser} setloadingUser={setloadingUser} />
      </div>
      <div className='right md:w-[30%] sm:w-[50%] sm:h-full h-100 rounded border border-white p-2'>
        <UserList Users={Users} setUsers={setUsers} loadingUser={loadingUser} setloadingUser={setloadingUser} />
      </div>
    </div>
  )
}

export default ManageUser