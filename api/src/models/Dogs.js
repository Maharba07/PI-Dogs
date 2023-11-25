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
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcolormadehappy.com%2Fweb-stories%2Fdraw-cute-dog-story%2F&psig=AOvVaw0BJQsjHGgg7rcg0KgZRhJg&ust=1700689830602000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjwj7uJ1oIDFQAAAAAdAAAAABAF",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      altura: {
        type: DataTypes.FLOAT,
        //allowNull: false,
      },
      peso: {
        type: DataTypes.FLOAT,
        //allowNull: false,
      },
      años_vida: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
