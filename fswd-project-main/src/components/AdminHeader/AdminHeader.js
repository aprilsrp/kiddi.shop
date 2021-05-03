import { useEffect } from "react";

const AdminHeader = (props) => {
    
    return (
        <div id="" className="col-span-12 p-4 bg-white mt-8 shadow-md rounded">
            <div className="items-center flex justify-end">
            	<i class="fas fa-user pr-4 text-2xl"></i><span>{props.username}</span>
            </div>
		</div>
    )
}
export default AdminHeader;