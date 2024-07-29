const EmployeeDto = require('../dtos/employee-dto');
const { Employee } = require('../models');

/**
 * @route GET /api/employees
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
  try {
    const employees = await Employee.findAll();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить сотрудников' });
  }
};

/**
 * @route POST /api/employees/add
 * @desc Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: 'Все поля обязательные' });
    }

    const employee = await Employee.create({
      ...data,
      UserId: req.user.id,
    });

    const employeeDto = new EmployeeDto(employee);

    return res.status(201).json(employeeDto);
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
};

/**
 * @route POST /api/employees/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await Employee.destroy({
      where: {
        id,
      },
    });

    res.status(204).json('OK');
  } catch {
    res.status(500).json({ message: 'Не удалось удалить сотрудника' });
  }
};

/**
 * @route PUT /api/employees/edit/:id
 * @desc Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await Employee.update(data, {
      where: {
        id,
      },
    });

    res.status(204).json('OK');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Не удалось редактировать сотрудника' });
  }
};

/**
 * @route GET /api/employees/:id
 * @desc Получение сотрудника
 * @access Private
 */
const employee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne({
      where: {
        id,
      },
    });

    const employeeDto = new EmployeeDto(employee);

    res.status(200).json(employeeDto);
  } catch {
    res.status(500).json({ message: 'Не удалось получить сотрудника' });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employee,
};
