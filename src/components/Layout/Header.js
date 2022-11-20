import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const Header = (props) => {
    return (
        <div className={classes.container}>
            <header>
                <span className={classes["hidden-elem"]}></span>
                <span className={classes.title}>
                    <Link to="/">Mobile Shop</Link>
                </span>
                <div className={classes["number-items"]}>
                    <span className={classes.number}>{props.cartNumber}</span>
                    <Icon name="shopping cart" />
                </div>
            </header>
        </div>
    );
};

export default Header;
