var simpleList = [
    // fsh vsh 描述
    [res.gpu_simple1, res.gpu2, "颜色加重一些1"],
    [res.gpu_simple2, res.gpu2, "墨水池"],
    [res.gpu_simple3, res.gpu2, "浮雕"],
];


var simpleShaderLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var self = this;
        this.nowIndex = 2;
        this.upLimit  = simpleList.length - 1;
        // 添加背景图
        this.bg = new cc.Sprite(cRes.bg1).to(this).pp();
        this.bg.setScaleY(_gm.bgScaleH);
        // 左边原图
        this.pic1 = new cc.Sprite(res.wen4).to(this).p(V.w/4, V.h/2);
        this.pic1.setScale(0.5);
        // 右边为变化后的图片
        this.pic2 = new ShaderSprite(res.wen4, simpleList[this.nowIndex][0], simpleList[this.nowIndex][1]).to(this).p(V.w*3/4, V.h/2);
        this.pic2.setScale(0.5);
        // 简单的描述
        this.desc = new cc.LabelTTF((this.nowIndex+1)+" : "+simpleList[this.nowIndex][2], "宋体", 25).to(this).p(V.w/2, 150);
        // 左右按钮
        this.btn_left  = new cc.Sprite(res.cocosui_b1).to(this).p(460, 100);
        this.btn_left.quickBt(function () {
            self.changIndex(1);
        });
        this.btn_right = new cc.Sprite(res.cocosui_f1).to(this).p(V.w-460, 100);
        this.btn_right.quickBt(function () {
            self.changIndex(-1);
        });
    },
    changIndex: function(arg) {
        this.nowIndex = this.nowIndex + arg;
        if (this.nowIndex < 0) {
            this.nowIndex = this.upLimit;
        } else if (this.nowIndex > this.upLimit) {
            this.nowIndex = 0;
        }
        this.pic2.removeFromParent();
        this.pic2 = new ShaderSprite(res.wen4, simpleList[this.nowIndex][0], simpleList[this.nowIndex][1]).to(this).p(V.w*3/4, V.h/2);
        this.pic2.setScale(0.5);

        this.desc.setString( (this.nowIndex+1)+" : "+simpleList[this.nowIndex][2] )
    }

});

var simpleShaderScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new simpleShaderLayer();
        this.addChild(layer);
    }
});

