import React, { useEffect, useState, useMemo } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  Link
} from "react-router-dom";
import UpdateOrder from '../AdminOrderUpdate/AdminOrderUpdate';
import { ORDER_QUERY_ALL } from '../../../graphql/Order'
import { useLazyQuery } from '@apollo/client'
import Loading from '../../../components/Loading/Loading'
import { formatDate } from '../../../utils/formatDate'
import Sidebar from "../../../components/Sidebar/Sidebar"
import AdminHeader from "../../../components/AdminHeader/AdminHeader";

const AdminOrder = () => {
  let { path } = useRouteMatch();
  const [orders, setOrders] = useState();
  const [getOrder, { loading, data }] = useLazyQuery(ORDER_QUERY_ALL);

  useEffect(() => {
    if (data?.orders) {
      console.log(data?.orders);
      setOrders(data?.orders)
    }
  },
    [data],
  )

  useEffect(
    () => {
      const loadData = async () => {
        try {
          await getOrder()
        } catch (err) {
          console.log("error get order");
        }
      }
      loadData()
    },
    [getOrder],
  )

  const sum = (obj) => {
    var sum = 0;
    for (var i = 0; i < obj.length; i++) {
      sum += obj[i].count
    }
    return sum;
  }
  
  const orderBox = useMemo(
    () => {
      if (loading) {
        return (
          <tr><td><Loading /></td></tr>
        )
      }
      if (orders) {
        return (
          orders?.map((order, i) => {
            return (
              <tr key={i} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  {order.order_id}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {order.customer_name}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {formatDate(order.date)}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {sum(order.products)}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">{order.status}</span>
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                  <Link to={`${path}/${order._id}`} className="text-blue-400 hover:text-blue-600 underline" >Edit</Link>
                  {/* <a href="#" className="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a> */}
                </td>
              </tr>
            )
          })
        )
      }
      return (
        <tr><td colSpan="9">
          <div className="flex justify-center">
            <p className="py-4">มีบางอย่างผิดพลาดกรุณาลองใหม่
              <Link className="ml-1 text-blue-700 underline"
                to={'/admin/order'}
                onClick={() => window.location.reload()}
              >
                ลองใหม่
              </Link>
            </p>
          </div>
        </td></tr>
      )
    },
    [loading, orders, path],
  )
  return (
    <div>
      <div id="admin_dashboard" className="container px-16 mx-auto bg-blue-50">
        <div className="grid grid-cols-12 gap-y-4">
          <AdminHeader username="New eng jaa" />
          <table className="border-collapse col-span-12 rounded shadow-md">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Order ID</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Customer</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Order Data</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Count</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Status</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderBox}
            </tbody>
          </table>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

const Admin = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <AdminOrder />
      </Route>
      <Route path={`${path}/:orderId`}>
        <UpdateOrder />
      </Route>
    </Switch>
  )
}

export default Admin;