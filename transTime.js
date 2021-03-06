/**
 * @method friendlyDate 计算指定时间距离当前时间差
 * @param {Date} timestamp 时间戳
 * @return {String} 返回值
*/

export function friendlyDate(timestamp) {
    var formats = {
        'year': '%n% 年前',
        'month': '%n% 月前',
        'day': '%n% 天前',
        'hour': '%n% 小时前',
        'minute': '%n% 分钟前',
        'second': '%n% 秒前',
    };

    var now = Date.now();
    var seconds = Math.floor((now - timestamp) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);
    var years = Math.floor(months / 12);

    var diffType = '';
    var diffValue = 0;
    if (years > 0) {
        diffType = 'year';
        diffValue = years;
    } else {
        if (months > 0) {
            diffType = 'month';
            diffValue = months;
        } else {
            if (days > 0) {
                diffType = 'day';
                diffValue = days;
            } else {
                if (hours > 0) {
                    diffType = 'hour';
                    diffValue = hours;
                } else {
                    if (minutes > 0) {
                        diffType = 'minute';
                        diffValue = minutes;
                    } else {
                        diffType = 'second';
                        diffValue = seconds === 0 ? (seconds = 1) : seconds;
                    }
                }
            }
        }
    }
    return formats[diffType].replace('%n%', diffValue);
}

/**
 * 功能：将时间戳按照给定的 时间/日期 格式进行处理
 * @param {Number} date 时间戳 
 * @param {String} fmt 时间格式 'yyyy-MM-dd hh:mm' 'yy/MM/dd' 'yy-MM-dd' 'hh:mm' 'hh:mm:ss'
 * @returns {String} 规范后的 时间/日期 字符串
 */
export function formatDate(date, fmt) {
    let padLeftZero = function(str) {
        return ('00' + str).substr(str.length);
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
