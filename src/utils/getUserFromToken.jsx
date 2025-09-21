import * as jwt_decode from "jwt-decode";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwt_decode.default(token); 
    return {
      name: decoded.name|| "Smarika",
      email: decoded.email|| "smarika@gmail.com",
      phone: decoded.phone || "",
      role: decoded.role || "",
    };
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
