export const getResponseMessage = (res: any) => {
  console.log(res);

  return res?.message || "";
};
