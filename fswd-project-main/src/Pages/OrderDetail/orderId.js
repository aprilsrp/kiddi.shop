import ProductCard from '../../components/productCard/ProductCard'
import icartadd from "../../icon/cart-plus-solid.svg"

function orderId() {
    return (
        <div className="">
            <div className="grid grid-cols-12 mt-16">
                <div className="col-span-1 px-0 lg:px-4 flex flex-col justify-center items-center">
                    <img src="https://via.placeholder.com/122x122" class="py-1 cursor-pointer border-0 hover:border-black hover:border-2" alt="gallery image1"></img>
                    <img src="https://via.placeholder.com/122x122" class="py-1 cursor-pointer border-0 hover:border-black hover:border-2" alt="gallery image2"></img>
                    <img src="https://via.placeholder.com/122x122" class="py-1 cursor-pointer border-0 hover:border-black hover:border-2" alt="gallery image3"></img>
                </div>
                <div className="col-span-5 px-4">
                    <div className="grid grid-cols-12">
                        <div className="col-span-2 flex justify-center items-center">
                            <i className="fas fa-chevron-left"></i>
                        </div>
                        <img src="https://via.placeholder.com/608x800" class="col-span-8" alt="showing"></img>
                        <div className="col-span-2 flex justify-center items-center">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 px-4">
                    <div>
                        <h1 className="uppercase font-bold text-l lg:text-4xl">g-shock</h1>
                        <h3 className="py-1 lg:py-4">นาฬิกาข้อมือ รุ่น G-SHOCK GBD-H1000-1A4DR สีดำ</h3>
                        <h5 className="text-blue-600 text-l lg:text-2xl">฿550</h5>
                        <div className="grid grid-cols-12 py-4 lg:py-8">
                            <input className="col-span-12 mb-1 lg:col-span-4 py-1 mx-2 text-center border border-black hover:border-2" type="number" name="" id=""></input>
                            <button className="col-span-6  lg:col-span-4 py-1 mx-2 bg-white text-black border border-black flex justify-center items-center"><img src={icartadd} className="w-5" alt="card"/></button>
                            <button className="col-span-6  lg:col-span-4 py-1 mx-2 bg-black text-white border border-black">ซื้อทันที</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* end of image and basic order detail here */}
            {/* now description of product start */}
            <h2 className="pt-16">Details</h2>
            <hr></hr>
            <p className="text-xs lg:text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            {/* end of description here */}
            {/* recommended item here */}
            <h2 className="text-xl lg:text-3xl uppercase pt-16">other also bought</h2>
            <div className="grid grid-cols-12">
                <div className="flex justify-center items-center col-span-1">
                    <i className="fas fa-chevron-left"></i>
                </div>
                <div className="col-span-10 grid grid-cols-12 justify-items-center">
                    <ProductCard span="col-span-6 px-8 my-4" />
                    <ProductCard span="col-span-6 px-8 my-4" />
                </div>
                <div className="flex justify-center items-center col-span-1">
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>

        </div>
    )
}
export default orderId