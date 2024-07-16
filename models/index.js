const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('postgres', 'postgres', '', {
	host: 'localhost',
	dialect: 'postgres',
})

const User = require('./user')(sequelize)
const Employee = require('./employee')(sequelize)

User.hasMany(Employee, { onDelete: 'CASCADE' })
Employee.belongsTo(User)

sequelize
	.sync()
	.then(() => console.log('Database & tables created!'))
	.catch(err => console.log('Error: ' + err))

module.exports = {
	sequelize,
	User,
	Employee,
}
