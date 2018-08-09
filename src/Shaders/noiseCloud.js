

var ShaderNoiseCloud = cc.Sprite.extend({
    ctor: function (filename, fsh = res.gpu_noiseCloud1, vsh = res.gpu_noiseCloud2) {
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
                this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_cloudSpeed'), 1.0);
                this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_amount'), 1.1);

                var texture1 = cc.textureCache.addImage(res.noise_512);
                texture1.setTexParameters(gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT);
                var texture2 = cc.textureCache.addImage(res.noise_256);
                texture1.setTexParameters(gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT);

                // gl.bindTexture(gl.TEXTURE_2D, texture1);
                // this.shader.setUniformTexture("caustics", texture1);

                var alphaTexture = cc.textureCache.addImage(res.noise_512);
                // var glProgramState = cc.GLProgramState.getOrCreateWithGLProgram(shader);
                this.shader.setUniformTexture("u_alphaTexture", alphaTexture);
                // sprite.setGLProgramState(glProgramState);

                // this._state.setUniformTexture("caustics", shining_texture);
                // this.shader.setUniformLocationWith3f(this.shader.getUniformLocationForName('u_outlineColor'), 0 / 255, 255 / 255, 0 / 255);
                this.shaderProgram = this.shader;

            }


            // if(cc.sys.isNative){
            //     var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.shader);
            //     // glProgram_state.setUniformFloat("u_threshold", 1.75);
            //     // glProgram_state.setUniformVec3("u_outlineColor", {x: 0/255, y: 255/255, z: 0/255});
            //     this.setGLProgramState(glProgram_state);
            // }else{
            //     this.shaderProgram = this.shader;
            // }
        }
    }
});

var noiseCloudLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        // 添加背景图
        // this.bg = new cc.Sprite(cRes.bg1).to(this).pp();
        // this.bg.setScaleY(_gm.bgScaleH);

        // this.bag = new ShaderNoiseCloud(res.wen4).to(this).p(V.w/2, V.h/2);


        var sprite = new cc.Sprite(res.wen4);
        sprite.x = cc.winSize.width  / 2;
        sprite.y = cc.winSize.height / 2;
        this.addChild(sprite);

        var shader = new cc.GLProgram(res.gpu_noiseCloud2, res.gpu_noiseCloud1);
        shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
        shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
        shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
        shader.link();
        shader.updateUniforms();
        shader.use();

        shader.setUniformLocationWith1f(shader.getUniformLocationForName('u_cloudSpeed'), 1.0);
        shader.setUniformLocationWith1f(shader.getUniformLocationForName('u_amount'), 1.1);

        var texture1 = cc.textureCache.addImage(res.noise_512);
        texture1.setTexParameters(gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT);
        var texture2 = cc.textureCache.addImage(res.noise_256);
        texture1.setTexParameters(gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT);

        var alphaTexture = cc.textureCache.addImage(res.noise_512);
        var glProgramState = cc.GLProgramState.getOrCreateWithGLProgram(shader);
        // gl.bindTexture(gl.TEXTURE_2D, texture1);

        sprite.setGLProgramState(glProgramState);
        // glProgramState.setUniformTexture("u_alphaTexture1", texture1);
        // glProgramState.setUniformTexture("u_alphaTexture2", texture2);



        return true;
    },
});

var noiseCloudScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new noiseCloudLayer();
        this.addChild(layer);
    }
});

