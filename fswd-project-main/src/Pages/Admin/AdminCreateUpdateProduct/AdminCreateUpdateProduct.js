import React, { useState, useCallback, useEffect } from "react";
import { useMutation, useLazyQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router'

import { CREATE_PRODUCT_MUTATION, PRODUCT_QUERY, UPDATE_PRODUCT } from '../../../graphql/Product'

import { isNumeric } from '../../../utils/isNumeric'
import { InputAdd } from '../../../components/InputAdd/InputAdd'
import { UploadForm } from '../../../components/UploadForm/UploadForm'
import Sidebar from "../../../components/Sidebar/Sidebar"
import AdminHeader from "../../../components/AdminHeader/AdminHeader";

import configData from "../../../config.json";

const AdminProduct = () => {
  const CONFIG_CREATE_PRODUCT = configData.ADMIN.CREATE_PRODUCT
  // Update 
  const { productId } = useParams();
  const isUpdateProduct = true ? productId : false;

  const history = useHistory()
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION)
  const [updateProduct] = useMutation(UPDATE_PRODUCT)

  const [newProduct, setNewProduct] = useState({ tag: [], active: true });
  const [numTag, setNumTeg] = useState(0);
  const [disabled, setDisabled] = useState({});
  const [valueTag, setValueTag] = useState({});
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(value => !value);
  const [nowTag, setNowTag] = useState('');
  const className_input = "shadow appearance-none border rounded w-6/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

  // Update
  const [getProduct] = useLazyQuery(PRODUCT_QUERY, {
    variables: { productId },
    onCompleted: data => {
      setNewProduct(data.productById)
      setNumTeg(data.productById.tag.length)
    }
  });

  const tags = [];

  // Check page Update or Create
  useEffect(() => {
    if (!isUpdateProduct) return
    getProduct()
  }, [isUpdateProduct, getProduct]);

  // loop create tags
  for (var i = 0; i < numTag; i++) {
    tags.push(
      <InputAdd
        key={i}
        name={'tag' + i}
        index={i}
        value={newProduct.tag[i]}
        onChange={(e) => handleChangeInputTag(e)}
        onKeyDown={(e) => handleKeyDownInputTag(e)}
        disabled={(disabled['tag' + i]) ? "disabled" : ""}
      />
    );
  }

  // Assign each ValueTag
  const handleChangeInputTag = (e) => {
    const value = e.target.value;
    setNowTag(e.target.name)
    setValueTag({
      ...valueTag,
      [e.target.name]: value
    });
  }

  // Add Tag from onClick
  const handleAddTags = (e) => {
    toggleChecked()
    if (e === 1) setNumTeg(numTag + e)
    else handleDisableTags({ target: { name: e, value: valueTag[e] } })
  }

  // Check key press Enter in input tag  
  const handleKeyDownInputTag = (e) => {
    if (e.key === 'Enter') {
      handleDisableTags()
    }
  }

  // Disable input tag And setNewProduct
  const handleDisableTags = (e) => {
    const value = e.target.value;
    setDisabled({
      ...disabled,
      [e.target.name]: value
    });

    setNewProduct({
      ...newProduct,
      tag: [...newProduct.tag, value]
    })
  }

  // Send state to uploadImage
  const handleReturnImage = (value) => {
    console.log(value);
    setNewProduct({
      ...newProduct,
      image: value
    })
  }

  // setNewProduct from input, option, checkbox form
  const handleInputChange = useCallback(
    (e) => {
      let { name, value } = e.target

      if (name === "active") value = e.target.checked

      if (isNumeric(value)) value = Number(value)

      setNewProduct((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  // Submit useMutation createProduct -> backend
  const handleSubmitCreate = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        if (isUpdateProduct) {
          console.log("Update Product");
          await updateProduct({ variables: { record: newProduct, productId } })
          alert('Update success')
          history.push('/admin')
        } else {
          console.log("Create Product");
          await createProduct({ variables: { record: newProduct } })
          alert('Create success')
          history.push('/admin')
        }

      } catch (err) {
        console.log(err)
        alert('Register failed')
      }
    },
    [createProduct, newProduct, history, isUpdateProduct, productId, updateProduct],
  )

  return (
    <div>
      <div id="admin_dashboard" className="container px-16 mx-auto bg-blue-50">
        <div className="grid grid-cols-12 gap-y-4">
          <AdminHeader username="New eng jaa" />
          <div className="col-span-12 bg-blue-200 rounded shadow-md">
            <div className="container bg-gray-50 px-16 ">
              {
                isUpdateProduct
                  ? <h1 className="text-yellow-500 text-3xl">Update Product</h1>
                  : <h1 className="text-green-500 text-3xl">Create Product</h1>
              }
              <form className="flex flex-col" onSubmit={handleSubmitCreate}>
                {/* Product Name */}
                <label>Product Name</label>
                <input onChange={handleInputChange} value={newProduct.name} type="text" name="name" className={className_input}></input>

                {/* Description */}
                <label>Description</label>
                <textarea onChange={handleInputChange} value={newProduct.description} name="description" className={className_input}></textarea>

                {/* TYPE */}
                <label>Type</label>
                <select onChange={handleInputChange} value={newProduct.type} name="type" id="type" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">-- Please select one --</option>
                  {
                    CONFIG_CREATE_PRODUCT.PRODUCT_TYPE.select_value.map((value, i) => {
                      const select_input = CONFIG_CREATE_PRODUCT.PRODUCT_TYPE.select_input[i]
                      return (<option key={i} value={value}>{select_input}</option>)
                    })
                  }
                </select>

                {/* COLOR */}
                <label>Color</label>
                <select onChange={handleInputChange} value={newProduct.color} name="color" id="color" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value="">-- Please select one --</option>
                  {
                    CONFIG_CREATE_PRODUCT.PRODUCT_COLOR.select_value.map((value, i) => {
                      const select_input = CONFIG_CREATE_PRODUCT.PRODUCT_COLOR.select_input[i]
                      return (<option key={i} value={value}>{select_input}</option>)
                    })
                  }
                </select>

                {/* SIZE */}
                <label>Size</label>
                <input onChange={handleInputChange} value={newProduct.size} name="size" id="size" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" />

                {/* TAG */}
                <label>Tag</label>
                <div className="inline">
                  {tags}
                  {
                    checked
                      ?
                      <button onClick={() => handleAddTags(nowTag)} type="button" className="bg-transparent hover:bg-green-200 text-green-800 font-bold border border-gray-500 py-1 px-2 rounded inline-flex items-center">
                        <i className="fas fa-check"></i>
                        <span>Confirm</span>
                      </button>
                      :
                      <button onClick={() => handleAddTags(+1)} type="button" className="bg-transparent hover:bg-blue-500 text-gray-800 font-bold border border-gray-500 py-1 px-2 rounded inline-flex items-center">
                        <i className="fas fa-plus"></i>
                        <span>Add tag</span>
                      </button>
                  }
                </div>

                {/* Picture */}
                <label>Picture</label>
                <UploadForm handleReturnImage={handleReturnImage} images={newProduct.image} />
                {
                  newProduct.image?.map((url, i) => {
                    return <img key={i} src={url} alt="img" width="100" />
                  })
                }
                {/* Price */}
                <div className="inline">
                  <label>Price</label>
                  <input onChange={handleInputChange} value={newProduct.price} type="number" name="price" id="number" className="mt-5 shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                  <label>baht</label>
                  <label className="ml-4">Count</label>
                  <input onChange={handleInputChange} value={newProduct.count} type="number" name="count" id="count" className="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                </div>

                {/* Status */}
                <label >Status</label>
                <div className="inline">
                  <label className="inline-flex items-center mt-3">
                    <input onChange={handleInputChange} defaultChecked={newProduct.active} type="checkbox" className="form-checkbox h-5 w-5 text-green-600" name="active" /><span className="ml-2 text-gray-700">Active</span>
                  </label>
                </div>

                {/* Main save */}
                <button type="submit" className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-green-500 hover:border-transparent rounded w-max mb-5 mt-2">
                  Save Product
          </button>

                {/* Test Save Product Log data newProduct */}
                <button type="button" onClick={() => console.log(newProduct)} className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-green-500 hover:border-transparent rounded w-max">
                  Test Save Product
          </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>

  )
}
export default AdminProduct;
