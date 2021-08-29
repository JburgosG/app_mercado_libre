const fetch = require("node-fetch");

const getProductsByQuery = async (query) => {
    return await fetch(process.env.API_MELI_SEARCH + "?q=" + query + "&limit=4").then((resp) => {
        return resp.json();
    }).then((data) => {
        return data;
    });
};

const getProductById = async (id) => {
    return await fetch(process.env.API_MELI_ITEM + "/" + id).then((resp) => {
        return resp.json();
    }).then((data) => {
        return data;
    });
};

const getProductDescriptionById = async (id) => {
    return await fetch(process.env.API_MELI_ITEM + "/" + id + "/description").then((resp) => {
        return resp.json();
    }).then((data) => {
        return data;
    });
};

module.exports = {
    getProductById,
    getProductsByQuery,
    getProductDescriptionById
}