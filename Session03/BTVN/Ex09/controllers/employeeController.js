const Employee = require("../models/Employee");
const AppError = require("../utils/AppError");

const getEmployees = async (req, res, next) => {
  try {
    const data = Employee.getAll();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      throw new AppError("Thiếu name hoặc email", 400);
    }

    const existing = Employee.findByEmail(email);
    if (existing) {
      throw new AppError("Email đã tồn tại", 409);
    }

    const newEmp = Employee.create({ name, email });
    res.status(201).json(newEmp);
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const emp = Employee.findById(req.params.id);
    if (!emp) {
      throw new AppError("Không tìm thấy nhân viên", 404);
    }
    res.json(emp);
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const emp = Employee.findById(req.params.id);
    if (!emp) {
      throw new AppError("Không tìm thấy nhân viên", 404);
    }
    if (!req.file) {
      throw new AppError("Vui lòng đính kèm file ảnh", 400);
    }

    const updatedEmp = Employee.updateAvatar(req.params.id, req.file.filename);
    res.json(updatedEmp);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  getEmployeeById,
  uploadAvatar,
};
