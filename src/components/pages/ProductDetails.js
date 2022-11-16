import classes from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useHTTP from "../../hooks/use-http";

import {
    Grid,
    Image,
    Placeholder,
    Button,
    Icon,
    Dropdown,
} from "semantic-ui-react";

const ProductDetails = (props) => {
    // hooks and states
    let { productID } = useParams();
    const { isLoading, error: requestError, sendRequest } = useHTTP();
    const {
        isLoading: isAddToCartLoading,
        error: addToCartError,
        sendRequest: sendAddToCart,
    } = useHTTP();
    const [product, setProduct] = useState(null);
    const [colorNotSelected, setColorNotSelected] = useState(false);
    const [storageNotSelected, setStorageNotSelected] = useState(false);
    const colorRef = useRef();
    const storageRef = useRef();

    // lifecycle hooks
    useEffect(() => {
        const updateProduct = (data) => {
            let temp = {
                id: data.id,
                imgUrl: data.imgUrl,
                brand: data.brand,
                model: data.model,
                price: data.price,
                ram: data.ram,
                os: data.os,
                resolution: data.displaySize,
                battery: data.battery,
                camera: data.primaryCamera[0],
                size: data.displayResolution,
                weight: data.weight,
                colorsAvailable: data.options.colors.map((c) => ({
                    key: c.code,
                    value: c.name,
                    text: c.name,
                })),
                storageAvailable: data.options.storages.map((s) => ({
                    key: s.code,
                    value: s.name,
                    text: s.name,
                })),
            };
            setProduct(temp);
        };

        const reqConfig = {
            url:
                "https://front-test-api.herokuapp.com/api/product/" + productID,
        };

        sendRequest(reqConfig, updateProduct);
    }, [sendRequest, productID]);

    // handlers
    const addHandler = () => {
        if (colorRef.current.state.value.length === 0)
            setColorNotSelected(true);

        if (storageRef.current.state.value.length === 0)
            setStorageNotSelected(true);

        if (
            storageRef.current.state.value.length === 0 ||
            colorRef.current.state.value.length === 0
        )
            return;

        const reqBody = {
            id: productID,
            colorCode:
                product.colorsAvailable[colorRef.current.state.selectedIndex]
                    .key,
            storageCode:
                product.storageAvailable[storageRef.current.state.selectedIndex]
                    .key,
        };

        const reqConfig = {
            url: "https://front-test-api.herokuapp.com/api/cart",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Connection: "keep-alive",
            },
            body: reqBody,
        };

        const updateCartNumber = (data) => {
            props.onCartNumberChange(data.count);
        };

        // send request to add to cart
        sendAddToCart(reqConfig, updateCartNumber);
    };

    return (
        <div className={classes.container}>
            <Grid columns={2} stackable textAlign="center">
                <Grid.Row>
                    <Grid.Column>
                        {isLoading && (
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                        )}

                        {!isLoading && product != null && (
                            <Image size="medium" src={product.imgUrl} />
                        )}
                    </Grid.Column>
                    <Grid.Column>
                        {isLoading && product == null && (
                            <>
                                <Placeholder>
                                    <Placeholder.Paragraph>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                        <Placeholder.Line length="short" />
                                        <Placeholder.Line length="long" />
                                        <Placeholder.Line length="medium" />
                                        <Placeholder.Line />
                                        <Placeholder.Line length="very short" />
                                        <Placeholder.Line />
                                        <Placeholder.Line length="medium" />
                                        <Placeholder.Line />
                                        <Placeholder.Line length="long" />
                                        <Placeholder.Line length="very long" />
                                        <Placeholder.Line />
                                        <Placeholder.Line length="short" />
                                        <Placeholder.Line />
                                        <Placeholder.Line length="medium" />
                                        <Placeholder.Line length="long" />
                                        <Placeholder.Line length="short" />
                                    </Placeholder.Paragraph>
                                </Placeholder>
                                <br></br>
                                <Button disabled>Add</Button>
                            </>
                        )}

                        {!isLoading && product != null && (
                            <>
                                <div className={classes.description}>
                                    <h4>Description</h4>
                                    <p>
                                        <b>Brand:</b> {product.brand}
                                    </p>
                                    <p>
                                        <b>Model:</b> {product.model}
                                    </p>
                                    <p>
                                        <b>RAM:</b> {product.ram}
                                    </p>
                                    <p>
                                        <b>OS:</b> {product.os}
                                    </p>
                                    <p>
                                        <b>Resolution:</b> {product.resolution}
                                    </p>
                                    <p>
                                        <b>Battery:</b> {product.battery}
                                    </p>
                                    <p>
                                        <b>Camera:</b> {product.camera}
                                    </p>
                                    <p>
                                        <b>Size:</b> {product.size}
                                    </p>
                                    <p>
                                        <b>Weight:</b> {product.weight}g
                                    </p>
                                </div>
                                <br></br>
                                <div className={classes.actions}>
                                    <Dropdown
                                        className={
                                            storageNotSelected &&
                                            classes.selectError
                                        }
                                        placeholder="Select Storage"
                                        fluid
                                        selection
                                        options={product.storageAvailable}
                                        defaultValue={
                                            product.storageAvailable.length ===
                                            1
                                                ? product.storageAvailable[0]
                                                      .value
                                                : ""
                                        }
                                        ref={storageRef}
                                        onChange={() => {
                                            setStorageNotSelected(false);
                                        }}
                                    />
                                    <br></br>
                                    <Dropdown
                                        className={
                                            colorNotSelected &&
                                            classes.selectError
                                        }
                                        placeholder="Select Color"
                                        fluid
                                        selection
                                        options={product.colorsAvailable}
                                        defaultValue={
                                            product.colorsAvailable.length === 1
                                                ? product.colorsAvailable[0]
                                                      .value
                                                : ""
                                        }
                                        ref={colorRef}
                                        onChange={() => {
                                            setColorNotSelected(false);
                                        }}
                                    />
                                    <br></br>
                                    <Button
                                        animated="vertical"
                                        onClick={addHandler}
                                    >
                                        <Button.Content hidden>
                                            Add
                                        </Button.Content>
                                        <Button.Content visible>
                                            <Icon name="shop" />
                                        </Button.Content>
                                    </Button>
                                </div>
                            </>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default ProductDetails;
