module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      postId: {
        type: DataTypes.INTEGER, 
        allowNull: true,
      }, 
    });
  

    return Likes;
  };
  