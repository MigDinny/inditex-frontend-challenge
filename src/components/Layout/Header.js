import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className={classes.container}>
            <header>
                <span className={classes["hidden-elem"]}></span>
                <span className={classes.title}>
                    <Link to="/">Mobile Shop</Link>
                </span>
                <span className={classes["number-items"]}>3</span>
            </header>

            <p className={classes.breadcrumb}>Home / Products</p>
        </div>
    );
};

export default Header;
