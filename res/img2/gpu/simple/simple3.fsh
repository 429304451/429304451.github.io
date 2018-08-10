varying vec2 v_texCoord;
varying vec4 v_fragmentColor;


void main()
{
    float waterwid = 0.1;
    float deepwid = 0.1;
    float PosX = 0.5;
	float PosY = 0.5;

    vec2 onePixel = vec2(waterwid/ 48.0, deepwid/ 32.0);
	vec4 color;
	color.rgb = vec3(0.5);
    color -= texture2D(CC_Texture0, v_texCoord - onePixel) * PosX;
    color += texture2D(CC_Texture0, v_texCoord + onePixel) * PosY;
    color.rgb = vec3((color.r + color.g + color.b) / 3.0);
    gl_FragColor = vec4(color.rgb, 1.);
}
