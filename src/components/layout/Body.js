import classes from "./Body.module.css";
import { Link } from "react-router-dom";

const Body = (props) => {
    let breadcrumb_content = props.breadcrumb.map((b) => {
        return (
            <>
                <Link to={b[1]}> {b[0]}</Link> /
            </>
        );
    });

    console.log(breadcrumb_content);

    return (
        <div className={classes.container}>
            <p className={classes.breadcrumb}>{breadcrumb_content}</p>
            {props.children}
        </div>
    );
};

export default Body;
