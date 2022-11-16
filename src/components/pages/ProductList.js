import useWindowDimensions from "../../hooks/use-window-dimensions";
import classes from "./ProductList.module.css";
import { Card, Image, Input, Loader, Dimmer, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";

const ProductList = () => {
    // Hooks and States
    const [productList, setProductList] = useState([]);
    const [filteredProductList, setFilteredProductList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const { isLoading, error: requestError, sendRequest } = useHTTP();
    const { width } = useWindowDimensions();
    const navigate = useNavigate();

    // lifecycle hooks
    useEffect(() => {
        const updateProductList = (data) => {
            setProductList(data);
            setFilteredProductList(data);
        };

        const reqConfig = {
            url: "https://front-test-api.herokuapp.com/api/product",
        };

        sendRequest(reqConfig, updateProductList);
    }, [sendRequest]);

    useEffect(() => {
        if (productList.length === 0) return;

        const filtered = productList.filter(
            (p) =>
                p.model.toLowerCase().includes(searchInput.toLowerCase()) ||
                p.brand.toLowerCase().includes(searchInput.toLowerCase())
        );

        const timer = setTimeout(() => {
            setFilteredProductList(filtered);
            console.log(filtered);
        }, 500);

        return () => {
            clearTimeout(timer); // cleanup function. clear timout in case useEffect gets called again within 500ms
        };
    }, [searchInput, productList]);

    // handlers
    const cardClickHandler = (productID) => {
        navigate("/products/" + productID);
    };

    // content variables
    let list_content = filteredProductList.map((p) => (
        <Card
            key={p.id}
            onClick={() => {
                cardClickHandler(p.id);
            }}
        >
            <Image dimmer className={classes.img} src={p.imgUrl} size="small" />

            <Card.Content>
                <Card.Header>{p.brand}</Card.Header>
                <Card.Meta>
                    <span>{p.model}</span>
                </Card.Meta>
                <Card.Description textAlign="right" className={classes.price}>
                    {p.price} €
                </Card.Description>
            </Card.Content>
        </Card>
    ));

    let items_per_row = 4;
    if (width < 1000) items_per_row = 3;
    if (width < 700) items_per_row = 2;
    if (width < 500) items_per_row = 1;

    return (
        <div className={classes.container}>
            <div className={classes["top-bar"]}>
                <Input
                    className={classes.search}
                    icon="search"
                    placeholder="Search..."
                    onChange={(e) => {
                        setSearchInput(e.currentTarget.value);
                    }}
                />
            </div>
            {isLoading && (
                <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
            )}

            {!isLoading && !requestError && (
                <Card.Group itemsPerRow={items_per_row}>
                    {list_content}
                </Card.Group>
            )}

            {!isLoading && requestError && (
                <center>
                    <Message compact negative className={classes.errorMessage}>
                        <Message.Header>Internal API Error</Message.Header>
                        <p>
                            There was an internal error with our API. Please try
                            again later.
                        </p>
                    </Message>
                </center>
            )}
        </div>
    );
};

export default ProductList;
