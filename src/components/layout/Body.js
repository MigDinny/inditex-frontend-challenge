import classes from "./Body.module.css";
import { Link } from "react-router-dom";

const Body = (props) => {
    return (
        <div className={classes.container}>
            <p className={classes.breadcrumb}></p>
            {props.children}
        </div>
    );
};

export default Body;
