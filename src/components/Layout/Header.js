import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = (props) => {
    return (
        <div className={classes.container}>
            <header>
                <span className={classes["hidden-elem"]}></span>
                <span className={classes.title}>
                    <Link to="/">Mobile Shop</Link>
                </span>
                <span className={classes["number-items"]}>
                    {props.cartNumber}
                </span>
            </header>
        </div>
    );
};

export default Header;
