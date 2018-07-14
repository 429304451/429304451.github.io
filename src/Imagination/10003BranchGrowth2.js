
var BranchSp = cc.Sprite.extend({
    ctor:function (params) {
        // this._super(res.tree1);
        this._imagePath = params.img;
        this._rootPosition = params.position;

        this.Time = 1;
        this.TreeTab = {};
        this._AddR = 51;
        this._AddG = 0;

        this.loadDisplay();
        this.loadBatchNode();
        this.run();

    },
    loadDisplay: function () {
        this._radius       = 1;
        this._angle        = 90;
        this._offsetRadius = 0.01;
        this._offsetTime   = 0.01;
        this._offsetMove   = 1.5;
    },
    loadBatchNode: function () {
        this._batch = new cc.SpriteBatchNode(this._imagePath, 99999);
        this.addChild(this._batch);
    },
    // 生长
    run: function () {
        var radius    = 1.0/3;
        var angle     = 90;
        for (var i = 0; i <= 3; i++) {
            var x     = 0 - 2 * radius;
            var y     = 0;
            var node = new cc.Sprite(this._imagePath);
            node.p(x, y);
            node.setScale(radius);
            node.to(this._batch)
            node._angle = angle;
            node._radius = radius;
            node._runTime = 1;
            this.createSubTree(node);
        }
    },
    die: function (PosY) {
        var length = this.TreeTab.length
        for (var i = 1; i <= length; i++) {
            var index = length-i+1;
            if (this.TreeTab[index].getPositionY() > PosY) {
                this.TreeTab[index].removeFromParent();
                this.TreeTab.splice(index, 1)
            }
        }
        console.log("length", length);
    },
    createSubTree: function (parentTree) {
        if (parentTree._radius <= this._offsetRadius)
            return null;
        // 建立集合,存储数据
        var treeSet                   = {};
        // 生命小于10的不拆
        if (parentTree._radius > 2*this._offsetRadius && parentTree._runTime < 50) {
            var runTime               = parentTree._runTime + 1;
            var radius                = parentTree._radius;
            if (parentTree._radius > 2*this._offsetRadius && runTime % 12 == 0) {
                radius = radius - this._offsetRadius
            }
            var angle                 = parentTree._angle + Utils.rand(-5, 5);
            var x                     = Math.cos(Utils.rad(parentTree._angle))*this._offsetMove+parentTree.px()
            var y                     = Math.sin(Utils.rad(parentTree._angle))*this._offsetMove+parentTree.py()
            var tree                  = new cc.Sprite(this._imagePath);
            tree._angle               = angle
            tree._radius              = radius 
            tree._runTime             = runTime
            tree.p(x,y)
            tree.setColor(cc.color(255, 0, 0))
            tree.setColor(cc.color(this._AddR, this._AddG, 0))

            this._AddR = this._AddR + 0.02
            this._AddG = this._AddG + 0.02
            treeSet.push(tree)
            this.TreeTab.push(tree)
        } else {
            var runTime               = 1
            var radius                = parentTree._radius-this._offsetRadius
            var angle                 = parentTree._angle + Utils.rand(-5, 5);
            var x                     = Math.cos(Utils.rad(parentTree._angle))*this._offsetMove+parentTree.px()
            var y                     = Math.sin(Utils.rad(parentTree._angle))*this._offsetMove+parentTree.py()
            for (var i = 1; i <= 2; i++) {
                var tree              = new cc.Sprite(this._imagePath);
                tree._angle           = angle
                tree._radius          = radius
                tree._runTime         = runTime
                tree.p(x,y)
                if (i == 2) {
                    tree._radius      = radius - 2 * this._offsetRadius
                }
                treeSet.push(tree)
                this.TreeTab.push(tree)
                tree.setColor(cc.color(this._AddR, this._AddG, 0))
                this._AddR = this._AddR + 0.02
                this._AddG = this._AddG + 0.02
            }
        }
        for(var i = 0,len = treeSet.length; i < len; i++){
            var tree = treeSet[i];
            tree.scale(tree._radius)
            tree.to(this._batch)
            var action = cc.sequence(
                cc.delayTime(this._offsetTime),
                cc.callFunc(function () {
                    this.createSubTree(tree);
                }, this)
            );
        }


    },
});

var BranchGrowthLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        // 添加背景图
        // this.bg = new cc.Sprite(cRes.bg1).to(this).pp();
        // this.bg.setScaleY(_gm.bgScaleH);
        // 文字描述
        var helloLabel = new cc.LabelTTF("BranchGrowth", "Arial", 38).to(this, 5).pp(0.5, 0.7);
        // add "HelloWorld" splash screen"
        // this.sprite = new cc.Sprite(res.HelloWorld_png).to(this).pp();

        // this.sprite.quickBt(function () {
        //     mlog("HelloWorld")
        // });
        // this.Tree = new BranchSp({img: res.tree1, position: cc.p(V.w/2, 0)}).to(this).p(WIN_down);

        return true;
    },
});

var BranchGrowth = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BranchGrowthLayer();
        this.addChild(layer);
    }
});

