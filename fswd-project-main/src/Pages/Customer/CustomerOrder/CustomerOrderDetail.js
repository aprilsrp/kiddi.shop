import { useState } from "react";
import { useEffect } from "react";
import CustomerOrders from "../../../components/CustomerOrders/CustomerOrders";
import CustomerSide from "../../../components/CustomerSide/CustomerSide";
import OrderStatus from "../../../components/OrderStatus/OrderStatus";

const CustomerOrderDetail = () => {
    const {orderStatus, setOrderStatus} = useState(false)

    // useEffect(
    //     () => {
    //     if(!orderStatus){
    //         return 
    //     }
    //     }   
    // )
    return(
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-16">
                <CustomerSide></CustomerSide>
                <div className="col-span-9 my-8">
                    <div className="flex justify-between">
                        <div className="">
                        <i class="fas fa-chevron-left"></i> <span className="underline text-gray-400 text-sm lg:text-base">ย้อนกลับ</span>
                        </div>
                        <div>
                            <span className="text-sm lg:text-xl font-bold ">หมายเลขคำสั่งซื้อ: XD123456789</span>
                        </div>
                    </div>
                    {/* orderstatus */}
                    <OrderStatus status={true} />
                {/* address and product under order */}
                <div className="col-span-5">
                    <h3 className="text-xl lg:text-3xl">ที่อยู่ในการจัดส่ง</h3>
                    <div className="py-4 lg:py-8">
                        <p className="text-sm lg:text-xl">name ตัวแปร เดี๋ยวมาใส่</p>
                        <p className="text-sm lg:text-xl">ที่อยู่ในการจัดส่ง ตัวแปร</p>
                        <p className="text-sm lg:text-xl">เบอร์โทร ตัวแปร</p>
                    </div>
                </div>
                <div className="col-span-7"></div>
                <div className="col-span-12">
                    <CustomerOrders status={true} />
                </div>
            </div>
        </div>
    )
}
export default CustomerOrderDetail;