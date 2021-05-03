import { Route, Switch, useRouteMatch } from "react-router";
import AdminPromotion from "./AdminPromotion";

const AdminPromotionHandle = () => {
    const {path} = useRouteMatch()
    return(
        <Switch>
            <Route exact path={`${path}`}>
                <AdminPromotion/>
            </Route>
        </Switch>
    )
}
export default AdminPromotionHandle;