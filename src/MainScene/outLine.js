

var outLineLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        // 添加背景图
        // this.bg = new cc.Sprite(cRes.bg1).to(this).pp();
        // this.bg.setScaleY(_gm.bgScaleH);
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        var self = this;
        // create and initialize a label
        // var helloLabel = new cc.LabelTTF("outLineLayer", "Arial", 38).to(this, 5).pp(0.5, 0.7);
        // add "HelloWorld" splash screen"
        // this.sprite = new cc.Sprite(res.HelloWorld_png).to(this).pp();
        // this.testMyStroke();
        this.testStroke();

        return true;
    },
    testStroke: function () {
        var jsLabel = new cc.LabelTTF("Cocos2dJs-createStroke", "Arial", 60, cc.size(V.w, 60), cc.TEXT_ALIGNMENT_CENTER).to(this).p(V.w*0.3, V.h*0.9);
        jsLabel.setColor(cc.color(255, 0, 0));

        var renderTexture = this.createStroke(jsLabel, 10, cc.color(255, 255, 255), 255);
        this.addChild(renderTexture);
    },
    testMyStroke:function () {
        var jsLabel = new cc.LabelTTF("Cocos2dJs-createStroke", "Arial", 60).to(this).p(V.w*0.3, V.h*0.9);
        jsLabel.setColor(cc.color(255, 0, 0));
        // jsLabel.bindTouchLocate();

        var renderTexture = this.outline(jsLabel, 4, cc.color(255, 255, 255), 255, {dir : -1});
        this.addChild(renderTexture);
        renderTexture.p(V.w*0.3, V.h*0.9);
    },
    createStroke:function (node, strokeWidth, color, opacity) {
        var w = node.getTextureRect().width  + strokeWidth * 2;
        var h = node.getTextureRect().height + strokeWidth * 2;
        console.log(w, h);
        var rt = new cc.RenderTexture(w, h);
        var originX = node.getPositionX();
        var originY = node.getPositionY();

        // 记录原始颜色RGB信息
        var originColorR = node.getColor().r;
        var originColorG = node.getColor().g;
        var originColorB = node.getColor().b;
        console.log(node.getColor());
        // 记录原始透明度信息
        var originOpacity = node.getOpacity();
        // 记录原始是否显示
        var originVisibility = node.isVisible();
        // 记录原始混合模式
        var originBlend = node.getBlendFunc();

        node.setColor(color);
        node.setOpacity(opacity)
        node.setVisible(true);
        // 设置新的混合模式
        var blendFuc = new cc.BlendFunc(cc.SRC_ALPHA, cc.ONE);
        node.setBlendFunc(blendFuc);

        var bottomLeftX = node.getTextureRect().width * node.getAnchorPoint().x + strokeWidth;
        var bottomLeftY = node.getTextureRect().height * node.getAnchorPoint().y + strokeWidth;

        console.log("node.getAnchorPoint()", node.getAnchorPoint());

        var positionOffsetX = node.getTextureRect().width * node.getAnchorPoint().x - node.getTextureRect().width/2;
        var positionOffsetY = node.getTextureRect().height * node.getAnchorPoint().y - node.getTextureRect().height/2;

        var rtPosition = cc.p(originX - positionOffsetX, originY - positionOffsetY);
        rt.begin();
            // 步进值这里为10，不同的步进值描边的精细度也不同
            // for (var i = 0; i <= 360; i += 10) {
            //     // var x = bottomLeftX + Math.sin(Utils.rad(i)) * strokeWidth;
            //     // var y = bottomLeftY + Math.cos(Utils.rad(i)) * strokeWidth;
            //     // console.log(x, y);
            //     var x = 10 + i;
            //     var y = 360;
            //     // 这里解释了为什么要保存原来的初始信息
            //     node.setPosition(cc.p(x, y));
            //     node.retain();
            //     node.visit();
            // }
            // node.setPosition()

            // this._brushs = [];
            // for(i = 0; i < distance; ++i) {
            //     var diffX = locLastLocation.x - location.x;
            //     var diffY = locLastLocation.y - location.y;
            //     var delta = i / distance;
            //     var sprite = new cc.Sprite(res.HelloWorld_png);
            //     sprite.attr({
            //         x: location.x + diffX * delta,
            //         y: location.y + diffY * delta,
            //         rotation: Math.random() * 360,
            //         color: cc.color(Math.random() * 255, 255, 255),
            //         scale: Math.random() + 0.25,
            //         opacity: 20
            //     });
            //     sprite.parent = this;
            //     sprite.retain();
            //     this._brushs.push(sprite);
            // }
            // for (i = 0; i < distance; i++) {
            //     this._brushs[i].visit();
            // }


        rt.end();

        // 恢复原状
        // node.p(originX, originY);
        // node.setColor(cc.color(originColorR, originColorG, originColorB));
        // node.setBlendFunc(originBlend);
        // node.setVisible(originVisibility);
        // node.setOpacity(originOpacity);

        // rt.setPosition(rtPosition)
        // // 设置反锯齿
        // rt.getSprite().texture.setAntiAliasTexParameters();

        return rt
    },
    outline:function (node, strokeWidth, color, opacity, option) {
        var w = node.getTextureRect().width  + strokeWidth * 2;
        var h = node.getTextureRect().height + strokeWidth * 2;
        var rt = new cc.RenderTexture(w, h);

        // 记录原始颜色RGB信息
        var originColorR = node.getColor().r;
        var originColorG = node.getColor().g;
        var originColorB = node.getColor().b;
        // 记录原始透明度信息
        var originOpacity = node.getOpacity();
        // 记录原始是否显示
        var originVisibility = node.isVisible();
        // 记录原始混合模式
        var originBlend = node.getBlendFunc();

        // 绘制图形
        this.draw(rt, node, strokeWidth, color, opacity);
        // 擦出描边
        this.eraser(rt, node, w, h, option);

        // 恢复原状
        node.setColor(cc.color(originColorR, originColorG, originColorB));
        node.setBlendFunc(originBlend);
        node.setVisible(originVisibility);
        node.setOpacity(originOpacity);

        return rt
    },
    // 绘制图形
    draw:function (rt, node, strokeWidth, color, opacity) {
        // 设置颜色、透明度、显示
        node.setColor(color);
        node.setOpacity(opacity);
        node.setVisible(true);

        this.setBlendFn(node, cc.SRC_ALPHA, cc.ONE);
        // 这里考虑到锚点的位置，如果锚点刚好在中心处，代码可能会更好理解点
        var bottomLeftX = node.getTextureRect().width * node.getAnchorPoint().x;
        var bottomLeftY = node.getTextureRect().height * node.getAnchorPoint().y;

        rt.begin();
            // 步进值这里为10，不同的步进值描边的精细度也不同
            for (var i = 0; i < 360; i += 10) {
                var x = bottomLeftX + Math.sin(Utils.rad(i)) * strokeWidth;
                var y = bottomLeftY + Math.cos(Utils.rad(i)) * strokeWidth;
                // 这里解释了为什么要保存原来的初始信息
                node.setPosition(cc.p(x, y));
                node.visit();
            }
        rt.end();

        // 设置反锯齿
        rt.getSprite().texture.setAntiAliasTexParameters();
    },
    eraser: function (rt, node, w, h, option) {
        var eraser = new cc.Sprite(res.bar);
        eraser.setScaleY(30);
        eraser.setScaleX(0.1);

        this.setBlendFn(node, cc.ZERO, cc.ONE_MINUS_SRC_ALPHA);
        this.setBlendFn(eraser, cc.ZERO, cc.ONE_MINUS_SRC_ALPHA);

        rt.begin();
            var x = node.getTextureRect().width * node.getAnchorPoint().x;
            var y = node.getTextureRect().height * node.getAnchorPoint().y;
            node.p(x, y);
            node.visit();

            if (option.dir == -1) {
                for (var i = 1; i <= 10; i+=w) {
                    eraser.setPositionX(i);
                    eraser.visit();
                }
            } else if (option.dir == 1) {
                eraser.setRotation(90);
                for (var i = 1; i <= 10; i+=h) {
                    eraser.setPositionY(i);
                    eraser.visit();
                }
            }
        rt.end();
    },
    setBlendFn:function (node, src, dst) {
        // 设置新的混合模式
        var blendFuccc = new cc.BlendFunc(src, dst);
        // blendFuccc.src = src;
        // blendFuccc.dst = dst;
        node.setBlendFunc(blendFuccc);
    },

});

var outLineScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new outLineLayer();
        this.addChild(layer);
    }
});

