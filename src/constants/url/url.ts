import { API_URL } from "@configs/fetch.config";

// webView url
export const ARTICLE_WEBVIEW_URL = "https://www.leadvisor.net";

// 登录
export const LOGIN = API_URL + "/auth/sign-in";

// 注册
export const REGISTER = API_URL + "/auth/register";

// 激活账户
export const ACTIVE_ACCOUNT = API_URL + "/auth/verify-email";

// 删除用户
export const DELETE_ACCOUNT = API_URL + "/auth/delete-user";

// 发送邮箱验证码
export const SEND_EMAIL_VERIFYCATION =
  API_URL + "/auth/resend-email-verification-code";

// 忘记密码
export const FORGET_PASSWORD = API_URL + "/auth/forgot-password";
// 重置密码
export const RESET_PASSWORD = API_URL + "/auth/reset-password";

// 更新密码
export const UPDATE_PASSWORD = API_URL + "/auth/update-password";

// 搜索页面
export const TOPIC = API_URL + "/topic";

// index页
export const ARTICLE = API_URL + "/article"; // 最新发布
export const COURSE = API_URL + "/course"; // 课程
export const DOCUMENT = API_URL + "/document"; // 文档
export const PRODUCT = API_URL + "/product"; // 产品
export const DYNAMIC_FORM = API_URL + "/dynamic-form"; // 商业广告机器人
// product
export const SERVICE_CATEGORY = API_URL + "/service/category"; // 获取类别

// document-instance 页面
export const DOCUMENT_INSTANCE = API_URL + "/document/instance";

// course页
export const SHORT_VIDEO = API_URL + "/short-video"; // 短视频页

// 课程详情页
export const STRIPE_PAYMENT_SHEET = API_URL + "/checkout/payment-sheet";

export const PAYMENT_ZERO = API_URL + "/checkout/payment-zero";

// 我的课程页
export const COURSE_INSTANCE = API_URL + "/course/instance";
// 我的产品页
export const PRODUCT_INSTANCE = API_URL + "/document/instance";

// 订单页
export const ORDER = API_URL + "/order";

// insight 页
export const WEBINAR = API_URL + "/webinar";

//
export const SERVICE = API_URL + "/service";

export const USER_PROFILE = API_URL + "/user/profile";

export const ACCESS_TOKEN_EXPIRE_STATUS_CODE = 403;

export const MEMBER_PROFILE = API_URL + "/member/profile";

// 成员专区
export const MEMBER_ACCESS_FORBIDDEN_CODE = 403;
export const SERVICE_OPP = API_URL + "/service-opp"; // 业务机会
export const INVESTMENT_OPP = API_URL + "/investment-opp"; // 业务机会
export const INDUSTRY = API_URL + "/industry"; // 行业列表
export const REGISTER_MEMBER = API_URL + "/member/create-request";

// 客户专区
export const REGISTER_ORG = API_URL + "/org/create-request";
