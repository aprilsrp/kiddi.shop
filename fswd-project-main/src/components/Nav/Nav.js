import { useSession } from '../../contexts/SessionContext'
import { Fragment, useMemo } from 'react'
import {Link} from "react-router-dom";

import icart from "../../icon/shopping-cart-solid.svg"

function Nav() {
  const { loading, user, logout: handleLogout } = useSession();
  const userBox = useMemo(
    () => {
      if (loading) {
        return (
          <span className="Navbar-user">Loading ...</span>
        )
      }
      if (user) {
        return (
          <Fragment>
            <div className="col-span-2">
              <Link to="/customer">
              {user?.firstname + " " + user?.lastname}
              </Link>
            </div>
            <button className="Navbar-logout" type="button" onClick={handleLogout}>Logout</button>
          </Fragment>
        )
      }
      return (
        <div className="col-span-2">
          <a className="text-xs md:text-l hover:text-blue-600" href="login">เข้าสู่ระบบ</a>
          <span> | </span>
          <a className="text-xs md:text-l hover:text-blue-600" href="register">ลงทะเบียน</a>
        </div>
      )
    },
    [handleLogout, loading, user],
  )

  return (
    <nav className="">
      <div className="flex justify-between items-center gap-x-2 md:gap-x-5 py-4">
        <a href="/"><h2 className="text-xl font-bold md:text-2xl">Marketry</h2></a>
        <input className="text-xs md:text-l rounded px-2 py-1 flex-grow placeholder-gray-400 border border-gray-400 " type="text" placeholder="🔍 &nbsp;Search for products" ></input>
        {userBox}
        <a className="col-span-1" href="cart">
          <img src={icart} alt="cartIcon" className="w-5"></img>
        </a>
      </div>
      <hr></hr>

      <div>
        <ul className="grid grid-cols-7 justify-items-center sm:gap-x-0 md:gap-x-2 py-2">
          <Link to="/">
            <a className="text-xs font-light md:text-l md:font-semibold hover:text-blue-600">หน้าแรก</a>
            </Link>
          <Link to="/product">
            <a className="text-xs font-light md:text-l md:font-semibold hover:text-blue-600" >สินค้าทั้งหมด</a></Link>
          <Link>
            <a className="text-xs font-light md:text-l md:font-semibold hover:text-blue-600">เสื้อ</a></Link>
          <Link>
            <a className="text-xs font-light md:text-l md:font-semibold hover:text-blue-600"> กางเกง</a></Link>
          <Link>
            <a className="text-xs font-light md:text-l md:font-semibold hover:text-blue-600">กระโปรง</a></Link>
          <Link>
            <a className="text-xs font-light md:text-l md:font-semibold hover:text-blue-600">เครื่องประดับ</a></Link>
          <Link to="promotions">
            <a className="text-xs font-light md:text-l md:font-semibold hover:text-blue-600" >โปรโมชัน</a></Link>
        </ul>
      </div>
      <hr></hr>
    </nav>
  )
}


export default Nav;