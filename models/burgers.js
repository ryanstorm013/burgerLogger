const { createBrotliCompress } = require('zlib');
const orm = require('../config/orm');

const burger= {
    selectAll(burgercb) {
        orm.selectAll('burgers', function(result) {
            burgercb(result);
        });
    },
    insertOne(vals, burgercb) {
        orm.insertOne("burgers", vals, function(result) {
            burgercb(result);
        });
    },
    updateOne(objColVals, condition, burgercb) {
        orm.updateOne("burgers", objColVals, condition, function(result){
            burgercb(result);
        });
    },
    delete: function(condition, burgercb) {
        orm.delete("burgers", condition, function(result) {
            burgercb(result);
        });
    }
};

module.exports = burger;