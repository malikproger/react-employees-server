class EmployeeDto {
	id
	firstName
	lastName
	age
	address
	UserId

	constructor(model) {
		this.id = model.id
		this.firstName = model.firstName
		this.lastName = model.lastName
		this.age = model.age
		this.address = model.address
		this.UserId = model.UserId
	}
}

module.exports = EmployeeDto
