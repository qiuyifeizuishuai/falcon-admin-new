import axios from '../axios';
//  系统消息接口

//  获取已发送的消息                                                        message——type必须为system 暂时写死
export const getSendMessage = (type) => axios.get(`/api/msg/sender-messages?messages_type=${type}`);
//  获取接收的消息
export const getReceiveMessage = () =>axios.get(`/api/msg/messages?messages_type=system&perPage=999`);
//  获取单条消息数据
export const getSingleMsg = (id) =>axios.get(`/api/msg/messages/${id}`);
//  获取投诉建议
export const getComplaint = () => axios.get("/api/msg/complaints?perPage=999");
//  查询单条投诉消息
export const getSingleComplaint = (id) => axios.get(`/api/msg/complaints/${id}`);
//  获取未读消息
export const getUnreadMessage = (type) =>axios.get(`/api/msg/messages-count?messages_type=${type}`);
//  获取投诉未读消息
export const getComplaintUnread = () =>axios.get("/api/msg/complaints-count");
//  纠错反馈列表
export const getErrorCorrection = () =>axios.get("/api/exam/exercise/error-correction-topics");
//  获取纠错反馈的未读消息
export const getUnreadErrorCorrection = () =>axios.get("/api/exam/exercise/unread-error-correction-topics");
//  纠错反馈单条点击记录，表示已读
export const readMessage = (uuid) => axios.patch(`/api/exam/exercise/error-correction-topics/${uuid}`);

// 撤回消息
export const withdrawMessage = (id) =>axios.delete(`/api/msg/messages/${id}/retract`);
