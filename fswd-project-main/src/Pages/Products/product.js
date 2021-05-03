import { useLazyQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import Loading from '../../components/Loading/Loading';
import ProductCard from '../../components/productCard/ProductCard'
import { PRODUCT_QUERY_ALL } from '../../graphql/Product';

import inext from "../../icon/chevron-right-solid.svg"
import ProductDetail from './ProductsDetail/productSlug';

function Product() {
    const {path} = useRouteMatch()
    const [products, setProducts] = useState();
    const [getProduct, { loading, data }] = useLazyQuery(PRODUCT_QUERY_ALL);

  useEffect(() => {
    if (data?.products) {
      console.log(data?.products);
      setProducts(data?.products);
    }
  }, [data]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await getProduct();
      } catch (err) {
        console.log("error get product");
      }
    };
    loadData();
  }, [getProduct]);

  const onError = (e) => {
    e.target.src = "https://via.placeholder.com/100x100";
  };

  const productCards = useMemo(() => {
    if (loading) {
      return (
        <tr>
          <td>
            <Loading />
          </td>
        </tr>
      );
    }
    if (products) {
      return products?.map((product, i) => {
        return (
          <ProductCard numSpan="col-span-3 px-4 mt-4" data={product} key={i} />
        );
      });
    }
  }, [loading, products]);
    return (
        <div className="">
            <div className="flex justify-left item-center gap-x-2 h-10 py-2 px-2 font-light">
                <a className="hover:text-blue-600" href="/">หน้าแรก</a>
                <p> &gt; </p>
                <a className="underline hover:text-blue-600" href="/product">สินค้าทั้งหมด</a>
            </div>
            <hr></hr>

            {/* Filter */}
            <div className="flex items-center h-15 p-1 md:p-4 my-2 bg-gray-100 w-full">
                <h5 className="text-sm md:text-base mx-2 px-0.5 lg:px-5">แสดงตาม</h5>
                <button className="text-xs md:text-base bg-white text-black mx-2 px-0.5 lg:px-5 rounded border md:border-2 border-black">ขายดี</button>
                <button className="text-xs md:text-base bg-white text-black mx-2 px-0.5 lg:px-5 rounded border md:border-2 border-black">ล่าสุด</button>
                <button className="text-xs md:text-base bg-white text-black mx-2 px-0.5 lg:px-5 rounded border md:border-2 border-black">ลดราคา</button>
                <select className="text-xs md:text-base bg-white text-black x-2 px-0.5 lg:px-5 rounded border md:border-2 border-black">
                    <option>ราคา</option>
                    <option value="mintomax">ราคาน้อยไปมาก</option>
                    <option value="maxtomin">ราคามากไปน้อย</option>
                </select>
            </div>

            {/* products */}
            <div className="grid grid-cols-12 my-8">
                {productCards}
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
export default Product;