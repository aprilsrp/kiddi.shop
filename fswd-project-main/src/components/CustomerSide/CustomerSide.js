import {  useRouteMatch } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const CustomerSide = () => {
    let { path, url } = useRouteMatch();


    return (
        <div className="col-span-3 my-8" >
            <div className="flex flex-col border border-gray-300">
                <span className="p-4 font-bold text-xs lg:text-base">บัญชีของฉัน</span>
                <Link to="/customer" className="p-4 hover:bg-blue-500 hover:text-white cursor-pointer text-xs lg:text-base">
                    <span >ข้อมูลของฉัน</span>
                </Link>
                <hr></hr>
                <Link to={`${path}/order`} className="p-4 hover:bg-blue-500 hover:text-white cursor-pointer text-xs lg:text-base">
                    <span >รายการสั่งซื้อของฉัน</span>
                </Link>
            </div>
        </div>
    )
}
export default CustomerSide