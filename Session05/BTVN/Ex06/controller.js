const { Op } = require("sequelize");
const Product = require("./Product");

const getProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10, keyword, sort } = req.query;

    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(limit) || limit <= 0) limit = 10;
    if (limit > 50) limit = 50;

    const offset = (page - 1) * limit;
    const whereClause = {};

    if (keyword) {
      whereClause.name = {
        [Op.like]: `%${keyword}%`,
      };
    }

    let orderClause = [["id", "DESC"]];
    if (sort === "price_asc") {
      orderClause = [["price", "ASC"]];
    } else if (sort === "price_desc") {
      orderClause = [["price", "DESC"]];
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      order: orderClause,
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      success: true,
      data: rows,
      meta: {
        page: page,
        limit: limit,
        total: count,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

module.exports = { getProducts };
