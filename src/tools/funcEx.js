/**
 * 文件下载
 * @param {*} res 
 */
export function downLoadFiles(res) {
    const url = window.URL.createObjectURL(res);
    const link = document.createElement("a");
    link.href = url;
    link.download = '成绩单.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
