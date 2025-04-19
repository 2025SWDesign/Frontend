import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const api = axios.create({
  baseURL: "/api/v1",
});

// accessToken 요청 시 자동 포함 (/auth/token 제외)
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token && !config.url?.includes("/auth/token")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// accessToken 만료 시 refreshToken으로 재발급
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message = error.response?.data?.message;
    const isAccessExpired =
      error.response?.status === 401 &&
      message?.includes("인증 정보가 만료") &&
      !originalRequest._retry;

    if (isAccessExpired) {
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("refreshToken 없음");

        // refreshToken으로 재발급 요청 (Authorization 헤더 사용)
        const { data } = await axios.post("/api/v1/auth/token", null, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const { accessToken, refreshToken: newRefreshToken } = data.data;
        const { setAuthTokens } = useAuthStore.getState();
        setAuthTokens(accessToken, newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        console.log("재시도 중:", originalRequest.url);
        return api(originalRequest);
      } catch (reissueError) {
        console.error("토큰 재발급 실패:", reissueError);
        const { resetAuth } = useAuthStore.getState();
        resetAuth();
        sessionStorage.clear();
        window.location.href = "/";
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
