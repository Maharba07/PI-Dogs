const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Dogs",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://imagizer.imageshack.com/img923/3050/Pewblp.png",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altura: {
        type: DataTypes.FLOAT,
      },
      peso: {
        type: DataTypes.FLOAT,
      },
      años_vida: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
