

var mMatchvsDemoLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        // var mainscene = ccs.load(res.wangzha, "");
        // this.addChild(mainscene.node);
        this.match1_center = ui.loadCS(res.json1); //.to(this);
        this.match1_center.node.to(this).p(WIN_center);
        // this.match1_center.node.img_bag.setScale(0.5);
        var img_bag = this.match1_center.node.getChildByName("img_bag");
        img_bag.setScale(0.5);
        // uiutils.lua

        // this.addChild(this.match1_center.node);

        // var mainscene = ccs.load(res.json1, "");
        // this.addChild(mainscene.node);


        // 添加背景图
        // this.bg = new cc.Sprite(cRes.bg1).to(this).pp();
        // this.bg.setScaleY(_gm.bgScaleH);
        // /////////////////////////////
        // // 3. add your codes below...
        // // add a label shows "Hello World"
        // this.count = 10
        // var self = this;
        // // create and initialize a label
        // var helloLabel = new cc.LabelTTF("mMatchvsDemoLayer", "Arial", 38).to(this, 5).pp(0.5, 0.7);
        // // add "HelloWorld" splash screen"
        // this.sprite = new cc.Sprite(res.HelloWorld_png).to(this).pp();

        // this.sprite.quickBt(function () {
        //     // mlog("mMatchvsDemoLayer")
            
        //     self.count = self.count + 1
        //     mlog("self.count", self.count)
        //     helloLabel.setString(self.count)
        // });

        return true;
    },
});

var mMatchvsDemoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new mMatchvsDemoLayer();
        this.addChild(layer);
    }
});

