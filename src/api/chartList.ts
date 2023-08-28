import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data?: {
    /** 列表数据 */
    list: Array<any>;
  };
};

/** 卡片列表 */
export const getLineList = (data?: object) => {
  return http.request<Result>("post", "/getLineList", { data });
};

/** 3D Bar列表 */
export const getLine3DList = (data?: object) => {
  return http.request<Result>("post", "/getBar3DList", { data });
};

/** 版本日志 */
export const getReleases = () => {
  return http.request<Result>("get", "/releases");
};
