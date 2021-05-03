function CartCard() {
    return (
        <div className="pt-5">
            <div className=" grid grid-cols-7"><hr className="col-span-7"></hr></div>
            <div className=" grid grid-cols-7">
                <img src="https://via.placeholder.com/200x200" className="pt-5" alt="productCart"></img>
                <div className="col-span-3 pt-5 px-10">
                    <h3 className="text-3xl">PHILIPS</h3>
                    <h6 className="text-s font-light pt-3">เมาส์ ฟิลิปส์ รุ่น SPK7504 Wireless Mouse สีดำ</h6>
                </div>
                <div className="pt-5">
                    <h3 className="text-2xl font-light line-through text-gray-400">฿1,250</h3>
                    <h3 className="text-2xl font-light pt-3">฿550</h3>
                </div>
                <div className="pt-5">
                    <div>
                        <button className="text-2xl text-gray-400" type="button">-</button>
                        <span className="text-2xl px-2">1</span>
                        <button className="text-2xl hover:text-blue-600" type="button">+</button>
                    </div>
                    <h4 className="text-xs font-light text-gray-400 underline pt-3 hover:text-black px-2" type="button">เอาออก</h4>
                </div>
                <div className="pt-5">
                    <h3 className="text-2xl font-semibold text-blue-600">฿550</h3>
                </div>
            </div>
        </div>
    )
}
export default CartCard