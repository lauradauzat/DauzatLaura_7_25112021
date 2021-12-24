module.exports = (sequelize, DataTypes) => {
    const Partages = sequelize.define("Partages", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER, 
        allowNull: false
      }, 
      commentId: {
          type: DataTypes.INTEGER, 
          allowNull: true
      }
    });
  

    return Partages;
  };
  