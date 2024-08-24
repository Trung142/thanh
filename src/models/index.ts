import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, '../config/config.ts');
const config = require(configPath).default[env];

const db: { [key: string]: any } = {};

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Đọc tất cả các tệp mô hình trong thư mục này, bỏ qua tệp index.ts

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach(async (file) => {
    try {
      const modelPath = path.join(__dirname, file);
      const model = (await import(modelPath)).default;
      if (model && model.name) {
        db[model.name] = model;
      } else {
        console.warn(`Model in file ${file} does not export correctly`);
      }
    } catch (error) {
      console.error(`Error importing model from file ${file}:`, error);
    }
  });

// Thiết lập các mối quan hệ giữa các mô hình nếu có
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
