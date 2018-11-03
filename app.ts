///<reference path="./node_modules/@types/three/index.d.ts"/>

class ThreeJSTest {
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.Geometry;
    private material: THREE.ShaderMaterial;
    private torus: THREE.Mesh;
    private light: THREE.Light;
    private screenWidth: number = 640;
    private screenHeight: number = 480; 
    private uniforms: THREE.Uniform[];

    constructor() {
        this.createRenderer();
        this.createScene();
    }  

    private createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.renderer.setClearColor(new THREE.Color(0x495ed));
        document.getElementById("viewport").appendChild(this.renderer.domElement);
    }  

    private createScene() {
        this.scene = new THREE.Scene();
        this.geometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
  
        const vert = loadText("vertex.vs");
        const frag = loadText("fragment.fs");
        var otherUniforms = { modelcolor: new THREE.Uniform(new THREE.Vector3(0, 1, 0)) };
        this.uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib["lights"],
            otherUniforms
        ]);
        this.material = new THREE.ShaderMaterial({
            lights: true,
            uniforms: this.uniforms,
            vertexShader: vert,
            fragmentShader: frag
        });

        this.torus = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.torus);
        this.camera = new THREE.PerspectiveCamera(75, this.screenWidth /  this.screenHeight, 0.1, 1000);
        this.camera.position.set(3, 3, 3);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.light = new THREE.DirectionalLight(0xffffff);
        var lvec = new THREE.Vector3(1, 1, 1).normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
    } 

    public render() {
        this.torus.rotation.x += 0.01;

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));
    }

}

document.addEventListener("DOMContentLoaded", function () {
    var threeJSTest = new ThreeJSTest();
    threeJSTest.render();
});

function loadText(url: string) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);
    return xhr.responseText;
}