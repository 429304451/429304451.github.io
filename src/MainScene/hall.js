
var backHallLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        // 返回大厅按钮
        this.btn_backHall = new cc.Sprite(res.bomb_anniu1).to(this).p(50, WIN_Height-50);
        new cc.Sprite(res.bomb_tuichu).to(this.btn_backHall).pp(0.47, 0.56);
        this.btn_backHall.quickBt(function () {
            cc.director.runScene(new hall_Scene());
        });
        // 列表按钮
        this.btn_liebiao = new cc.Sprite(res.bomb_anniu1).to(this).p(WIN_Width-50, WIN_Height-50);
        new cc.Sprite(res.bomb_liebiao).to(this.btn_liebiao).pp(0.5, 0.56);
        this.btn_liebiao.quickBt(function () {
            mlog("列表按钮", "预留");
        });
        // 描述说明 我现在是在哪里
    },
});
// 添加前置通用层
function addFrontBackLayer() {
    var scene = cc.director.getRunningScene();
    var layer = new backHallLayer();
    scene.addChild(layer, 999);
    scene.backHallLayer = layer;
}

var hall_Layer = cc.Layer.extend({
    ctor:function () {
        // 1. super init first
        this._super();
        // --- 添加背景图 ---
        this.bg = new cc.Sprite(res.wen4).to(this).pp().fullScreen();
        var helloLabel = new cc.LabelTTF("大厅", "Arial", 38).to(this, 5).pp(0.5, 0.95);
        helloLabel.setColor(cc.color(0, 0, 0));
        // --- 添加入口 ---
        this.addListView();
    },
    // 入口点击按钮
    createEnter: function(gameId) {
        var ary = SceneInCare[gameId];
        var item = new ccui.Layout();
        item.setContentSize(400, 30);
        item.setBackGroundColor(cc.color(74, 158, 215));
        item.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        item.setBackGroundColorOpacity(100);

        item._name = ary[0];
        item._showName = ary[1];

        var label = new cc.LabelTTF(gameId+":"+item._showName, "宋体", 23).anchor(0, 0.5).to(item).pp(0.05, 0.5);
        label.quickBt(function () {
            var mstr = "cc.director.runScene(new " + item._name + "())";
            eval(mstr);
            setTimeout("addFrontBackLayer()", 50);
        }, false, false, true);

        // item.clickBt(function () {
        //     var mstr = "cc.director.runScene(new " + item._name + "())";
        //     eval(mstr);
        //     setTimeout("addFrontBackLayer()", 50);
        // }, true);

        return item;
    },
    // 创建入口列表
    addListView: function() {
        var listView = new ccui.ListView();
        listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        listView.setTouchEnabled(true);
        listView.setBounceEnabled(true);
        listView.setBackGroundImage(res.cocosui_scrollviewbg);
        listView.setBackGroundImageScale9Enabled(true);
        listView.setContentSize(400, WIN_Height-200);
        listView.setScrollBarPositionFromCorner(cc.p(7, 7));
        listView.setItemsMargin(2.0);
        listView.x = 100;
        listView.y = 100;
        this.addChild(listView);

        for (var index in SceneInCare){
            var item = this.createEnter(index);
            listView.pushBackCustomItem(item);
        };

    },
});

var hall_Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new hall_Layer();
        this.addChild(layer);

        var layer2 = new backHallLayer();
        this.addChild(layer2);
    }
});

