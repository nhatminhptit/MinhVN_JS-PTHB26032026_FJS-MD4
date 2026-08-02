const logger = require("./logger");
logger.info("Đây là log INFO từ app1 (Sẽ bị ẩn vì LOG_LEVEL đang là warn)");
logger.warn("Đây là log WARN từ app1");
