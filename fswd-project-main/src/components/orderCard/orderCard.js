import { useEffect, useState } from "react"

function OrderCard(props) {
    const [image, setImage] = useState([])

useEffect(()=>{
  setImage(props.data.image)
  console.log(props.data.image)
},[setImage])
    return (
        <div className="p-1">
            <div className="flex">
            <div id="image_product" className="col-span-8 image_product_order" alt="showing" style={{ '--img': `url(${image})` }}>
              </div>
                <div className="pl-3">
                    <h3 className="text-s">{props.data.name}</h3>
                    {console.log(props.data)}
                    <h6 className="text-xs font-light">{props.data.description}</h6>
                    <div className="flex justify-between items-baseline pt-9">
                        <h6 className="text-x">฿{props.data.price}</h6>
                        <h6 className="text-xs font-light">จำนวน : 1</h6>
                    </div>
                </div>
            </div>
            <div className="pt-2"><hr></hr></div>
        </div>
    )
}
export default OrderCard;