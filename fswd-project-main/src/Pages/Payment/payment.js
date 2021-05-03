import OrderCard from "../../components/orderCard/orderCard"

import ipayondelivery from "../../icon/awesome-hand-holding-usd.svg"
import icreditcard from "../../icon/material-credit-card.svg"
import ipaypal from "../../icon/simple-paypal.svg"
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import { PRODUCT_QUERY } from "../../graphql/Product";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Payment() {
    const { productId } = useParams()
    const [product, setNewProduct] = useState({})
    const [getProduct, { loading }] = useLazyQuery(PRODUCT_QUERY, {
        variables: { productId },
        onCompleted: data => {
            setNewProduct(data.productById)
        }
    });
    useEffect(() => {
        getProduct()
    }, [getProduct]);
    useEffect(() => {
        console.log(productId)
    }, [productId])

    const productSummary = useMemo(() => {
        if (loading) {
          return (
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          );
        }
        if (product) {
          return(
            console.log(product.name)
          )
        }
      }, [loading, product]);
    return (
        <div className="">
            <div className="flex justify-center">
                <h2 className="text-2xl lg:text-3xl font-bold py-4 lg:py-12">การชำระเงิน</h2>
            </div>

            <div className="grid grid-cols-12 gap-x-4 pb-20">
                <div className="col-span-12 lg:col-span-8">
                    <hr></hr>
                    <div className="py-5">
                        <h3 className="text-xl">เลือกวิธีการชำระเงิน</h3>
                        {/* Pay On Delivery */}
                        <div className="flex gap-x-5 items-center w-11/12 h-24 border border-gray-200 mt-5">
                            <img src={ipayondelivery} alt="PayOnDeliveryIcon" className="h-24 w-24 p-5 border border-gray-200"></img>
                            <label className="text-xl"><input type="radio" className=""></input>Pay On Delivery</label>
                            
                        </div>
                        <div className="flex justify-end w-11/12 h-20 p-5 bg-gray-200">
                            <label className="bg-black text-white w-1/3 py-2 rounded px-2 text-center">
                            <Link to="/customer">
                                <button className="">ชำระเงิน</button>
                            </Link>
                            </label>
                        </div>
                        {/* Credit Card */}
                        <div className="flex gap-x-5 items-center w-11/12 h-24 border border-gray-200 mt-5 bg-gray-200 opacity-20">
                            <img src={icreditcard} alt="PayOnDeliveryIcon" className="h-24 w-24 p-5 border border-gray-200"></img>
                            <input type="radio" disabled></input>
                            <label className="text-xl">Credit Card</label>
                        </div>
                        <div className="flex justify-end w-11/12 h-20 p-5 bg-gray-200 opacity-20">
                            <button className="bg-black text-white w-1/3 py-2 rounded px-2 cursor-not-allowed" >ชำระเงิน</button>
                        </div>
                        {/* Paypal */}
                        <div className="flex gap-x-5 items-center w-11/12 h-24 border border-gray-200 mt-5 bg-gray-200 opacity-20">
                            <img src={ipaypal} alt="PayOnDeliveryIcon" className="h-24 w-24 p-5 border border-gray-200"></img>
                            <input type="radio" disabled></input>
                            <label className="text-xl">Paypal</label>
                        </div>
                        <div className="flex justify-end w-11/12 h-20 p-5 bg-gray-200 opacity-20">
                            <button className="bg-black text-white w-1/3 py-2 rounded px-2 cursor-not-allowed">ชำระเงิน</button>
                        </div>
                    </div>
                </div>

                {/*order summary*/}
                <div className="col-span-12 lg:col-span-4 px-2">
                    <div className="flex justify-between w-full bg-blue-600 p-3">
                        <h4 className="text-xs text-white font-semibold">ที่อยู่</h4>
                        <h4 className="text-xs font-light text-gray-100 underline hover:text-black px-2" type="button">แก้ไข</h4>
                    </div>
                    <div className="border border-gray-200 p-3">
                        <h6 className="text-xs font-bold">ที่อยู่การจัดส่ง</h6>
                        <p className="text-xs pt-3">129/158, ขุมทอง, ลาดกระบัง, กรุงเทพมหานคร, 10520</p>
                        <p className="text-xs">0824200568</p>
                    </div>
                    <div className="flex justify-between w-full bg-blue-600 p-3">
                        <h4 className="text-xs text-white font-semibold">สรุปคำสั่งซื้อ</h4>
                        <h4 className="text-xs font-light text-gray-100 underline hover:text-black px-2" type="button">แก้ไข</h4>
                    </div>
                    <div className="overflow-auto h-60 h+10 border border-gray-200 p-3">
                        <OrderCard data={product}/>
                    </div>
                    <div className="flex justify-between w-full bg-blue-600 p-3">
                        <h4 className="text-xs text-white font-semibold">สรุปยอดชำระเงิน</h4>
                    </div>
                    <div className="grid grid-cols-2 border border-gray-200 p-3">
                        <h6 className="text-xs font-semibold pt-3">ยอดรวม</h6>
                        <h6 className="text-xs font-semibold pt-3 text-right">฿{product.price}</h6>
                        <h6 className="text-xs font-light pt-3">การจัดส่ง</h6>
                        <h6 className="text-xs font-light pt-3 text-right text-green-700">ฟรี</h6>
                        <div className="col-span-2 py-3"><hr></hr></div>
                        <h6 className="text-s font-semibold">ยอดชำระสุทธิ</h6>
                        <h6 className="text-s font-semibold text-blue-600 text-right">฿{product.price}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Payment;