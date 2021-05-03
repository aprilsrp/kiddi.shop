import Customer from '../Customer/CustomerProfile/customer'
import {
    Route,
    Switch,
    useRouteMatch
  } from "react-router-dom";
import CustomerOrderHandle from './CustomerOrder/CustomerOrderHandle';

const CustomerHandle = () => {
    let { path } = useRouteMatch();
    return(
        <Switch>
            <Route exact path={`${path}`}>
                <Customer></Customer>
            </Route>
            <Route path={`${path}/order`}>
                <CustomerOrderHandle />
            </Route>
            
        </Switch>
    )
}
export default CustomerHandle