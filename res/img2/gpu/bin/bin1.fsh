#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

uniform vec3 binColor;
uniform float slider1;

const float pi = 3.141592653589793;

float CountScale(float left, float right)
{
    //水深
    float depth = binColor.y;
    //防止怪异现象
    if (depth > 1.)
    {
        depth = 1.;
    }
    else if (depth < 0.)
    {
        depth = 0.;
    }
    //像素Y值缩放
    float scale = 1.-depth;
    float length = right - left;
    float mysca = pi/length;
    //向下弯曲的坐标值定在0.-1.之间
    float pos = (v_texCoord.x - left)/length;
    if (pos < (1.-binColor.z)/2. )
    {
        pos = 1./(1.-binColor.z)*(pos);
        scale = (1.-depth) + depth *(0.5001-0.5*(sin(-pi/2.+pos*2.*pi)) );
    } else if( pos > (1.+binColor.z)/2.) {
        pos = 1./(1.-binColor.z)*(pos-binColor.z);
        scale = (1.-depth)+ (depth)*(.5001-.5*( sin(-pi/2.+(pos)*2.*pi) ) );
    }
    return scale;
}


void main()
{
	float scale = 1.;
    float left  = binColor.x - slider1/2.;
    float right = binColor.x + slider1/2.;
    if (v_texCoord.x > left && v_texCoord.x < right )
    {
        scale = CountScale(left,right);
    }
    vec4 mycolor = vec4(0.0);
    if (1.-v_texCoord.y < scale )
    {
        mycolor = texture2D(CC_Texture0, vec2(v_texCoord.x,1./scale*(v_texCoord.y-1.+scale))  );
    }
    gl_FragColor = mycolor;
}