#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

uniform vec3 binColor;
uniform float slider1;

//所需常量

//#define time CC_Time.x
float time = 0.5;
float Scale = 1.0;


// #define outlineSize 10.*sin(2.*CC_Time[1])
float outlineSize = 10.*sin(2.*CC_Time[1]);
//CC_Time[1]; 
// 10.*sin(2.*CC_Time[1]);
// 描边宽度，直接以像素为单位会有分辨率不同大小不同的问题，所以就用比例吧
// 描边颜色
//float outlineColor = vec3( abs(sin(outlineSize/10.)) , 0., 0.);
#define outlineColor vec3( abs(sin(outlineSize/10.)) , 0., 0.) 
// 纹理大小（宽和高），为了计算周围各点的纹理坐标，必须传入它，因为纹理坐标范围是0~1
#define textureSize vec2(215.0,299.0) 

// 判断在这个角度上距离为outlineSize那一点是不是透明
int getIsStrokeWithAngel(float angel)
{
    int stroke = 0;
    // 这个浮点数是 pi / 180，角度转弧度
    float rad = angel * 0.01745329252; 
    float a = texture2D(CC_Texture0, vec2(v_texCoord.x + outlineSize * cos(rad) / textureSize.x, v_texCoord.y + outlineSize * sin(rad) / textureSize.y)).a; 
    // 我把alpha值大于0.5都视为不透明，小于0.5都视为透明
    if (a >= 0.01)
    {
        stroke = 1;
    }
    return stroke;
}


void main() {
    // 我的颜色
    vec4 myC = texture2D(CC_Texture0, vec2(v_texCoord.x, v_texCoord.y)); 
    if (myC.a >= 0.5) // 不透明，不管，直接返回
    {
        gl_FragColor =  v_fragmentColor*myC;
        return;
    }
    int strokeCount = 0;
    strokeCount += getIsStrokeWithAngel(0.0);
    strokeCount += getIsStrokeWithAngel(30.0);
    strokeCount += getIsStrokeWithAngel(60.0);
    strokeCount += getIsStrokeWithAngel(90.0);
    strokeCount += getIsStrokeWithAngel(120.0);
    strokeCount += getIsStrokeWithAngel(150.0);
    strokeCount += getIsStrokeWithAngel(180.0);
    strokeCount += getIsStrokeWithAngel(210.0);
    strokeCount += getIsStrokeWithAngel(240.0);
    strokeCount += getIsStrokeWithAngel(270.0);
    strokeCount += getIsStrokeWithAngel(300.0);
    strokeCount += getIsStrokeWithAngel(330.0);
    float dis = pow( pow(abs(v_texCoord.x-0.5),2.) + pow(abs(v_texCoord.y-0.5),2.) , 4.);
    // 四周围至少有一个点是不透明的，这个点要设成描边颜色
    if (strokeCount > 0) 
    {
        myC.rgb = outlineColor;
        myC.a = 1.0*dis;
    }

    gl_FragColor = v_fragmentColor * myC;
}
