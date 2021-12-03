module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Users.associate = (models) => {
      Users.hasMany(models.Posts, {
        //if you delete a User, delete the Posts related to this users 
        onDelete: "cascade", 
      });
    }
    return Users;
  };
  