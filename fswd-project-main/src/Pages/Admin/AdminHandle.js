import React, { Suspense } from 'react'
import {
  Route,
  Switch,
  useRouteMatch
} from "react-router-dom";
import AdminProduct from './AdminProduct/AdminProduct';
import AdminPromotion from './AdminPromotion/AdminPromotion';
import AdminOrder from './AdminOrder/AdminOrder';
import AdminDashboard from './Admin/AdminDashboard';
import AdminPromotionHandle from './AdminPromotion/AdminPromotionHandle';

const Admin = () => {
  let { path } = useRouteMatch();
  return (
    <Suspense fallback="Loading ...">
      <Switch>
        <Route exact path={`${path}`}>
          <AdminDashboard />
        </Route>
        <Route path={`${path}/product`}>
          <AdminProduct />
        </Route>
        <Route path={`${path}/promotion`}>
          <AdminPromotion />
        </Route>
        <Route path={`${path}/order`}>
          <AdminOrder />
        </Route>
      </Switch>
    </Suspense>
  )
}

export default Admin;