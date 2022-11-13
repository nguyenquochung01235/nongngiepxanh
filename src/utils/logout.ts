export const handleLogout = (navigate: any) => {
  localStorage.removeItem("access_token_luanvan");
  localStorage.removeItem("user_luanvan");
  localStorage.removeItem("htx");
  localStorage.removeItem("account");

  navigate("/login");
};
