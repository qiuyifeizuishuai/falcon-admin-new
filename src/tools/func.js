/**
   * 日期转换函数（可以传Date、DateString:2019-7-2 13:59:46、JS时间戳）
   * dateTimeToDate
   * @param dateString  Date | String | Number
   * @returns {Date}
   */
export function dateTimeToDate(dateString, type) {

    let date = new Date(dateString);

    // if (this.isNull(dateString)) { return ''; }

    // // eslint-disable-next-line valid-typeof
    // if (typeof (dateString) == 'object' || typeof (dateString) == 'Object') {
    //     date = dateString;
    //     // eslint-disable-next-line valid-typeof
    // } else if (typeof (dateString) == 'number' || typeof (dateString) == 'Number') {
    //     date = new Date(dateString);
    //     // eslint-disable-next-line valid-typeof
    // } else if (typeof (dateString) == 'string' || typeof (dateString) == 'String') {
    //     let arr1 = dateString.split(" ");
    //     let sdate = arr1[0].split('-');
    //     if (arr1[1]) {
    //         let sdate2 = arr1[1].split(':');
    //         date = new Date(sdate[0], sdate[1] - 1, sdate[2], sdate2[0], sdate2[1], sdate2[2]);
    //     } else {
    //         date = new Date(sdate[0], sdate[1] - 1, sdate[2], 0, 0, 0);
    //     }
    // }

    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;

    if (type) {
        if (type == 'startTime') {
            return y + '-' + MM + '-' + d + ' 00:00:00';
        } else if (type == 'endTime') {
            return y + '-' + MM + '-' + d + ' 23:59:59';
        } else if (type == 'date') {
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m;
        } else if (type == 'date2') {
            return y + '-' + MM + '-' + d;
        } else if (type == 'cycle') {
            return y + '-' + MM;
        } else if (type == 'chinese') {
            return y + '年' + MM + '月' + d + '日';
        } else if (type == 'week') {
            let weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            return weekDay[date.getDay()];
        } else if (type == 'time') {
            return date.getTime();
        } else if (type == 'Date') {
            return date;
        } else if (type == 'year') {
            return y;
        }
    } else {
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }

}