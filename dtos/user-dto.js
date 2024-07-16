class UserDto {
	id
	email
	password
	name

	constructor(model) {
		this.id = model.id
		this.email = model.email
		this.password = model.password
		this.name = model.name
	}
}

module.exports = UserDto
