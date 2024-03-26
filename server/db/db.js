const Sequelize = require('sequelize')
const pkg = require('../../package.json')

// const databaseName =
//   pkg.name + (process.env.NODE_ENV === 'test' ? '_db_test' : '_db')
// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
//   {
//     dialect: 'postgres'
//     // logging: false
//   }
// )

const db = new Sequelize(
  // 'postgres://postgres:password@localhost:5432/krumble_db',
  'postgres://default:HwQ8POYM4eoS@ep-mute-limit-a4x68vx5.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This is optional. You can set it to 'true' if you'd like to enforce SSL certificates.
      }
    }
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
