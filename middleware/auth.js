const jwt = require('jsonwebtoken');
const { User } = require('../models');
const UserDto = require('../dtos/user-dto');

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });

    const userDto = new UserDto(user);

    req.user = userDto;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Не авторизован' });
  }
};

module.exports = {
  auth,
};
