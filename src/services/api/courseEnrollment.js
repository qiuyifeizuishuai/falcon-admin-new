//  考试报名费用中心
import Ajax from "../axios";
//  获取班级
export const getClass = (data) =>Ajax.post("/api/user/grade/selectGrade", data);
//  查询全部订单
export const getOrderForm = (data) => Ajax.get(`/api/shopping/order?specialty=${data.specialty}&school=${data.school}&created_at__gte=${data.createdatgte}&created_at__lte=${data.createdatlte}&payment_channels=${data.paymentchannels}&q=${data.q}&perPage=${data.perPage}&start=${data.start}&status=${data.status}`);
