import { Route, Switch, useRouteMatch } from "react-router";
import CustomerOrder from "./CustomerOrder";
import CustomerOrderDetail from "./CustomerOrderDetail";


const CustomerOrderHandle = () => {
    const {path} = useRouteMatch()
    return(
        <Switch>
        <Route exact path={`${path}`}>
            <CustomerOrder></CustomerOrder>
        </Route>
        <Route path={`${path}/detail/:orderId`}>
            <CustomerOrderDetail></CustomerOrderDetail>
        </Route>
        
    </Switch>
    )
}
export default CustomerOrderHandle;