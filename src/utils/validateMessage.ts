export const validateMessage = () => {
  return {
    required: "Trường này không được bỏ trống",
    types: {
      email: "Email không đúng định dạng",
      date: "Vui lòng nhập đúng định dạng",
    },
  };
};
