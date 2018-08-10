var binSpList = [res.wen4, res.gpu_wo];
var binList = [
    // fsh vsh 描述
    [res.gpu_bin1, res.gpu2, "水坑"],
    [res.gpu_bin2, res.gpu2, "人物发光"],
];

var binShaderSprite = cc.Sprite.extend({
    ctor:function (filename, fsh = res.gpu1, vsh = res.gpu2, parent) {
        this._super(filename);

        if( 'opengl' in cc.sys.capabilities ) {
            if(cc.sys.isNative){
                this.shader = new cc.GLProgram(vsh, fsh);
                this.shader.link();
                this.shader.updateUniforms();
            }
            else{
                this.shader = new cc.GLProgram(vsh, fsh);
                this.shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                this.shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                this.shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);

                this.shader.link();
                this.shader.updateUniforms();
                this.shader.use();

                this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('slider1'), parent.slider1Value);
                this.shader.setUniformLocationWith3f(this.shader.getUniformLocationForName('binColor'), parent.posX, parent.posY, parent.slider2Value);
            }
            if(cc.sys.isNative){
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.shader);

                glProgram_state.setUniformFloat("slider1", parent.slider1Value);
                glProgram_state.setUniformVec3("binColor", {x: parent.posX, y: parent.posY, z: parent.slider2Value});

                this.setGLProgramState(glProgram_state);
            }else{
                this.shaderProgram = this.shader;
            }
        }
    },
    changeShaderSate:function (slider1, slider2, posX, posY) {
        if( 'opengl' in cc.sys.capabilities ) {
            if(cc.sys.isNative){
                this.getGLProgramState().setUniformFloat("slider1", slider1);
                this.getGLProgramState().setUniformVec3("binColor", {x: posX, y: posY, z: slider2});
            }else{
                this.shader.use();

                this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('slider1'), slider1);
                this.shader.setUniformLocationWith3f(this.shader.getUniformLocationForName('binColor'), posX, posY, slider2);
                
                this.shader.updateUniforms();
            }
        }
    },
});


var binShaderLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.posX = 0.5;
        this.posY = 0.5;
        this.slider1Value = 0.85;
        this.slider2Value = 0.06;
        this.addY = 50;

        var self = this;
        this.nowIndex = 1;
        this.upLimit  = binList.length - 1;
        // 添加背景图
        this.bg = new cc.Sprite(cRes.bg1).to(this).pp();
        this.bg.setScaleY(_gm.bgScaleH);
        // 左边原图
        this.pic1 = new cc.Sprite(res.wen4).to(this).p(V.w/4, V.h/2+this.addY);
        this.pic1.setScale(0.5);
        // 右边为变化后的图片
        this.pic2 = new binShaderSprite(binSpList[1], binList[this.nowIndex][0], binList[this.nowIndex][1], this).to(this).p(V.w*3/4, V.h/2+this.addY);
        this.pic2.setScale(0.5);
        // 简单的描述
        this.desc = new cc.LabelTTF((this.nowIndex+1)+" : "+binList[this.nowIndex][2], "宋体", 25).to(this).p(V.w/2, 220).bindTouchLocate();
        this.addSlider();
        // MAddSlider(this, 1)
        // 左右按钮
        this.btn_left  = new cc.Sprite(res.cocosui_b1).to(this).p(460, 100);
        this.btn_left.quickBt(function () {
            self.changIndex(1);
        });
        this.btn_right = new cc.Sprite(res.cocosui_f1).to(this).p(V.w-460, 100);
        this.btn_right.quickBt(function () {
            self.changIndex(-1);
        });
        this.btn_mid = new cc.Sprite(res.cocosui_r1).to(this).p(V.w/2, 100);
        this.spIndex = 0;
        this.btn_mid.quickBt(function () {
            self.spIndex = self.spIndex + 1;
            if (self.spIndex < 0) {
                self.spIndex = binSpList.length-1;
            } else if (self.spIndex > binSpList.length-1) {
                self.spIndex = 0;
            }
            self.pic1.display(binSpList[self.spIndex]);
            self.pic2.display(binSpList[self.spIndex]);
        });

        this.bagTouch();
    },
    changIndex: function(arg) {
        this.nowIndex = this.nowIndex + arg;
        if (this.nowIndex < 0) {
            this.nowIndex = this.upLimit;
        } else if (this.nowIndex > this.upLimit) {
            this.nowIndex = 0;
        }
        this.pic2.removeFromParent();
        this.pic2 = new binShaderSprite(binSpList[this.spIndex], binList[this.nowIndex][0], binList[this.nowIndex][1], this).to(this).p(V.w*3/4, V.h/2+this.addY);
        this.pic2.setScale(0.5);

        this.desc.setString( (this.nowIndex+1)+" : "+binList[this.nowIndex][2] );
        this.bagTouch();
    },
    bagTouch:function () {
        var self = this;
        this.pic2.bindTouch({
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var touchPoint = touch.getLocation()
                var locationInNode = target.convertToNodeSpace(touchPoint);
                var s = target.getContentSize();

                self.posX = locationInNode.x/s.width;
                self.posY = 1.0 - locationInNode.y/s.height;

                return true;
            },
            onTouchMoved: function(touch, event) {
                var target = event.getCurrentTarget();
                var touchPoint = touch.getLocation()
                var locationInNode = target.convertToNodeSpace(touchPoint);
                var s = target.getContentSize();

                self.posX = locationInNode.x/s.width;
                self.posY = 1.0 - locationInNode.y/s.height;
                self.updateState();
            },
            onTouchEnded: function(touch, event) {
                console.log("self.posX", self.posX, "self.posY", self.posY);

            },
        });
    },
    updateState:function () {
        this.pic2.changeShaderSate(this.slider1Value, this.slider2Value, this.posX, this.posY);
    },
    addSlider:function () {
        var slider = new cc.ControlSlider(res.cocosui_sliderTrack, res.cocosui_sliderProgress, res.cocosui_sliderThumb).anchor(0.5, 0.5);
        slider.setMinimumValue(0.0); // Sets the min value of range
        slider.setMaximumValue(1.0); // Sets the max value of range
        slider.x = 450;
        slider.y = 165;
        slider.setValue(this.slider1Value);
        slider.addTargetWithActionForControlEvents(this, this.onSlider1, cc.CONTROL_EVENT_VALUECHANGED);
        this.addChild(slider);
        
        
        var slider2 = new cc.ControlSlider(res.cocosui_sliderTrack, res.cocosui_sliderProgress, res.cocosui_sliderThumb).anchor(0.5, 0.5);
        slider2.setMinimumValue(0.0); // Sets the min value of range
        slider2.setMaximumValue(1.0); // Sets the max value of range
        slider2.x = V.w-450;
        slider2.y = 165;
        slider2.setValue(this.slider2Value);
        slider2.addTargetWithActionForControlEvents(this, this.onSlider2, cc.CONTROL_EVENT_VALUECHANGED);
        this.addChild(slider2);
    },
    onSlider1:function (sender, controlEvent) {
        this.slider1Value = sender.getValue();
        // console.log("this.slider1Value", this.slider1Value);
        this.updateState();
    },
    onSlider2:function (sender, controlEvent) {
        this.slider2Value = sender.getValue();
        // console.log("this.slider2Value", this.slider2Value);
        this.updateState();
    },

});

var binShaderScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new binShaderLayer();
        this.addChild(layer);
    }
});

