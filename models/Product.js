module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purchasePrice: {
      field: 'purchase_price',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellingPrice: {
      field: 'selling_price',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ImageUrl: {
      field: 'image_url',
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'products',
  });

  return Product;
};
