/* const { allowedNodeEnvironmentFlags } = require("process");
const { createBrotliCompress } = require("zlib"); */
const connection = require("../config/connection");

/* function printQuestionMarks(num) {
    const arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?')
    }

    return arr.toString();
} */

function objToSql(ob) {
    const arr = [];

    for(const key in ob) {
        var value = ob[key];

        if(Object.hasOwnProperty.call(ob, key)) {
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                 value = `'${value}'`;
            }

            arr.push(`${key}=${value}`);
        }
    }

    return arr.toString();
}

const orm = {
    selectAll(tableInput, burgercb) {
        const queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, function(err, res) {
            if (err)
                throw err;
            burgercb(res);
        }); 
    },
    insertOne(table, vals, burgercb) {
            let queryString = `INSERT INTO ${table} (burger_name) VALUES (?)`;

            console.log(queryString);

            connection.query(queryString, vals, function(err, res) {
                if(err)
                    throw err;
                
                burgercb(res);
            });
    },
    updateOne(table, objColVals, condition, burgercb) {
        let queryString = `UPDATE ${table}`;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function(err, res){
            if(err)
                throw err;

            burgercb(res);
        });
    },
    delete(table, condition, burgercb) {
        let queryString = `DELETE FROM ${table}`;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err)
                throw err;

            burgercb(result);
        })
    }
};

module.exports = orm;