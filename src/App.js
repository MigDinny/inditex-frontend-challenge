import logo from "./logo.svg";
import { useState } from "react";
import "semantic-ui-css/semantic.min.css";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Body from "./components/layout/Body";
import ProductList from "./components/pages/ProductList";
import ProductDetails from "./components/pages/ProductDetails";
import NotFound from "./components/pages/NotFound";

function App() {
    const [cartNumber, setCartNumber] = useState(0);
    const location = useLocation();

    //console.log(location.pathname.split("/")); // create breadcrumb component with a kind of prop

    return (
        <>
            <Header cartNumber={cartNumber}></Header>
            <main>
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={<Navigate to="/products" replace={true} />}
                    />

                    <Route
                        path="/products"
                        exact
                        element={
                            <Body>
                                <ProductList />
                            </Body>
                        }
                    />

                    <Route
                        path="/products/:productID"
                        element={
                            <Body>
                                <ProductDetails
                                    onCartNumberChange={setCartNumber}
                                />
                            </Body>
                        }
                    />

                    <Route
                        path="*"
                        element={
                            <Body>
                                <NotFound />
                            </Body>
                        }
                    />
                </Routes>
            </main>
        </>
    );
}

export default App;
