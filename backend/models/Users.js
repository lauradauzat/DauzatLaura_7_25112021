module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
    });
  
    Users.associate = (models) => {
      Users.hasMany(models.Posts, {
        //if you delete a User, delete the Posts related to this users 
        onDelete: "cascade", 
      });
      Users.hasMany(models.Comments, {
        //if you delete a User, delete the Posts related to this users 
        onDelete: "cascade", 
      });
    }
    return Users;
  };
  