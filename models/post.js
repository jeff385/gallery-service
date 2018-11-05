module.exports = (sequelize, DataTypes) => (
  sequelize.define('post', {
    img: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true
  })
)
