const { Users } = require("../models");
const { Op } = require("sequelize");

const findUsers = async (req, res, next) => {
  try {
    const { userName, age, limit = 10, offset = 0 } = req.query;

    const condition = {};
    if (userName) condition.name = { [Op.iLike]: `%${userName}%` };
    if (age) condition.age = age;

    const users = await Users.findAll({
      attributes: ["name", "age"],
      where: condition,
      limit: limit,
      offset: offset,
    });

    const totalData = users.length;

    res.status(200).json({
      status: "Success",
      data: {
        totalData,
        users,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {}
};

const updateUser = async (req, res, next) => {
  const { name, age, role, address, shopId } = req.body;
  try {
    await Users.update(
      {
        name,
        age,
        role,
        address,
        shopId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update user",
    });
  } catch (err) {}
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete user",
    });
  } catch (err) {}
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
