import { Link, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min"

const CustomerOrders = () => {
  const {path} = useRouteMatch()
  return (
    <div>
      {/* Link below have to put to orderId */}
      <Link to={`${path}/detail/${Math.random()}`}>
      <hr></hr>
      <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 py-4">
        <div className="col-span-3">
          <img src="https://via.placeholder.com/200x200" alt="change-to-product-name-var"></img>
        </div>
        <div className="col-span-7 flex flex-col justify-between">
          <div>
            <h2 className="text-sm lg:text-base">Phillips</h2>
            <span className="text-sm lg:text-base">เมาส์ บลา บลา บลา บลา</span>
          </div>
          <p className="text-end text-sm lg:text-base">หมายเลขคำสั่งซื้อ: ใส่ตรงนี้งับ</p>
        </div>
        <div className="col-span-2 flex flex-col">
          <span className="line-through text-gray-400 text-sm lg:text-base">฿1250</span>
          <span className="py-2 text-sm lg:text-base">฿550</span>
        </div>
      </div>
      </Link>
    </div>
  );
};
export default CustomerOrders;
