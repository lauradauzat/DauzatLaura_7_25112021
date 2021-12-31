module.exports = (sequelize, DataTypes) => {
    const Signalements = sequelize.define("Signalements", {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
  

    return Signalements;
  };
  