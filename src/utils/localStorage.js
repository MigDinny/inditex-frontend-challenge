export const getProductListFromLocalStorage = () => {
    // if timestamp doesnt exist or is not a number, or list doesnt exist
    if (
        localStorage.getItem("productListTimestamp") === null ||
        isNaN(localStorage.getItem("productListTimestamp")) ||
        localStorage.getItem("productList") === null
    ) {
        cleanProductListFromLocalStorage();
        return [];
    }

    // now check if timestamp is not within 60 minutes (3600000 ms)
    // in that case, return empty array and remove all items from local storage bcz they are invalid
    if (
        new Date().getTime() -
            parseInt(localStorage.getItem("productListTimestamp")) >
        3600000
    ) {
        cleanProductListFromLocalStorage();
        return [];
    }

    console.log("Fetching PRODUCT LIST from local storage...");

    // if all is good, return parsed product list
    return JSON.parse(localStorage.getItem("productList"));
};

export const saveProductListToLocalStorage = (data) => {
    localStorage.setItem("productList", JSON.stringify(data));
    localStorage.setItem(
        "productListTimestamp",
        JSON.stringify(new Date().getTime())
    );

    console.log("Saving PRODUCT LIST to local storage...");
};

const cleanProductListFromLocalStorage = () => {
    localStorage.removeItem("productList");
    localStorage.removeItem("productListTimestamp");
};

export const getProductFromLocalStorage = (id) => {
    let obj = JSON.parse(localStorage.getItem(id));

    if (obj === null || isNaN(obj.timestamp)) return null;

    if (new Date().getTime() - obj.timestamp > 3600000) {
        localStorage.removeItem(id);
        return null;
    }

    console.log("Fetching product " + id + " from local storage...");

    return obj;
};

export const saveProductToLocalStorage = (product) => {
    let timestamp = new Date().getTime();
    let obj = { ...product, timestamp };

    console.log("Saving product " + product.id + " to local storage...");
    localStorage.setItem(product.id, JSON.stringify(obj));
};
