import { Route, Switch, useRouteMatch } from "react-router";
import Product from "./product";
import ProductDetail from "./ProductsDetail/productSlug";

const ProductHandle = () => {
    const {path} = useRouteMatch()
    return(
        <Switch>
            <Route exact path={`${path}`}>
                <Product />
            </Route>
            <Route path={`${path}/detail/:productId`}>
                <ProductDetail/>
            </Route>
        </Switch>
    )
}
export default ProductHandle;