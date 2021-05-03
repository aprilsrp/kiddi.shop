import ProductCard from '../../components/productCard/ProductCard'

import inext from "../../icon/chevron-right-solid.svg"

function Promotions() {
    return (
        <div className="">
            <div className="flex justify-left item-center gap-x-2 h-10 py-2 font-light">
                <a className="hover:text-blue-600" href="/">หน้าแรก</a>
                <p> &gt; </p>
                <a className="underline hover:text-blue-600" href="/promotions">โปรโมชัน</a>
            </div>
            <hr></hr>

            {/* Filter */}
            <div className="flex items-center h-15 p-4 my-2 px-2 bg-gray-100 w-full">
                <h5 className="text-sm md:text-base mx-2 px-0.5 lg:px-5">แสดงตาม</h5>
                <button className="text-xs md:text-base bg-white text-black mx-2 px-0.5 lg:px-5 rounded border md:border-2 border-black">1 แถม 1</button>
                <button className="text-xs md:text-base bg-white text-black mx-2 px-0.5 lg:px-5 rounded border md:border-2 border-black">ล่าสุด</button>
                <select className="text-xs md:text-base bg-white text-black mx-2 px-0.5 lg:px-5 rounded border md:border-2 border-black">
                    <option>ลดราคา</option>
                    <option value="mintomax">ลดราคาน้อยไปมาก</option>
                    <option value="maxtomin">ลดราคามากไปน้อย</option>
                </select>
                <select className="text-xs md:text-base bg-white text-black mx-2 px-0.5 lg:px-5 rounded border md:border-2 border-black">
                    <option>ประเภท</option>
                    <option value="">เสื้อ</option>
                    <option value="">กางเกง</option>
                    <option value="">กระโปรง</option>
                    <option value="">เครื่องประดับ</option>
                </select>
            </div>
            <div className="flex justify-center py-5">
                <h2 className="text-3xl font-bold">โปรโมชันพิเศษ</h2>
            </div>
            {/* products */}
            <div className="grid grid-cols-12 my-8">
                <ProductCard span="col-span-3 px-4 mt-4" />
                <ProductCard span="col-span-3 px-4 mt-4" />
                <ProductCard span="col-span-3 px-4 mt-4" />
                <ProductCard span="col-span-3 px-4 mt-4" />
                <ProductCard span="col-span-3 px-4 mt-4" />
                <ProductCard span="col-span-3 px-4 mt-4" />
                <ProductCard span="col-span-3 px-4 mt-4" />
                <ProductCard span="col-span-3 px-4 mt-4" />
            </div>

            {/* pagination */}
            <div className="flex justify-center items-center gap-x-5 py-4 ">
                {/* <button name="first" type="submit">FIRST</button> */}
                <button name="pre" type="submit">
                    <img alt="pre" className="w-5 transform rotate-180" src={inext} />
                </button>
                <p className="text-blue-600 text-l font-bold">1</p>
                <button name="next" type="submit">
                    <img alt="pre" className="w-5" src={inext} />
                </button>
                {/* <button className="hover:text-blue-600" name="last" type="submit">LAST</button> */}
            </div>
        </div>
    )
}
export default Promotions;