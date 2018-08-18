
// var GLB = require("Glb");
// var engine = require("MatchvsEngine");
// var response = require("MatchvsDemoResponse");
// var msg = require("MatvhsMessage");
var userInfo;

var mMatchvsDemoLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        console.log(this.on);
        // console.log("MatchvsEngine");
        // console.log(MatchvsEngine);
        
        this.match1_center = ui.loadCS(res.json1); //.to(this);
        this.match1_center.to(this).p(WIN_center);
        ui.setNodeMap(this.match1_center, this);
        // 背景适配全屏
        this.img_bag.ctFull();

        // 创建输入框
        var sp1 = new cc.Scale9Sprite("res/img2/playerInfo/_0008_wenben.png");
        account1 = new cc.EditBox(cc.size(550, 50), sp1);
        account1.setPlaceHolder("201766");
        account1.setFontSize(30);
        account1.setPlaceholderFontSize(32);
        account1.setFontColor(cc.color.BLACK);
        account1.setPosition(45, 0);
        this.Node_1.addChild(account1);
        this.account1 = account1;
        //         201766
        // 320c7a564a324e79b0c8e12696f5ec64
        // 2f1176c2a2a84132bfead71dcb33b4d4
        var sp2 = new cc.Scale9Sprite("res/img2/playerInfo/_0008_wenben.png");
        account2 = new cc.EditBox(cc.size(550, 50), sp2);
        account2.setPlaceHolder("********************************");
        account2.setFontSize(30);
        account2.setPlaceholderFontSize(32);
        account2.setFontColor(cc.color.BLACK);
        account2.setPosition(45, 0);
        this.Node_2.addChild(account2);
        this.account2 = account2;

        var sp3 = new cc.Scale9Sprite("res/img2/playerInfo/_0008_wenben.png");
        account3 = new cc.EditBox(cc.size(550, 50), sp3);
        account3.setPlaceHolder("********************************");
        account3.setFontSize(30);
        account3.setPlaceholderFontSize(32);
        account3.setFontColor(cc.color.BLACK);
        account3.setPosition(45, 0);
        this.Node_3.addChild(account3);
        this.account3 = account3;


        var self = this;
        this.initEvent(self);
        

        return true;
    },
    initEvent:function (self) {
        MatchvsDemoResponse.prototype.init(self);
        // this.node.on(matchvs_msg.MATCHVS_RE_CONNECT,this.onEvent,this);
    },

});

var mMatchvsDemoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new mMatchvsDemoLayer();
        this.addChild(layer);
    }
});

