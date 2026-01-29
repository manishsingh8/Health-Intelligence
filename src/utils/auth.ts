export const isAuthenticated = () => {
  return !!sessionStorage.getItem("authToken");
};

export const logout = () => {
  sessionStorage.clear();
};
