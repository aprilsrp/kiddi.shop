import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useMutation, useLazyQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router'
import { Link } from "react-router-dom";

import { USER_QUERY } from '../../../graphql/User'
import { PRODUCT_QUERYS } from '../../../graphql/Product'
import { ORDER_QUERY, UPDATE_ORDER } from '../../../graphql/Order'

// import { isNumeric } from '../../../utils/isNumeric'
// import { UploadForm } from '../../../components/UploadForm/UploadForm'
import { formatDate } from '../../../utils/formatDate'
import Loading from '../../../components/Loading/Loading'

import configData from "../../../config.json";

const AdminPromotion = () => {
  let array_product = []
  const ORDER_STATUS = configData.ADMIN.ORDER_STATUS
  const { orderId } = useParams();

  const history = useHistory()
  const [updateOrder] = useMutation(UPDATE_ORDER)

  const [order, setOrder] = useState({});
  const [statusOrder, setStatusOrder] = useState('');
  const [products, setProducts] = useState();
  const [productIds, setProductIds] = useState({});
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();

  const [getOrder] = useLazyQuery(ORDER_QUERY, {
    variables: { orderId },
    onCompleted: async data => {
      console.log(data.orderById);
      setUserId(data.orderById.customer_id)
      setOrder(data.orderById)
      setStatusOrder(data.orderById.status)
      getUser()
      data.orderById.products?.forEach(element => {
        array_product.push(element.product_id)
      });
      setProductIds(array_product)
      getProducts()
    }
  });

  const [getProducts, { loading }] = useLazyQuery(PRODUCT_QUERYS, {
    variables: { productIds },
    onCompleted: async data => {
      console.log(data.productByIds);
      setProducts(data.productByIds)
    }
  });

  const [getUser] = useLazyQuery(USER_QUERY, {
    variables: { userId },
    onCompleted: async data => {
      console.log(data.userById);
      setUser(data.userById)
    }
  });

  // Get Order
  useEffect(() => {
    getOrder()
  }, [getOrder]);

  const handleChangeSatus = (e) => {
    console.log(e.target.value);
    setStatusOrder(e.target.value)
  }

  // Submit useMutation updateOrder
  const handleSubmitUpdate = useCallback(
    async () => {
      try {
        console.log("Update Order", statusOrder);
        await updateOrder({ variables: { record: { status: statusOrder }, orderId } })
        alert('Update success')
        history.push('/admin/order')
      } catch (err) {
        console.log(err)
        alert('Update failed')
      }
    },
    [statusOrder, history, orderId, updateOrder],
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
                  {product.price}
                </td>
                <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                  {product.active
                    ? <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">Active</span>
                    : <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">Dedctive</span>}
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
    [loading, products],
  )

  return (
    <div className="bg-gray-50 h-screen">
      <div className="container px-16 flex pt-8 justify-between">
        <div className="flex flex-col">
          <h1 className="text-yellow-500 text-3xl">Update Order
            <label style={{ fontSize: "20px", fontStyle: "italic" }} className="text-gray-500 pl-5">Status: {order?.status}</label>
          </h1>
          {/* Promotion Name */}
          <div className="flex mt-5">
            <label className="ml-3 text-gray-500">Customer</label>
            <label className="ml-3 text-blue-700">{user?.username}</label>
          </div>
          <div className="flex mt-5">
            <label className="ml-3 text-gray-500">Order Date</label>
            <label className="ml-3 text-blue-700">{formatDate(order?.date)}</label>
          </div>
          <div className="flex mt-5">
            <label className="ml-3 text-gray-500">Payment method</label>
            <label className="ml-3 text-blue-700">{order?.payment_method}</label>
          </div>
          <div className="flex mt-5">
            <label className="ml-3 text-gray-500">Delivery address</label>
          </div>
          <div className="flex mt-5 ml-9">
            <label className="ml-3 text-gray-500">Name</label>
            <label className="ml-3 text-blue-700">Name</label>
          </div>
        </div>
        <div className="flex flex-col space-y-3 mr-96 mt-20">
          <label>Status Order</label>
          {ORDER_STATUS?.status.map((value, i) => {
            let check = (order?.status === value ? "text-red-500" : '')
            return (
              <label key={i} className="inline-flex items-center">
                <input type="radio" className="form-radio" name="status"
                  value={value}
                  disabled={order?.status === value}
                  onClick={(e) => handleChangeSatus(e)} />
                <span className={"ml-2 mr-5 " + check} >{value}</span>
              </label>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-y-4 mx-80">
        <div className="col-span-2 ">
        </div>
        <table className="border-collapse w-full mx-auto col-span-12">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Product ID</th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Image</th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Name</th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Tag</th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Price</th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {productBox}
          </tbody>
        </table>
        {/* Main save */}
        <button type="button" onClick={() => handleSubmitUpdate()} className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-green-500 hover:border-transparent rounded w-max mb-5 mt-2">
          Save Product
          </button>
        {/* Test Save Product Log data newProduct */}
        {/* <button type="button" onClick={() => console.log(statusOrder)} className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-green-500 hover:border-transparent rounded w-max">
              Test Save Product
            </button> */}
      </div>
    </div>
  )
}
export default AdminPromotion;
