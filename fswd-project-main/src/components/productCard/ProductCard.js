import icartadd from "../../icon/cart-plus-solid.svg"
import { Link, Switch, useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductCard(props) {
  const onError = (e) => {
    e.target.src = `https://picsum.photos/398/500/?${Math.random()}`
  }
  const [image, setImage] = useState([])

useEffect(()=>{
  setImage(props.data.image)
  console.log(props.data.image)
},[setImage])
  return (
    <div className={props.numSpan}>
      <Link to={`/product/detail/${props.data?._id}`} onClick={()=>{window.location.href=`/product/detail/${props.data?._id}`}}>
      <div id="image_product" onError={onError} className="col-span-8 image_product" alt="showing" style={{ '--img': `url(${image[0]})` }}>
              </div>
      <h3 className="px-2 text-xl lg:text-2xl mt-6">{props.data?.name}</h3>
      <h4 className="px-2 text-opacity-70 pd-d">{props.data?.description}</h4>
      <h5 className="px-2 text-xl lg:text-2xl mb-6 text-red-600">{props.data?.price}฿</h5>
      <div className="flex">
        <button className="bg-white text-black w-full mx-2 py-2 rounded border-2 border-black flex justify-center">
          <img src={icartadd} className="w-5" alt="card"/>
        </button>
        <button className="text-xs md:text-ms lg:text-base bg-black text-white w-full mx-2 py-2 rounded">ซื้อทันที</button>
      </div>
      </Link>
    </div>
  )
}
export default ProductCard