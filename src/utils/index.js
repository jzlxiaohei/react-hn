/**
 * Created by zilong on 3/30/16.
 */

// @flow

const minuteMs = 1000 * 60,
    hourMs = minuteMs * 60,
    dayMs = hourMs * 24

const utils = {
    time: {
        formatFromNow(timestamp){
            // 确保timestamp为14位
            if (timestamp < 1e10) {
                timestamp *= 1000
            }
            const now = Date.now()
            const timeDis = now - timestamp
            if (timeDis < minuteMs) {
                return 'just now'
            } else if (timeDis < hourMs) {
                return `${Math.round(timeDis / minuteMs)} minute(s) ago`
            } else if (timeDis < dayMs) {
                return `${Math.round(timeDis / hourMs)} hour(s) ago`
            } else {
                return `${Math.round(timeDis / dayMs)} day(s) ago`
            }
        }
    },
    urlParse(href){
        //dom based!!
        const aEle = document.createElement('a')
        aEle.href = href
        return aEle
    },
    //记录列表页的滚动位置
    scroll:createScrollMgr()
}

function createScrollMgr() {
    const scrollMap = {}

    return {
        restoreScroll(key){
            if (!(key in scrollMap)) {
                scrollMap[key] = {
                    x: 0,
                    y: 0
                }
            }
            const _s = scrollMap[key]
            const x = _s.x,
                y = _s.y;
            setTimeout(function () {
                window.scrollTo(x, y);
            }, 0)
        },
        setScroll(key){
            scrollMap[key] = {
                x: window.pageXOffset || document.documentElement.scrollLeft,
                y: window.pageYOffset || document.documentElement.scrollTop
            }
        },
        deleteScroll(key){
            delete scrollMap[key];
        }
    }
}

export default utils