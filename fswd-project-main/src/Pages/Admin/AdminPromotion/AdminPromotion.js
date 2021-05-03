import React, { useEffect, useState, useMemo } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  Link
} from "react-router-dom";
import AdminCreateUpdatePromotion from '../AdminCreateUpdatePromotion/AdminCreateUpdatePromotion';
import { PROMOTION_QUERY_ALL } from '../../../graphql/Promotion'
import { useLazyQuery } from '@apollo/client'
import Loading from '../../../components/Loading/Loading'
import Sidebar from "../../../components/Sidebar/Sidebar"
import AdminHeader from "../../../components/AdminHeader/AdminHeader";

const AdminPromotion = () => {
  let { path } = useRouteMatch();
  const [promotions, setPromotions] = useState();
  const [getPromotions, { loading, data }] = useLazyQuery(PROMOTION_QUERY_ALL);

  useEffect(() => {
    if (data?.promotions) {
      console.log(data?.promotions);
      setPromotions(data?.promotions)
    }
  },
    [data],
  )

  useEffect(
    () => {
      const loadData = async () => {
        try {
          await getPromotions()
        } catch (err) {
          console.log("error get product");
        }
      }
      loadData()
    },
    [getPromotions],
  )

  const onError = (e) => {
    e.target.src = 'https://via.placeholder.com/100x100'
  }

  const promotionBox = useMemo(
    () => {
      if (loading) {
        return (
          <tr><td><Loading /></td></tr>
        )
      }
      if (promotions) {
        return (
          promotions?.map((promotion, i) => {
            return (
              <tr key={i} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {promotion.name}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {promotion.start_date + ' ' + promotion.start_time}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {promotion.end_date + ' ' + promotion.end_time}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {promotion.type}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {promotion.active
                    ? <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">Active</span>
                    : <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">Dedctive</span>}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                  <Link to={`${path}/${promotion._id}`} className="text-blue-400 hover:text-blue-600 underline" >Edit</Link>
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
                to={'/admin/product'}
                onClick={() => window.location.reload()}
              >
                ลองใหม่
              </Link>
            </p>
          </div>
        </td></tr>
      )
    },
    [loading, promotions, path],
  )
  return (
    <div>
      <div id="admin_dashboard" className="container px-16 mx-auto bg-blue-50">
        <div className="grid grid-cols-12 gap-y-4">
          <AdminHeader username="New eng jaa" />
          <table className="border-collapse col-span-12">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Name</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Start</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">End</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Type</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Status</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {promotionBox}
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
        <AdminPromotion />
      </Route>
      <Route path={`${path}/create`}>
        <AdminCreateUpdatePromotion />
      </Route>
      <Route path={`${path}/:promotionId`}>
        <AdminCreateUpdatePromotion />
      </Route>
    </Switch>
  )
}

export default Admin;
