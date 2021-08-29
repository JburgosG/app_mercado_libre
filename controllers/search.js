const messages = require('../config/messages');
const { getProductsByQuery, getProductById, getProductDescriptionById } = require('../services');

/**
 * Search products by keywords
 * @param {*} request 
 * @param {*} response 
 */
const products = async (request, response) => {
    
    var query = request.query.q;

    if (query) {
        let items = await getProductsByQuery(removeSpecialCharacters(query));
        
        if (products) {
            let searchResult = await processData(items);
        
            return response.status(200).json({
                code: 200,
                data: searchResult
            });
        }
    }

    return response.status(400).json({
        code: 400,
        error: messages.products.empty_query
    });
}

/**
 * Process data to prepare the response
 * @param {*} data 
 * @returns { author: Object, categories: Object, items: Array}
 */
const processData = async (data) => {

    var items = new Array();
    const json = { author: getAuthor() };

    if (data.results) {
        let picture = null;
        let description = null;
        let itemCondition = null;
        let results = data.results;

        for (item in results) {
            let row = results[item];

            picture = row.thumbnail;
            description = row.plain_text;
            itemCondition = row.attributes.find(
                item => item.id === 'ITEM_CONDITION'
            );

            items.push(mappingResponse(row, itemCondition, picture, description));
        }

        json.categories = getCategories(data.filters);
        json.items = items;
    }
  
    return json;
}

function mappingResponse(row, condition, picture, description) {
    return {
        id: row.id,
        title: row.title,
        price: {
          currency: row.currency_id,
          amount: row.price.toFixed(0),
          decimals: row.price % 1
        },
        picture,
        condition,
        city: row.address && row.address.city_name,
        free_shipping: row.shipping && row.shipping.free_shipping,
        sold_quantity: row.sold_quantity,
        description
    }
}

/**
 * Set the Author value
 * @returns {{name: string, lastname: string}}
*/
function getAuthor() {
    return { name: 'Jairo', lastname: 'Burgos Guarín' };
}

/**
 * Set the Categories value
 * @param filters
 * @returns {Array}
*/
function getCategories(filters) {
    let categories = [];
    const data = !!filters[0] ? filters[0] : {};

    if (Object.keys(data).length !== 0) {
        if (!!filters && data.values.length && data.values[0].path_from_root.length) {
            categories = data.values[0].path_from_root.map((category) => {
                return category.name;
            });
        }
    }    

    return categories;
}

/**
 * Search a product by id
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const getProduct = async (request, response) => {
    
    var id = request.params.id;

    if (id) {
        var _id = removeSpecialCharacters(id);
        var productById = await getProductById(_id);
        var description = await getProductDescriptionById(_id);        

        if (productById.status != 404 && description.status != 404) {
            let picture = productById.pictures.length && productById.pictures[0].url;
            var resp = mappingResponse(productById, productById.condition, picture, description.plain_text);

            return response.status(200).json({
                code: 200,
                data: resp
            });
        } else {
            return response.status(400).json({
                code: 404,                
                message: messages.products.all.not_exist
            });
        }
    }

    return response.status(400).json({
        code: 400,
        error: messages.products.empty_query
    });
}

/**
 * Replace 
 * @param {*} str 
 * @returns 
 */
function removeSpecialCharacters(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '');
}

module.exports = {
    products,
    getProduct
}