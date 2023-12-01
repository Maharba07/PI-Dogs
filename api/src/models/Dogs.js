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
      imagen: {
        type: DataTypes.STRING,
        defaultValue:
          "https://imagizer.imageshack.com/img922/483/YkZczi.jpg",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altura: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      peso: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      años_vida: {
        type: DataTypes.STRING,
        defaultValue:"12 años"
        
      },
    },
    { timestamps: false }
  );
};
