/**
 * Created by 黄二杰 on 2015/7/28.
 */

Math.clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
};

//工具类
var Utils = {};

//判断一个点， 是在线的左边， 还是右边
// 负数左边， 0， 刚好线上， 正数右边
//x1, y1, x2, y2, 表示线
//x, y表示点
Utils.calcInLineSide = function (x1, y1, x2, y2, x, y) {
    var value = (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1);
    return value
};

Utils.rad = function (angle) {
    return angle * (Math.PI/180)
}

//dump
Utils.dump = function (obj, deep, hash) {

    //发布模式就不要打印了
    if (typeof PUBLIC_MODE != "undefined") {
        if (PUBLIC_MODE == 2) {
            return;
        }
    }

    if (cc.sys.isNative) {
        var str = JSON.stringify(obj);

        console.log(str);
        return;
    }

    var tab20 = "";
    for (var i = 0; i < 100; ++i) {
        tab20 += "\t";
    }
    deep = deep || 1;
    if (deep == 1) {
        console.log("----------------dump--------------------" + tab20);
    }
    var tab = "";
    for (var i = 0; i < deep - 1; ++i) {
        tab += "\t";
    }
    if (typeof(obj) == "object") {

        hash = hash || [];

        for (var index in hash) {
            if (hash[index] == obj) {
                console.log(tab + "\t" + "hash printed," + tab20);
                return;
            }
        }

        hash.push(obj);

        console.log(tab + "{" + tab20);
        for (var att in obj) {

            var val = obj[att];

            if (typeof(val) == "object") {
                console.log(tab + "\t" + att + ":" + tab20);
                this.dump(val, deep + 1, hash);
            }
            else {
                console.log(tab + "\t" + att + ":" + obj[att] + "," + tab20);
            }
        }
        console.log(tab + "}" + tab20);
    }
    else if (obj != null) {
        console.log(tab + "\t" + obj + tab20);
    }
    else {
        console.log(tab + "\t" + "null" + tab20);
    }
    if (deep == 1) {
        console.log("----------------dump--------------------" + tab20);
    }
};

//判断一个点是否在封闭的凸多边形里
//参数起点到终点， 最后两个点是等待检测的点
Utils.isRectContainPoint = function (points, x, y) {

    var args = this.clone(points);
    args.length += 1;
    var len = args.length;
    args[len - 1] = args[0];
    var count1 = 0, count2 = 0;
    for (var i = 0; i < len - 1; ++i) {
        var value = this.calcInLineSide(args[i].x, args[i].y, args[i + 1].x, args[i + 1].y, x, y);
        if (value > 0)
            count1++;
        else
            count2++;
    }
    var inside = false;
    if (0 == count1 || 0 == count2) {
        inside = true;
    }
    return inside;
};

/**
 * 得到数字的长度， 负数会算上负号, 小数会算上小数点
 * @param num
 */
Utils.getNumLength = function (num) {
    return String(num).length;
};

/**
 * 返回一个rect大小的 layer
 * @param rect
 * @returns {*}
 */
Utils.buildRect = function (rect) {

    rect = rect || cc.rect(0, 0, V.w, V.h);
    var layer = new cc.LayerColor(cc.color(0xff, 0xff, 0x00, 0x88)).p(rect.x, rect.y);
    layer.setContentSize(rect.width, rect.height);
    return layer;
};

/**
 * 创建一动画动作
 * @param prefix  前缀
 * @param num 数量
 * @param interval 播放间隔时间 默认 1/12;
 * @param extension 后缀 默认 .png
 * @param occupying 占位， 表示需要几位， 如果是零则不处理， 1表示帧标号只有一位， 2表示两位  fish8_07.png 比如像这样的， 前缀一般填 fish8， 1到9就需要补一个0， 10以上就不需要补零
 * @param start 起始位置，默认从1开始。。
 * @returns {cc.Animate}
 */
Utils.buildAnimate = function (prefix, num, interval, extension, occupying, start = 1) {

    interval = interval || 1 / 12;
    extension = extension || ".png";
    occupying = occupying || 0;
    var animation = new cc.Animation();

    var getSpriteFrame = null;
    if (prefix[0] == '#') {
        prefix = prefix.substring(1);
        getSpriteFrame = function (frameName) {
            //console.log("frameName" + "\t" + frameName);
            return cc.spriteFrameCache.getSpriteFrame(frameName);
        }
    }
    else {
        getSpriteFrame = function (frameName) {
            return new cc.SpriteFrame(frameName);
        }
    }


    var numLength = String(num).length;

    for (var i = 0; i < num; ++i) {
        var index = i + start;

        if (occupying != 0) {
            var zeorNum = occupying - String(index).length;
            for (var j = 0; j < zeorNum; ++j) {
                index = "0" + index;
            }
        }

        var frameName = prefix + index + extension;
        var spriteFrame = getSpriteFrame(frameName);
        animation.addSpriteFrame(spriteFrame);
    }

    animation.setDelayPerUnit(interval);           //设置两个帧播放时间
    return cc.animate(animation);
};

/**
 * 判断 点是否在矩形内
 * @param rect {{lt: (*|cc.Point), rt: (*|cc.Point), lb: (*|cc.Point), rb: (*|cc.Point)}}
 * @param point cc.Point
 * @returns {boolean}
 */
Utils.isPointInRect = function (rect, point) {
    return Utils.calcInLineSide(rect.lt.x, rect.lt.y, rect.rt.x, rect.rt.y, point.x, point.y)
        *
        Utils.calcInLineSide(rect.lb.x, rect.lb.y, rect.rb.x, rect.rb.y, point.x, point.y) <= 0
        &&
        Utils.calcInLineSide(rect.lt.x, rect.lt.y, rect.lb.x, rect.lb.y, point.x, point.y)
        *
        Utils.calcInLineSide(rect.rt.x, rect.rt.y, rect.rb.x, rect.rb.y, point.x, point.y) <= 0;
};

/**
 * 判断两条线段是否相交
 * @param l1p1 线段1点1
 * @param l1p2 线段1点2
 * @param l2p1 线段2点1
 * @param l2p2 线段2点2
 * @returns {boolean}
 */
Utils.lineCollisionDetection = function (l1p1, l1p2, l2p1, l2p2) {

    return Utils.calcInLineSide(l1p1.x, l1p1.y, l1p2.x, l1p2.y, l2p1.x, l2p1.y)
        *
        Utils.calcInLineSide(l1p1.x, l1p1.y, l1p2.x, l1p2.y, l2p2.x, l2p2.y) <= 0
        &&
        Utils.calcInLineSide(l2p1.x, l2p1.y, l2p2.x, l2p2.y, l1p1.x, l1p1.y)
        *
        Utils.calcInLineSide(l2p1.x, l2p1.y, l2p2.x, l2p2.y, l1p2.x, l1p2.y) <= 0;

};

/**
 * 判断两个矩形是否碰撞
 * @param rect1 {{lt: (*|cc.Point), rt: (*|cc.Point), lb: (*|cc.Point), rb: (*|cc.Point)}}
 * @param rect2 {{lt: (*|cc.Point), rt: (*|cc.Point), lb: (*|cc.Point), rb: (*|cc.Point)}}
 * @returns {boolean}
 */
Utils.rectCollisionDetection = function (rect1, rect2) {

    var ps1 = [rect1.lt, rect1.rt, rect1.rb, rect1.lb, rect1.lt];
    var ps2 = [rect2.lt, rect2.rt, rect2.rb, rect2.lb, rect2.lt];

    //判断是否有一矩形顶点在另一矩形内, 判断一个顶点就好， 主要是防止一个矩形完全在另一个矩形内， 其它相交方式由下面的判断解决（判断矩形边是否跟另一矩形边有相交）
    if (Utils.isPointInRect(rect1, ps2[0]) || Utils.isPointInRect(rect2, ps1[0])) {
        return true;
    }

    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            if (Utils.lineCollisionDetection(ps1[i], ps1[i + 1], ps2[j], ps2[j + 1])) {
                return true;
            }
        }
    }

    return false;
};
/**
 * 通过帧名称数组创建一动画动作
 * @param framePathArray  帧名称数组
 * @param interval 播放间隔时间 默认 1/12;
 * @param extension 后缀 默认 .png
 * @returns {cc.Animate}
 */
Utils.buildAnimateByArray = function (framePathArray, interval, extension) {

    interval = interval || 1 / 12;
    extension = extension || ".png";
    var animation = new cc.Animation();

    for (var i = 0; i < framePathArray.length; ++i) {
        var frameName = framePathArray[i];
        if (frameName[0] == "#") {
            frameName = frameName.substring(1);
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName + extension);
            animation.addSpriteFrame(spriteFrame);
        }
        else {
            var spriteFrame = new cc.SpriteFrame(frameName + extension);
            animation.addSpriteFrame(spriteFrame);
        }
    }
    animation.setDelayPerUnit(interval);           //设置两个帧播放时间
    return cc.animate(animation);
};


/**
 * 获取url后的参数
 * @returns {Object}
 */
Utils.getArgmuent = function () {
    if (typeof location == "undefined") {
        return [];
    }

    var url = location.search; //获取url中"?"符后的字串
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0].toLowerCase()] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};

/**
 * 初始随机种子
 * @type {number}
 */
var randseek = (new Date().getTime()) & 0x7fff;

/**
 * 设置随机种子
 * @param seek
 */
Utils.srand = function (seek) {
    randseek = seek;
};

Utils.RandMax = 233280;

/**
 * 产生 0到Utils.RandMax的伪随机数， 随机质量不如 js自带， 仅用于， 减少网络io， 服务端下发随机种子， 客户端依此产生随机数控制， 保证各客户端一致
 * @returns {number}
 */
Utils.random = function () {
    randseek = (randseek * 9301 + 49297) % Utils.RandMax;
    return randseek;
};

Utils.calcRotation = function (st, ed) {
    var angle = Math.atan2(ed.y - st.y, ed.x - st.x);
    var rotation = -angle * 180.0 / Math.PI;
    return rotation;
};

/**
 * 把角度变换在0到Math.PI*2之间
 * @param angle
 * @returns {*}
 */
Utils.angleRange = function (angle) {
    var t = Math.PI * 2;

    while (angle < 0) {
        angle += t;
    }

    while (angle > t) {
        angle -= t;
    }
    return angle;
};

Utils.getShakeAction = function (shakeBaseValue, shakeRandomValue, dt, times) {

    shakeBaseValue = shakeBaseValue == null ? 5 : shakeBaseValue;
    shakeRandomValue = shakeRandomValue == null ? 3 : shakeRandomValue;
    dt = dt == null ? 0.05 : dt;
    times = times == null ? 10 : times;

    var shakeAction = null;
    for (var i = 0; i < times; ++i) {

        var x = Math.random() > 0.5 ? shakeBaseValue + Math.random() * shakeRandomValue : -shakeBaseValue - Math.random() * shakeRandomValue;
        var y = Math.random() > 0.5 ? shakeBaseValue + Math.random() * shakeRandomValue : -shakeBaseValue - Math.random() * shakeRandomValue;
        var action = cc.moveBy(0, x, y);
        //shakeAction = shakeAction ? cc.sequence(action,action.reverse(), shakeAction) : cc.sequence(action, action.reverse());
        shakeAction = shakeAction ? cc.sequence(cc.delayTime(dt), action, shakeAction) : cc.sequence(cc.delayTime(dt), action);
    }

    return shakeAction;
};
/**
 * 格式化钱数， 支持小数， 三位带一个splitChar
 * @param moneyValue
 * @param splitChar
 * @returns {string}
 */
Utils.formatMoney = function (moneyValue, splitChar) {

    splitChar = splitChar == null ? "," : splitChar;
    var str = String(moneyValue);

    var result = "";
    //带小数点
    if (Math.floor(moneyValue) != moneyValue) {
        var len = str.length;
        for (var i = len - 1; i >= 0; --i) {
            result = str[i] + result;
            if (str[i] == ".")
                break;
        }
        str = String(Math.floor(moneyValue));
    }

    var len = str.length;
    for (var i = len - 1, count = 0; i >= 0; --i, ++count) {

        if (count % 3 == 0 && count != 0 && str[i] != '-' && str[i] != '+') {
            result = splitChar + result;
        }
        result = str[i] + result;
    }

    return result;
};

Utils.clone = function (obj) {
    var newObj = (obj.constructor) ? new obj.constructor : {};

    for (var key in obj) {
        var copy = obj[key];
        // Beware that typeof null == "object" !
        if (((typeof copy) === "object") && copy && !(copy instanceof cc.Node)) {
            newObj[key] = Utils.clone(copy);
        } else {
            newObj[key] = copy;
        }
    }
    return newObj;
};
/**
 * 复制
 */
Utils.cloneObj = function (oldObj) {
    if (typeof(oldObj) != 'object') return oldObj;
    if (oldObj == null) return oldObj;
    var newObj = {};
    for (var i in oldObj)
        newObj[i] = Utils.cloneObj(oldObj[i]);
    return newObj;
};

/**
 * 扩展对象
 */
Utils.extendObj = function () {
    var args = arguments;
    if (args.length < 2) return;
    var temp = Utils.cloneObj(args[0]);
    for (var n = 1; n < args.length; n++) {
        for (var i in args[n]) {
            temp[i] = args[n][i];
        }
    }
    return temp;
};

/**
 * 根据两点确定一条直线 两点的x，y不能相同
 * @param point1
 * @param point2
 * @param x
 * @return y
 */
Utils.getPointByLineFunction = function (point1, point2, x) {
    if (point1.x == point2.x || point1.y == point2.y) {
        return 0;
    }
    //斜率
    var k = (point1.y - point2.y) / (point1.x - point2.x);

    //方程式
    var y = k * (x - point1.x) + point1.y;
    return y;
};
/**
 * 返回 st到 ed之间的整数， 最小st， 最大ed-1
 * @param st
 * @param ed
 * @returns {number}
 */
Utils.rand = function (st, ed) {

    if (ed == null) {
        ed = st;
        st = 0;
    }

    return Math.round(Math.random() * (ed - st) + st);
};


/**
 * 深度拷贝属性
 * @param dest
 * @param src
 * @returns {*|{}}
 */
Utils.copyAttr = function (dest, src) {

    for (var attr in src) {

        if (src[attr] instanceof Array) {
            dest[attr] = dest[attr] || [];
            this.copyAttr(dest[attr], src[attr]);
        }
        else if (src[attr] === 'object') {
            dest[attr] = dest[attr] || {};
            this.copyAttr(dest[attr], src[attr]);
        }
        else {
            dest[attr] = src[attr];
        }
    }
};


/**
 *
 对Date的扩展，将 Date 转化为指定格式的String
 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 例子：
 Utils.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 Utils.formatDate(new Date(),"yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param date
 * @param fmt
 */
Utils.formatDate = function (date, fmt) {
    fmt = fmt || "yyyy-M-d hh:mm:ss";
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

};

/**
 *判断是否是手机号码
 * @param mobileNum
 * @returns {boolean}
 */
Utils.isMobileNum = function (mobileNum) {
    return /^1\d{10}$/.test(mobileNum);
};

/**
 * 格式化  妮称， 超过部分用。。。
 */
Utils.formatNickname = function (nickname) {
    if (nickname.length > 7) {
        nickname = nickname.slice(0, 5) + "...";
    }
    return nickname;
};


/**
 * 返回字符的字节长度（汉字算2个字节）
 * @param {string}
 * @returns {number}
 */
Utils.getByteLen = function (val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null) //全角
            len += 2;
        else
            len += 1;
    }
    return len;
};

/**
 * 金额小写转大写
 * @param n
 * @returns {*}
 */
Utils.convertMoneyToCapitals = function (n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "数据非法";
    var unit = "万千百拾亿千百拾万千百拾元角分", str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p + 1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
};


/**
 * 删除指定的元素, 有删除到， 返回true, 没有返回false
 * @param array
 * @param element
 * @returns {boolean}
 */
Utils.arrayRemove = function (array, element) {
    for (var i = 0, len = array.length; i < len; ++i) {
        if (array[i] == element) {
            array.splice(i, 1);
            return true;
        }
    }
    return false;
};

/**
 * 随机数组索引
 * @param array
 * @returns {*}
 */
Utils.arrayShuffle = function (array) {
    let m = array.length, i;
    while (m) {
        i = (Math.random() * m--) >>> 0;
        [array[m], array[i]] = [array[i], array[m]];
    }
    return array;
};

/**
 * 判断数组是否含有某个元素
 * @param array
 * @param obj
 * @returns {number}
 */
Utils.arrayContains = function (array, obj) {
    let m = array.length;
    while (m--) {
        if (array[m].toString() === obj.toString()) {
            return m;
        }
    }
    return -1;
};

/**
 * 数组去重
 * @param array
 * @returns {Array}
 */
Utils.arrayUnique = function (array) {
    let tempArray = [];
    let tempJson = {};
    for (let i = 0; i < array.length; i++) {
        if (!tempJson[array[i]]) {
            tempArray.push(array[i]);
            tempJson[array[i]] = 1;
        }
    }
    return tempArray;
};

/**
 * 判断两个数组是否相等
 * @param array1
 * @param array2
 * @returns {boolean}
 */
Utils.arrayEquals = function (array1, array2) {
    if (!array1 || !array2) return false;
    if (array1.length !== array2.length) return false;

    for (var i = 0; i < array1.length; i++) {
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            if (!this(array1[i], array2[i])) {
                return false;
            }
        } else if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
};

/**
 * Object对象拼接为string。{key1: value1, key2: value2...} -> "key1:value1,key2:value2..."
 * @param obj
 * @returns {string}
 */
Utils.obj2Str = function (obj) {
    // 非空Object才操作
    if (Object.keys(obj).length > 0) {
        var strArr = [];
        for (var key in obj) {
            var str = key + ":" + obj[key];
            strArr.push(str);
        }
        return strArr.toString();
    }

    return "";
};


/**
 * 判断是否是个合法的URL， 只是简单判断
 * @param str
 * @returns {boolean}
 */
Utils.isUrl = function (str) {
    var reg = /[a-z]+:\/\/[a-z0-9_\-\/.%]+/i;
    return str.match(reg) != null;
};

/**
 * 模拟点击
 * @param touchPos
 * @constructor
 */
Utils.analogClick = function (touchPos) {
    if (!cc.sys.isNative)
        return;

    var id = 0;
    var x = touchPos.x;
    var y = touchPos.y;
    var touch = new cc.Touch();
    touch.setTouchInfo(id, x, y);
    var event1 = new cc.EventTouch();
    event1.setEventCode(cc.EventTouch.EventCode.BEGAN);
    event1.setTouches([touch]);
    cc.eventManager.dispatchEvent(event1);

    var event2 = new cc.EventTouch();
    event2.setEventCode(cc.EventTouch.EventCode.ENDED);
    event2.setTouches([touch]);
    cc.eventManager.dispatchEvent(event2);
};

//模拟输入
Utils.analogInput = function (keyCode) {
    if (!cc.sys.isNative)
        return;

    cc.eventManager.dispatchEvent(new cc.EventKeyboard(keyCode, 1));
    cc.eventManager.dispatchEvent(new cc.EventKeyboard(keyCode, 0));
};

/**
 * 给节点绑定拖动打印坐标
 * @param touchPos
 * @constructor
 */
Utils.adjustNodePos = function (node) {
    node.bindTouch({
        swallowTouches:true,
        onTouchBegan:function (touch, event) {
            this.startPos = touch.getLocation();

            return true;
        },

        onTouchMoved:function (touch, event) {
            this.setPosition(touch.getLocation());
        },

        onTouchEnded:function (touch, event) {
            this.endPos = touch.getLocation();
            cc.log("======== new pos " + this.endPos.x + "," + this.endPos.y);
        }
    })
};

// 产生指定范围的随机数
Utils.randNum = function(min, max, isInt){
    var offset = max - min;
    var num = min + Math.random() * offset;

    return isInt ? Math.floor(num) : num;
};

if (typeof module != "undefined") {
    module.exports = Utils;
}

