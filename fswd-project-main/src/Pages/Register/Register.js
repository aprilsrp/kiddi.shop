import { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { useMutation } from '@apollo/client'

import { CREATE_USER_MUTATION } from '../../graphql/createUserMutation'

const Register = () => {
  const history = useHistory()
  const [newUser, setNewUser] = useState({ firstname: '', lastname: '', username: '', password: '' })
  const [createUser] = useMutation(CREATE_USER_MUTATION)
  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setNewUser((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )
  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        await createUser({ variables: { record: newUser } })
        history.push('/')
        alert('Register success')
      } catch (err) {
        console.log(err)
        alert('Register failed')
      }
    },
    [createUser, history, newUser],
  )
  return (
    <div className="">
      <div className="flex justify-center">
        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-12">
            <h2 className="font-bold text-4xl col-span-12 text-center py-16">ลงทะเบียน</h2>
            <p className="col-span-12" >ชื่อ</p>
            <input className="col-span-10 mb-4 py-2 px-4" type="text" placeholder="กรอกชื่อ"
              name="firstname"
              value={newUser.firstname}
              onChange={handleInputChange}
            ></input>
            <div className="col-span-2 mb-4 py-2 px-4 bg-white">
              <span>Logo</span>
            </div>
            <p className="col-span-12" >นามสกุล</p>
            <input className="col-span-10 mb-4 py-2 px-4" type="text" placeholder="กรอกนามสกุล"
              name="lastname"
              value={newUser.lastname}
              onChange={handleInputChange}
            ></input>
            <div className="col-span-2 mb-4 py-2 px-4 bg-white">
              <span>Logo</span>
            </div>
            <p className="col-span-12" > Username</p>
            <input className="col-span-10 mb-4 py-2 px-4" type="text" placeholder="กรอก Username"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
            ></input>
            <div className="col-span-2 mb-4 py-2 px-4 bg-white">
              <span>Logo</span>
            </div>
            <p className="col-span-12" > Password</p>
            <input className="col-span-10 mb-4 py-2 px-4" type="password" placeholder="กรอก Password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
            ></input>
            <div className="col-span-2 mb-4 py-2 px-4 bg-white">
              <span>Logo</span>
            </div>
            <button className="col-span-12 bg-black text-white py-2 my-4" type="submit">ลงทะเบียน</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
