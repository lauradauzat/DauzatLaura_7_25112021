module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER, 
        allowNull: false
      }, 
    });
  

    return Likes;
  };
  