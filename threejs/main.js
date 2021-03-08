// ThreeJS variables
var camera, scene, renderer;

// OrbitControls (camera)
var controls;

// Optional (showFps)
var stats;

// Objects in Scene
var sun, earth;
// To be added 
// var moon; ...  

// Light in the scene 
var sunlight;


function init() {

    // Setting up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    window.addEventListener('resize', onWindowResize, false);
    renderer.setSize(window.innerWidth, window.innerHeight); 

    // Setting up camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.5, 1000 );
    camera.position.z = 3;
    camera.position.y = 20;
    camera.lookAt( 0, 0, -4);
    
    

    // Setting up scene
    scene = new THREE.Scene();
    // Earth
    earth = createSphere(1, 20, 'texture/earth.jpg', 'Phong');
    earth.position.z = -12;

    // Sun (Sphere + Light)
    sun = createSphere(1.25, 20, 'texture/sun.jpg');
    sun.position.z = -3;
    /* Complete: add light
    sunlight...;
    sun...
    */

    /* Complete: add 
    other planets */ 

    scene.add(earth);
    scene.add(sun);

    
    // Adding both renderer and stats to the Web page, also adjusting OrbitControls
    stats = new Stats();
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.zoomSpeed = 2;

    // Adding listener for keydown 
    document.addEventListener("keydown", onDocumentKeyDown, false);

    // Saving initial position 
    scene.traverse( function( node ) {
        if ( node instanceof THREE.Object3D ) {
            node.savePosition();
        }
    
    } ); 
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
}

function onDocumentKeyDown(event) {
    console.log(event.which);
}

function animate() {
    
    requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    stats.update();
    renderer.render( scene, camera );
    earth.rotation.y+=0.02
    

}

init();
animate();


