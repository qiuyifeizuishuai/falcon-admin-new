import { Message } from 'element-ui';

function error(msg) {
    Message({
        showClose: true,
        message: msg,
        type: 'error'
    });
}
function warning(msg) {
    Message({
        showClose: true,
        message: msg,
        type: 'warning'
    });
}

function success(msg) {
    Message({
        showClose: true,
        message: msg,
        type: 'success'
    });
}

let MessageFuntion = {
    error,
    warning,
    success
};
export default {
    MessageFuntion
};
