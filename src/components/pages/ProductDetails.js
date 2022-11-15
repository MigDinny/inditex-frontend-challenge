import classes from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
    Grid,
    Image,
    Placeholder,
    Button,
    Icon,
    Dropdown,
} from "semantic-ui-react";

const colorsAvailable = [
    {
        key: "white",
        text: "White",
        value: "white",
    },
    {
        key: "red",
        text: "Red",
        value: "red",
    },
    {
        key: "orange",
        text: "Orange",
        value: "orange",
    },
];

const storageAvailable = [
    { key: "128gb", text: "128gb", value: "128gb" },
    { key: "256gb", text: "256gb", value: "256gb" },
    { key: "512gb", text: "512gb", value: "512gb" },
];

const productObject = {
    id: "p1",
    imgSrc: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    brand: "Asus",
    model: "a541u",
    price: "159.99",
    ram: "4gb",
    os: "windows 10",
    resolution: "1920x1080",
    battery: "5400mAh",
    camera: "10 mpx",
    size: '15.6"',
    weight: "1.3kg",
};

const ProductDetails = () => {
    const [loading, setLoading] = useState(true);
    let { productID } = useParams();

    return (
        <div className={classes.container}>
            <Grid columns={2} stackable textAlign="center">
                <Grid.Row>
                    <Grid.Column>
                        {loading && (
                            <Placeholder>
                                <Placeholder.Image square />
                            </Placeholder>
                        )}

                        {!loading && (
                            <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
                        )}
                    </Grid.Column>
                    <Grid.Column>
                        {loading && (
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

                        {!loading && (
                            <>
                                <div className={classes.description}>
                                    <h4>Description</h4>
                                    <p>
                                        <b>Brand:</b> {productObject.brand}
                                    </p>
                                    <p>
                                        <b>Model:</b> {productObject.model}
                                    </p>
                                </div>
                                <div className={classes.actions}>
                                    <Dropdown
                                        placeholder="Select Storage"
                                        fluid
                                        selection
                                        options={storageAvailable}
                                        defaultValue="128gb"
                                    />
                                    <br></br>
                                    <Dropdown
                                        placeholder="Select Color"
                                        fluid
                                        selection
                                        options={colorsAvailable}
                                        defaultValue="red"
                                    />
                                    <br></br>
                                    <Button animated="vertical">
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
