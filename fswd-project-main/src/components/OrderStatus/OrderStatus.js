import { useMemo } from "react";

const OrderStatus = (props) => {
  const orderRender = useMemo(
    () => {
      if (props.status === false) {
        return (
          <div className="grid grid-cols-12 py-8 px-4 lg:px-20 gap-x-4 lg:gap-y-8 ">
            <div className="col-span-3">
              <div className="order-i text-3xl lg:text-8xl text-red-500">
                <div className="border-4 border-red-500 rounded-full">
                  <i class="fas fa-money-bill-alt"></i>
                </div>
              </div>

            </div>
            <div className="flex col-span-6 justify-center items-center">
              <div className="bg-red-500 pt-1 w-11/12" id=""></div>
            </div>
            <div className="col-span-3">
              <div className="order-i text-3xl lg:text-8xl text-red-500">
                <div className="border-4 border-red-500 rounded-full">
                  <i class="fas fa-times-circle"></i>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex justify-center">
                <p className="text-xs lg:text-base text-center">ชำระเงินแล้ว</p>
              </div>
            </div>
            <div className="col-span-6"></div>
            <div className="col-span-3">
              <div className="flex justify-center">
                <p className="text-xs lg:text-base text-center"> ยกเลิกคำสั่งซื้อ</p>
              </div>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className="grid grid-cols-12 py-8 px-4 lg:px-20 gap-y-4 ">
            <div className="col-span-2 lg:col-span-1">
              <div className="order-i text-xl text-green-500">
                <div className="border-4 border-green-500 rounded-full">
                  <i class="fas fa-money-bill-alt"></i>
                </div>
              </div>
            </div>
            <div className="flex col-span-3 lg:col-span-5 justify-center items-center">
              <div className="bg-green-500 pt-1 w-11/12" id=""></div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className="order-i text-xl text-green-500">
                <div className="border-4 border-green-500 rounded-full">
                  <i class="fas fa-truck-moving"></i>
                </div>
              </div>
            </div>
            <div className="flex col-span-3 lg:col-span-4 justify-center items-center">
              <div className="bg-green-500 pt-1 w-11/12" id=""></div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className="order-i text-xl text-green-500">
                <div className="border-4 border-green-500 rounded-full">
                  <i class="fas fa-hand-holding"></i>
                </div>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 flex justify-center">
              <p className="text-xs text-center">ชำระเงินแล้ว</p>
            </div>
            <div className="col-span-5"></div>
            <div className="col-span-2 lg:col-span-1 flex justify-center">
              <p className="text-xs text-center">ที่ต้องจัดส่ง</p>
            </div>
            <div className="col-span-4"></div>
            <div className="col-span-2 lg:col-span-1 flex justify-center">
              <p className="text-xs text-center">ที่ต้องได้รับ</p>
            </div>

          </div>
        )
      }

    }
  )
  return (
    <div className="col-span-12">
      {orderRender}
    </div>
  )
}

export default OrderStatus;