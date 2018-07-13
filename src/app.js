
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        // 添加背景图
        this.bg = new cc.Sprite(cRes.bg1).to(this).pp();
        this.bg.setScaleY(_gm.bgScaleH);
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38).to(this, 5).pp(0.5, 0.7);
        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png).to(this).pp();

        this.sprite.quickBt(function () {
            mlog("HelloWorld")
        });

        return true;
    },
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

