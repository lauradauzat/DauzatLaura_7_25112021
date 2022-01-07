module.exports = (sequelize, DataTypes) => {
    const Signalements = sequelize.define("Signalements", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      postId: {
        type: DataTypes.INTEGER, 
        allowNull: true
      }, 
      commentId: {
          type: DataTypes.INTEGER, 
          allowNull: true
      }
    });
  

    return Signalements;
  };
  