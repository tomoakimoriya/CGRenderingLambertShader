struct DirectionalLight {
    vec3 direction;
    vec3 color;
};

uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
uniform vec3 modelcolor;
varying vec3 vnormal;
void main()
{
    float lambert = dot(vnormal, directionalLights[0].direction);
    vec3 pcolor = modelcolor * lambert;
    gl_FragColor = vec4( pcolor.xyz, 1.0 );
}
