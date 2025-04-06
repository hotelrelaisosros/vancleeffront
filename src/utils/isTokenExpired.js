import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const { exp } = jwtDecode(token);
        if (!exp) return true;

        return exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
};
