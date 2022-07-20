module.exports = {
    hello() {  // method name must match the query type name in schema.js
        return {
            text: 'Hello World!',
            views: 100
        };
    }
};
