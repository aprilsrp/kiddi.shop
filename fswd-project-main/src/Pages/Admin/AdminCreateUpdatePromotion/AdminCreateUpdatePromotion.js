import React, { useState, useCallback, useEffect } from "react";
import { useMutation, useLazyQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router'

import { CREATE_PROMOTION_MUTATION, PROMOTION_QUERY, UPDATE_PROMOTION } from '../../../graphql/Promotion'
import { PRODUCT_QUERY_ALL } from '../../../graphql/Product'

import { isNumeric } from '../../../utils/isNumeric'
import { UploadForm } from '../../../components/UploadForm/UploadForm'
import Sidebar from "../../../components/Sidebar/Sidebar"
import AdminHeader from "../../../components/AdminHeader/AdminHeader";

// import configData from "../../../config.json";

const AdminPromotion = () => {
  //   const CONFIG_CREATE_PRODUCT = configData.ADMIN.CREATE_PRODUCT
  const { promotionId } = useParams();
  const isUpdatePromotion = true ? promotionId : false;
  const [getProduct, { data }] = useLazyQuery(PRODUCT_QUERY_ALL);

  const history = useHistory()
  const [createPromotion] = useMutation(CREATE_PROMOTION_MUTATION)
  const [updatePromotion] = useMutation(UPDATE_PROMOTION)

  const [newPromotion, setNewPromotion] = useState({ active: true });
  const [products, setProducts] = useState();
  const className_input = "shadow appearance-none border rounded w-6/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

  const [getPromotion] = useLazyQuery(PROMOTION_QUERY, {
    variables: { promotionId },
    onCompleted: async data => {
      setNewPromotion(data.promotionById)
    }
  });
  //   Get product all
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

  // Check page Update or Create
  useEffect(() => {
    if (!isUpdatePromotion) return
    getPromotion()
  }, [isUpdatePromotion, getPromotion]);

  // Send state to uploadImage
  const handleReturnImage = (value) => {
    setNewPromotion({
      ...newPromotion,
      banner: value
    })
  }

  // setNewProduct from input, option, checkbox form 
  const handleInputChange = useCallback(
    (e) => {
      let { name, value } = e.target

      if (name === "active") value = e.target.checked

      if (isNumeric(value)) value = Number(value)

      setNewPromotion((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleInputChangeProduct = useCallback(
    (e) => {
      let { value } = e.target
      // console.log(products[value] );
      setNewPromotion((prev) => ({ ...prev, ...products[value] }))
    },
    [products],
  )

  // Submit useMutation createProduct -> backend
  const handleSubmitCreate = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        if (isUpdatePromotion) {
          console.log("Update Promotion");
          await updatePromotion({ variables: { record: newPromotion, promotionId } })
          alert('Update success')
          history.push('/admin')
        } else {
          console.log("Create Promotion");
          await createPromotion({ variables: { record: newPromotion } })
          alert('Create success')
          history.push('/admin')
        }

      } catch (err) {
        console.log(err)
        alert('Register failed')
      }
    },
    [createPromotion, newPromotion, history, isUpdatePromotion, promotionId, updatePromotion],
  )

  return (
    <div>
    <div id="admin_dashboard" className="container px-16 mx-auto bg-blue-50">
      <div className="grid grid-cols-12 gap-y-4">
        <AdminHeader username="New eng jaa" />
    <div className="bg-blue-200 col-span-12  rounded shadow-md">
      <div className="container bg-gray-50 px-16 ">
        {
          isUpdatePromotion
            ? <h1 className="text-yellow-500 text-3xl">Update Promotion</h1>
            : <h1 className="text-green-500 text-3xl">Create Promotion</h1>
        }
        <form className="flex flex-col" onSubmit={handleSubmitCreate}>
          {/* Promotion Name */}
          <label>Promotion Name</label>
          <input onChange={handleInputChange} value={newPromotion.name} type="text" name="name" className={className_input}></input>

          {/* Description */}
          <label>Description</label>
          <textarea onChange={handleInputChange} value={newPromotion.description} name="description" className={className_input}></textarea>

          {/* TYPE */}
          <label>Type</label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="type" value="Free" onChange={handleInputChange} checked={newPromotion.type === 'Free'}/>
            <span className="ml-2 mr-5">Free</span>
          </label>
            Buy
            <input disabled={!(newPromotion.type === 'Free')} onChange={handleInputChange} value={newPromotion.buy_get || ""} type="text" name="buy_get" className={className_input}></input>
            Get
            <input disabled={!(newPromotion.type === 'Free')} onChange={handleInputChange} value={newPromotion.get_buy || ""} type="text" name="get_buy" className={className_input}></input>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="type" value="Sale" onChange={handleInputChange} checked={newPromotion.type === 'Sale'} />
            <span className="ml-2">Sale</span>
          </label>
          Sale
            <input disabled={!(newPromotion.type === 'Sale')} onChange={handleInputChange} value={newPromotion.persent || ""} type="text" name="persent" className={className_input}></input>

          {/* PROMOTION */}
          <label>Product</label>
          <select onChange={handleInputChangeProduct} value={newPromotion.product} name="product" id="product" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option value="">-- Please select one --</option>
            {
              products
                ?
                products.map((value, i) => {
                  return (<option key={i} value={i}>{value.name}</option>)
                })
                : <option value="">NO PRODUCT</option>
            }
          </select>

          {/* Banner */}
          <label>Banner</label>
          <UploadForm handleReturnImage={handleReturnImage} images={newPromotion.banner} />
          {
            newPromotion.banner?.map((url, i) => {
              return <img key={i} src={url} alt="img" width="100" />
            })
          }
          {/* Start */}
          <div className="inline">
            <label>Start</label>
            <input onChange={handleInputChange} value={newPromotion.start_date} type="date" name="start_date" id="number" className="mt-5 shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
            <input onChange={handleInputChange} value={newPromotion.start_time} type="time" name="start_time" id="number" className="mt-5 shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
            (24 hr)
          </div>

          {/* End */}
          <div>
            <label className="">End</label>
            <input onChange={handleInputChange} value={newPromotion.end_date} type="date" name="end_date" id="number" className="mt-5 shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
            <input onChange={handleInputChange} value={newPromotion.end_time} type="time" name="end_time" id="number" className="mt-5 shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
          (24 hr)
          </div>

          {/* Status */}
          <label >Status</label>
          <div className="inline">
            <label className="inline-flex items-center mt-3">
              <input onChange={handleInputChange} defaultChecked={newPromotion.active} type="checkbox" className="form-checkbox h-5 w-5 text-green-600" name="active" /><span className="ml-2 text-gray-700">Active</span>
            </label>
          </div>

          {/* Main save */}
          <button type="submit" className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-green-500 hover:border-transparent rounded w-max mb-5 mt-2">
            Save Product
          </button>

          {/* Test Save Product Log data newProduct */}
          <button type="button" onClick={() => console.log(newPromotion)} className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-green-500 hover:border-transparent rounded w-max">
            Test Save Product
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
    <Sidebar/>
    </div>
  )
}
export default AdminPromotion;
