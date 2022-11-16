import logo from "./logo.svg";
import classes from "./App.module.css"; // keep this import because it's being used
import { useState } from "react";
import "semantic-ui-css/semantic.min.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Layout/Header";
import ProductList from "./components/pages/ProductList";
import ProductDetails from "./components/pages/ProductDetails";
import NotFound from "./components/pages/NotFound";

function App() {
    const [cartNumber, setCartNumber] = useState(0);

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

                    <Route path="/products" exact element={<ProductList />} />

                    <Route
                        path="/products/:productID"
                        element={
                            <ProductDetails
                                onCartNumberChange={setCartNumber}
                            />
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
