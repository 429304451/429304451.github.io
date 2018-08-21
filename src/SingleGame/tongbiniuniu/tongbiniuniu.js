

var tongbiniuniuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        this.tongbiniuniuJson = ui.loadCS("res/csb/SingleGame/tongbiniuniu.json"); //.to(this);
        this.tongbiniuniuJson.to(this).p(WIN_center);
        ui.setNodeMap(this.tongbiniuniuJson, this);
        // 满屏幕缩放
        this.sp_bg.fullScreen();
        console.log("WIN_Height", WIN_Height);
        // nd_up_role
        var sPos = util.moveToOtherWordPoint(this.nd_up_role, this.nd_go_up)
        this.nd_up_role.setPosition(sPos);

        var sPos2 = util.moveToOtherWordPoint(this.nd_down_role, this.nd_go_down)
        this.nd_down_role.setPosition(sPos2);
        this.nd_top.setPositionY(WIN_Height/2);
        // this.nd_up_role.setPositionY(WIN_Height/2-65-WIN_Height*0.01)
        // this.nd_down_role.setPositionY(-WIN_Height/2+65+WIN_Height*0.01);


        // 添加背景图
        // this.bg = new cc.Sprite(cRes.bg1).to(this).pp();
        // this.bg.setScaleY(_gm.bgScaleH);
        // /////////////////////////////
        // // 3. add your codes below...
        // // add a label shows "Hello World"
        // this.count = 10
        // var self = this;
        // // create and initialize a label
        // var helloLabel = new cc.LabelTTF("tongbiniuniuLayer", "Arial", 38).to(this, 5).pp(0.5, 0.7);
        // // add "HelloWorld" splash screen"
        // this.sprite = new cc.Sprite(res.HelloWorld_png).to(this).pp();

        // this.sprite.quickBt(function () {
        //     // mlog("tongbiniuniuLayer")
            
        //     self.count = self.count + 1
        //     mlog("self.count", self.count)
        //     helloLabel.setString(self.count)
        // });

        return true;
    },
});

var tongbiniuniuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new tongbiniuniuLayer();
        this.addChild(layer);
    }
});

