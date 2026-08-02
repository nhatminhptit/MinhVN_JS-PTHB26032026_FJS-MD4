require("dotenv").config();

let initCount = 0;
initCount++;

const levels = {
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevelStr = (process.env.LOG_LEVEL || "info").toLowerCase();
const currentWeight = levels[currentLevelStr] || 1;

const info = (msg) => {
  if (currentWeight <= levels.info) {
    console.log(`[INFO] ${msg}`);
  }
};

const warn = (msg) => {
  if (currentWeight <= levels.warn) {
    console.log(`[WARN] ${msg}`);
  }
};

const error = (msg) => {
  if (currentWeight <= levels.error) {
    console.log(`[ERROR] ${msg}`);
  }
};

module.exports = {
  info,
  warn,
  error,
  initCount,
};