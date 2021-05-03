import { Route, Switch, useRouteMatch } from "react-router"
import CustomerOrders from "../../../components/CustomerOrders/CustomerOrders"
import CustomerSide from "../../../components/CustomerSide/CustomerSide"

const CustomerOrder = () =>{
    return(
            <div className="grid grid-cols-12 gap-x-4 lg:gap-x-16">
                <CustomerSide></CustomerSide>
                <div className="col-span-9">
                    <h1 className="font-bold text-xl lg:text-3xl py-8">รายการสั่งซื้อของฉัน</h1>
                    <CustomerOrders />

                </div>
                
            </div>

    )
}
export default CustomerOrder;