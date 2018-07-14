
var BranchGrowthLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        // this._brushs = [];

        // // 添加背景图
        this.bg = new cc.Sprite(cRes.bg1).to(this, -1).pp();
        this.bg.setScaleY(_gm.bgScaleH);
        // // 文字描述
        // // var helloLabel = new cc.LabelTTF("BranchGrowth", "Arial", 38).to(this, 5).pp(0.5, 0.7);

        // // 创造一个画板
        // this._target = new cc.RenderTexture(V.w, V.h, cc.Texture2D.PIXEL_FORMAT_RGBA4444, gl.DEPTH24_STENCIL8_OES);
        // this._target.to(this).pp();

        // add "HelloWorld" splash screen"
        // this.sprite = new cc.Sprite(res.HelloWorld_png).to(this).pp();

        // this.sprite.quickBt(function () {
        //     mlog("HelloWorld")
        // });
        // this.Tree = new BranchSp({img: res.tree1, position: cc.p(V.w/2, 0)}).to(this).p(WIN_down);

        if ('touches' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved:function (touches, event) {
                    event.getCurrentTarget().drawInLocation(touches[0].getLocation());
                }
            }, this);
        } else if ('mouse' in cc.sys.capabilities)
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: function(event){
                    event.getCurrentTarget()._lastLocation = event.getLocation();
                },
                onMouseMove: function(event){
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                        event.getCurrentTarget().drawInLocation(event.getLocation());
                }
            }, this);

        this._brushs = [];
        var self = this;
        // var save = new cc.LabelTTF("Save", "Arial", 38).to(this, 5).p(1130, V.h - 100);
        var clear = new cc.LabelTTF("Clear", "Arial", 38).to(this, 5).p(1130, V.h - 170);
        clear.quickBt(function () {
            self.clearCB();
        });
        // create a render texture
        var target = new cc.RenderTexture(V.w, V.h, 2);
        target.x = V.w / 2;
        target.y = V.h / 2;
        this.addChild(target, 1);

        this._target = target;

        this._lastLocation = cc.p(V.w / 2, V.h / 2);
    },
    onExit:function () {
        for(var i in this._brushs){
            this._brushs[i].release();
        }
        this._super();
    },

    clearCB:function (sender) {
        // this._target.clear(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
        this._target.clear(0,0,0,0);
    },

    drawInLocation:function (location) {
        var distance = cc.pDistance(location, this._lastLocation);

        if (distance > 1) {
            var locLastLocation = this._lastLocation, i;
            this._target.begin();
            this._brushs = [];
            for(i = 0; i < distance; ++i) {
                var diffX = locLastLocation.x - location.x;
                var diffY = locLastLocation.y - location.y;
                var delta = i / distance;
                var sprite = new cc.Sprite(res.tree1);
                sprite.attr({
                    x: location.x + diffX * delta,
                    y: location.y + diffY * delta,
                    // rotation: Math.random() * 360,
                    // color: cc.color(Math.random() * 255, 255, 255),
                    // scale: Math.random() + 0.25,
                    // opacity: 20
                });
                sprite.parent = this;
                sprite.retain();
                this._brushs.push(sprite);
            }
            for (i = 0; i < distance; i++) {
                this._brushs[i].visit();
            }
            this._target.end();
        }
        this._lastLocation = location;
    },

    subtitle:function () {
        return "Testing 'save'";
    }

});

var BranchGrowth = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BranchGrowthLayer();
        this.addChild(layer);
    }
});

