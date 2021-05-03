import CartItem from '../../components/cartItem/CartItem'

const Cart = () => {
    return (
        <div className="">
            <div className="flex justify-center">
                <h2 className="text-2xl lg:text-3xl font-bold py-4 lg:py-12">ตะกร้าของคุณ</h2>
            </div>
            <div>
                {/* table header */}
                <div className="grid grid-cols-12 gap-x-4">
                    <div className="col-span-12 lg:col-span-9">
                        <div className="grid grid-cols-12">
                            <div className="col-span-6 py-4">
                                <p>สินค้า</p>
                            </div>
                            <div className="hidden lg:block col-span-2 text py-4 text-center ">
                                <p>ราคาต่อชิ้น</p>
                            </div>
                            <div className="hidden lg:block col-span-2 text py-4 text-center ">
                                <p>จำนวน</p>
                            </div>
                            <div className="hidden lg:block col-span-2 text py-4 text-center ">
                                <p>ราคารวม</p>
                            </div>
                        </div>
                        <CartItem />
                    </div>
                    <div className="col-span-12 lg:col-span-3 border border-black flex flex-col justify-center">
                        <div className="flex justify-between px-4 py-2">
                            <p>2 ชิ้น</p>
                            <p>฿1,100</p>
                        </div>
                        <div className="flex justify-between px-4 py-2">
                            <p>ส่วนลดพิเศษ</p>
                            <p>฿0</p>
                        </div>
                        <div className="flex justify-between px-4 py-2">
                            <p className="font-bold">จำนวนเงินทั้งหมด</p>
                            <p className="text-blue-500">฿1,100</p>
                        </div>
                        <button className="px-8 py-2 mx-4 bg-black text-white my-4">ดำเนินการชำระเงิน</button>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Cart;
