const urlParser = document.createElement('a')

export function domain(url) {
    urlParser.href = url
    return urlParser.hostname
}
export function limit(value, num) {
    return value.substr(0, num) + (value.length > num ? '...' : '');
}

export function fromNow(time) {
    const between = (new Date().getTime() - new Date(time).getTime()) / 1000;
    if (between < 3600) {
        return pluralize(~~(between / 60), ' 分钟');
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' 小时');
    } else if (between < 604800) {
        return pluralize(~~(between / 86400), ' 天');
    } else {
        const target = new Date(time)
        return (target.getFullYear() != new Date().getTime().getFullYear ? target.getFullYear() + ' 年 ' : '')
            + (target.getMonth() + 1) + ' 月 ' + target.getDate() + '日';
    }
}

function pluralize(time, label) {
    return time + label + '前';
}
