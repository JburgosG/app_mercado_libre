const fetch = require("node-fetch");

const getProductsByQuery = async (query) => {
    let endpoint = buildUrl(process.env.API_MELI_SEARCH + "?q=" + query + "&limit=4");
    return await fetch(endpoint).then((resp) => {
        return resp.json();
    }).then((data) => {
        return data;
    });
};

const getProductById = async (id) => {
    let endpoint = buildUrl(process.env.API_MELI_ITEM + "/" + id);
    return await fetch(endpoint).then((resp) => {
        return resp.json();
    }).then((data) => {
        return data;
    });
};

const getProductDescriptionById = async (id) => {
    let endpoint = buildUrl(process.env.API_MELI_ITEM + "/" + id);
    return await fetch(endpoint).then((resp) => {
        return resp.json();
    }).then((data) => {
        return data;
    });
};

const buildUrl = (url) => {
    return new URL(url);
}

module.exports = {
    getProductById,
    getProductsByQuery,
    getProductDescriptionById
}