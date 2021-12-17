module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    postText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING, 
      allowNull: true
    }, 
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      //if you delete a Post, delete the comments related to this posts 
      onDelete: "cascade", 
    });
  }
  return Posts;
};
