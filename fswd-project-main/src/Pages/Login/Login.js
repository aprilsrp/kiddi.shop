import { Link, useHistory } from "react-router-dom";
import { useCallback, useState } from 'react'

import { useSession } from '../../contexts/SessionContext';

const Login = () => {
  const history = useHistory()
  const { login } = useSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = useCallback(
    (e) => {
      setUsername(e.target.value)
    },
    [],
  )
  const handlePasswordChange = useCallback(
    (e) => {
      setPassword(e.target.value)
    },
    [],
  )
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault()
      await login(username, password)
      history.push('/')
    },
    [login, username, password, history],
  )
  return (
    <div className="">
      <div className="flex justify-center">
        <form onSubmit={handleLogin}>
          <div className="grid grid-cols-12">
            <h2 className="font-bold text-4xl col-span-12 text-center py-16">เข้าสู่ระบบ</h2>
            <p className="col-span-12" >ชื่อผู้ใช้งาน</p>
            <input className="col-span-10 mb-4 py-2 px-4" type="text" placeholder="กรุณากรอกชื่อผู้ใช้งาน"
              value={username} onChange={handleUsernameChange}
            >
            </input>
            <div className="col-span-2 mb-4 py-2 px-4 bg-white">
              <span>Logo</span>
            </div>
            <p className="col-span-12" >รหัสผ่าน</p>
            <input className="col-span-10 mb-4 py-2 px-4" type="password" placeholder="กรุณากรอกรหัสผ่าน"
              value={password} onChange={handlePasswordChange}
            >
            </input>
            <div className="col-span-2 mb-4 py-2 px-4 bg-white">
              <span>Logo</span>
            </div>
            <button className="col-span-12 bg-black text-white py-2 my-4" type="submit">เข้าสู่ระบบ</button>
          </div>
          <div className="flex justify-center">
            <p className="py-4">ยังไม่เคยลงทะเบียน? <Link to={'/register'}>ลงทะเบียน</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
