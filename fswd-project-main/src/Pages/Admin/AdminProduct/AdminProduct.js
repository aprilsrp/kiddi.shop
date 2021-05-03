import React, { useEffect, useState, useMemo } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  Link
} from "react-router-dom";
import CreateUpdateProduct from '../AdminCreateUpdateProduct/AdminCreateUpdateProduct';
import { PRODUCT_QUERY_ALL } from '../../../graphql/Product'
import { useLazyQuery } from '@apollo/client'
import Loading from '../../../components/Loading/Loading'
import Sidebar from "../../../components/Sidebar/Sidebar";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";

const AdminProduct = () => {
  let { path } = useRouteMatch();
  const [products, setProducts] = useState();
  const [getProduct, { loading, data }] = useLazyQuery(PRODUCT_QUERY_ALL);

  useEffect(() => {
    if (data?.products) {
      console.log(data?.products);
      setProducts(data?.products)
    }
  },
    [data],
  )

  useEffect(
    () => {
      const loadData = async () => {
        try {
          await getProduct()
        } catch (err) {
          console.log("error get product");
        }
      }
      loadData()
    },
    [getProduct],
  )

  const onError = (e) => {
    e.target.src = 'https://via.placeholder.com/100x100'
  }

  const productBox = useMemo(
    () => {
      if (loading) {
        return (
          <tr><td><Loading /></td></tr>
        )
      }
      if (products) {
        return (
          products?.map((product, i) => {
            return (
              <tr key={i} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  {product._id}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                  <img src={product?.image[0]} onError={onError} width="100" height="100" alt="" />
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {product.name}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {product.tag.join()}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {product.count}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {product.count - 2}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {product.price}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {product.active
                    ? <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">Active</span>
                    : <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">Dedctive</span>}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                  <Link to={`${path}/${product._id}`} className="text-blue-400 hover:text-blue-600 underline" >Edit</Link>
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
    [loading, products, path],
  )
  return (
    <div>
      <div id="admin_product_table" className="container px-16 mx-auto bg-blue-50">
        <div className="grid grid-cols-12 gap-y-4">
          <AdminHeader username="New eng jaa" />
          <div className="col-span-2 ">
            <select className="px-4 py-2 shadow-md rounded">
              <option>สินค้าทั้งหมด</option>
            </select>
          </div>
          <div className="col-span-2">
            <Link to={`${path}/create`}>
              <button className="bg-blue-600 text-white px-4 py-2 shadow-md rounded"><i class="fas fa-plus-circle"></i> Add product</button>
            </Link>
          </div>
          <table className="border-collapse w-full mx-auto col-span-12">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Product ID</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Image</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Name</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Tag</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Stock</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Sold</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Price</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Status</th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {productBox}
            </tbody>
          </table>
        </div>
      </div>
      <Sidebar></Sidebar>
    </div>
  )
}

const Admin = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`}>
        <AdminProduct />
      </Route>
      <Route path={`${path}/create`}>
        <CreateUpdateProduct />
      </Route>
      <Route path={`${path}/:productId`}>
        <CreateUpdateProduct />
      </Route>
    </Switch>
  )
}

export default Admin;