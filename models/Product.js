module.exports = function (sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        price: {
            type: DataTypes.FLOAT(11),
            allowNull: false,
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        freezeTableName: true
    });
    return Product;
};
