export default function add(a, b) {
  return a + b;
}

export const subtract = (a, b) => a - b;

export const multiply = (a, b) => a * b;

export const divide = (a, b) => {
  if (b === 0) {
    return "Lỗi: không thể chia cho 0";
  }
  return a / b;
};
