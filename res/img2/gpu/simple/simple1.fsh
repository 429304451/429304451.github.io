varying vec2 v_texCoord;
varying vec4 v_fragmentColor;

void main()
{
    vec4 v4Colour = texture2D(CC_Texture0, v_texCoord);
    v4Colour.a = texture2D(CC_Texture0, v_texCoord).r;
    v4Colour.xyz = v4Colour.xyz * v4Colour.a;
    gl_FragColor = v4Colour;
    gl_FragColor.a = 1.0;
}