// Create By Changwei on 2018/07/13

// 屏幕打印   一般调试的时候用
var PrintPosDiff = 15;

var mlog = function () {
    var mstr = "";
    for (var i in arguments) {
        if (i == 0) {
            mstr += arguments[i];
        } else {
            mstr += " ; " + arguments[i];
        }
    }
    if (PrintPosDiff > 1) {
        PrintPosDiff -= 1; 
    } else {
        PrintPosDiff = 15;
    }
    var scene = cc.director.getRunningScene();
    var uTime = 6.5;

    var node = new cc.LabelTTF(mstr, "黑体", 31);
    node.to(scene, 9999).p(V.w / 2, PrintPosDiff * 30);
    node.setColor(cc.color(80, 19, 0));
    var action = cc.sequence(
        cc.spawn(
            cc.fadeOut(uTime),
            cc.moveBy(uTime, cc.p(0, 400))
        ),
        cc.removeSelf()
    );
    node.runAction(action);
};

// 入口函数 从这里进入分流
var MLabel = cc.LabelTTF.extend({
    ctor: function (name, showName) {
        this._super(showName, "黑体", 25);
        this.name = name;
        this.showName = showName;
    },
    onEnter: function () {
        this._super();
        var self = this;
        this.quickBt(function() {
            mstr = "cc.director.runScene(new " + self.name + "())";
            eval(mstr);
        });
    }
});

var MEnter = cc.Scene.extend({
    ctor: function (gameId, isDirect) {
        this._super();
        this._gameId = gameId;
        this._isDirect = isDirect;
    },

    onEnter: function () {
        this._super();
        var ary = SceneInCare[this._gameId]

        if (this._isDirect) {
            mstr = "cc.director.runScene(new " + ary[0] + "())";
            eval(mstr);
        } else {
            var node = new MLabel(ary[0], ary[1]).to(this).p(V.w/2, V.h/2);
        }
    }
});











