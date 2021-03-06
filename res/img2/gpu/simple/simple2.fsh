#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_texCoord;
varying vec4 v_fragmentColor;


void main()
{
	vec3 texel = texture2D(CC_Texture0, v_texCoord).rgb;
	texel = vec3(dot(vec3(0.3, 0.2, 0.5), texel));
	texel = vec3(texture2D(CC_Texture0, vec2(texel.r, .16666)).r);
	gl_FragColor = vec4(texel, 1.0);

    
}