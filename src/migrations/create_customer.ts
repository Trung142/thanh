import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('Customers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true, // Đảm bảo phone chỉ chứa số
        len: [10, 15],   // Ràng buộc độ dài số điện thoại
      },
    },
    cccd: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [9, 12], // Ràng buộc độ dài của cccd
      },
    },
    deleteYn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Đặt giá trị mặc định
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Đặt giá trị mặc định là thời gian hiện tại
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Đặt giá trị mặc định là thời gian hiện tại
    },
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('Customers');
}
