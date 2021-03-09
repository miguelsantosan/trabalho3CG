// ThreeJS variables
var camera, scene, renderer;

// OrbitControls (camera)
var controls;

// Optional (showFps)
var stats;

// Objects in Scene
// Os planestas tem 2 variáveis em particular usadas pro movimento de revolução
// planetaDistance -> É a distância entre o planeta e o Sol
// planetaRevolutionAngle -> É o ângulo do movimento de revolução, que é incrementado a cada chamada da função animate()
// A Lua também tem essa variáveis, com a diferença de q a distância é entre ela e a Terra
// Os ângulos de revolução são inicializados como 0, e vão aumentado conforme o objeto faz o movimento de revolução
// As distâncias são inicializadas com a posição Z do objeto.
// Ao inicializar o objeto, guardo sua posição Z como distância pra poder usar no movimento circular da revolução
// Em outras palavras, uso coordenadas polares pro movimento de revolução, onde o raio é a distância do objeto até o pivot, e o pivot é:
//// - Para os planetas: posição do Sol
//// - Para a Lua: posição da Terra

// Sun
var sun;
var sunRadius;
// Light in the scene 
var sunlight;

// Mercury
var mercury;
var mercuryRadius;
var mercuryRotationTimeInDays = 58;
var mercuryRevolutionTimeInDays = 88;
var mercuryRotationSpeed;
var mercuryRevolutionSpeed;
var mercuryDistance;
var mercuryRevolutionAngle;

// Venus
var venus;
var venusRadius;
var venusRotationTimeInDays = 243;
var venusRevolutionTimeInDays = 225;
var venusRotationSpeed;
var venusRevolutionSpeed;
var venusDistance;
var venusRevolutionAngle;

// Earth, Moon
var earth, moon;
var earthRadius, moonRadius;
var earthRevolutionTimeInDays = 365;
var earthRotationSpeed = 0.02;
var earthRevolutionSpeed;
var earthDistance;
var earthRevolutionAngle;
var moonRotationTimeInDays = 30;
var moonRevolutionTimeInDays = 30;
var moonRotationSpeed;
var moonRevolutionSpeed;
var moonDistance;
var moonRevolutionAngle;

// Mars
var mars;
var marsRadius;
var marsRotationTimeInDays = 1;
var marsRevolutionTimeInDays = Math.round(365*1.88);
var marsRotationSpeed;
var marsRevolutionSpeed;
var jupiterDistance;
var jupiterRevolutionAngle;

// Jupiter
var jupiter;
var jupiterRadius;
var jupiterRotationTimeInDays = 0.4;
var jupiterRevolutionTimeInDays = Math.round(365*11.86);
var jupiterRotationSpeed;
var jupiterRevolutionSpeed;
var jupiterDistance;
var jupiterRevolutionAngle;

// Saturn, Saturn ring
var saturn, saturnRing;
var saturnRadius, saturnRingInnerRadius, saturnRingOuterRadius;
var saturnRotationTimeInDays = 0.5;
var saturnRevolutionTimeInDays = 29;
var saturnRotationSpeed;
var saturnRevolutionSpeed;
var saturnDistance;
var saturnRevolutionAngle;


// Uranus
var uranus;
var uranusRadius;
var uranusRotationTimeInDays = 0.7;
var uranusRevolutionTimeInDays = 84;
var uranusRotationSpeed;
var uranusRevolutionSpeed;
var uranusDistance;
var uranusRevolutionAngle;

// Neptune
var neptune;
var neptuneRadius;
var neptuneRotationTimeInDays = 0.6; // Aqui arredondei pra baixo só pra não ficar igual ao de Urano
var neptuneRevolutionTimeInDays = 165;
var neptuneRotationSpeed;
var neptuneRevolutionSpeed;
var neptuneDistance;
var neptuneRevolutionAngle;

// Atribuindo os raios de cada planeta, em proporção ao tamanho do Sol
// Deixando todos os tamanhos em proporção ao tamanho do Sol, se eu quiser mudar o tamanho do sistema inteiro, basta mudar apenas o do Sol
// Sol > Jupiter > Saturno > Urano > Netuno > Terra > Venus > Marte > Mercurio > Lua
sunRadius = 1.25

mercuryRadius = sunRadius * 0.05;

venusRadius = sunRadius * 0.1;

earthRadius = sunRadius * 0.12;
moonRadius = earthRadius * 0.20; // sunRadius * 0.024

marsRadius = sunRadius * 0.08;

jupiterRadius = sunRadius * 0.4;

saturnRadius = sunRadius * 0.35;
saturnRingInnerRadius = saturnRadius * 1.5;
saturnRingOuterRadius = saturnRingInnerRadius * 1.5;

uranusRadius = sunRadius * 0.19;

neptuneRadius = sunRadius * 0.18;

// No classroom a função animate() já veio com earth.rotation.y+=0.02
// Então vou considerar este valor como a velocidade com que a Terra rotaciona
// Uso então esse valor pra obter as velocidades de rotação e de revolução dos outros planetas
// Pra simplificar, vou arredondar os valores dados no enunciado da lista
// Pra achar a velocidade de rotação de cada planeta, uso regra de 3. Vou usar Mercúrio de exemplo
// 0,02 --- 1 dia
//    x --- 59 dias
// 0,02/x = 1/59
// Mas a velocidade é inversamente proporcional à quantidade de dias que leva para terminar uma rotação, então inverto uma das frações
// x/0,02 = 1/59
// x = 0,02/59 = 0,000338983051
// Arredondo e fico com x = 0,00034
// Assim, encontrei a velocidade de rotação de Mercúrio
// Posso generalizar para qualquer valor de dias que leva para um planeta arbitrário terminar uma rotação
// planetaVelocidadeRotacao = terraVelocidadeRotacao/planetaTempoRotacao
mercuryRotationSpeed = earthRotationSpeed / mercuryRotationTimeInDays;
venusRotationSpeed = earthRotationSpeed / venusRotationTimeInDays;
moonRotationSpeed = earthRotationSpeed / moonRotationTimeInDays;
marsRotationSpeed = earthRotationSpeed / marsRotationTimeInDays;
jupiterRotationSpeed = earthRotationSpeed / jupiterRotationTimeInDays;
saturnRotationSpeed = earthRotationSpeed / saturnRotationTimeInDays;
uranusRotationSpeed = earthRotationSpeed / uranusRotationTimeInDays;
neptuneRotationSpeed = earthRotationSpeed / neptuneRotationTimeInDays;

// Agora faço o mesmo para a velocidade de revolução
// Seja v a velocidade de revolução da Terra
// 0,02 --- 1 dia
//    v --- 365 dias
// 0,02/v = 1/59
// Inverto uma das frações, como fiz com a velocidade de rotação
// v/0,02 = 1/365
// v = 0,02/365 = 0,0000547945
// Arredondo e fico com v = 0,000055
// Encontrei a velocidade de revolução da terra
mercuryRevolutionSpeed = earthRotationSpeed / mercuryRevolutionTimeInDays;
venusRevolutionSpeed = earthRotationSpeed / venusRevolutionTimeInDays;
earthRevolutionSpeed = earthRotationSpeed / earthRevolutionTimeInDays;
moonRevolutionSpeed = earthRotationSpeed / moonRevolutionTimeInDays;
marsRevolutionSpeed = earthRotationSpeed / marsRevolutionTimeInDays;
jupiterRevolutionSpeed = earthRotationSpeed / jupiterRevolutionTimeInDays;
saturnRevolutionSpeed = earthRotationSpeed / saturnRevolutionTimeInDays;
uranusRevolutionSpeed = earthRotationSpeed / uranusRevolutionTimeInDays;
neptuneRevolutionSpeed = earthRotationSpeed / neptuneRevolutionTimeInDays;


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

    // Sun (Sphere + Light)
    sun = createSphere(sunRadius, 20, 'texture/sun.jpg');
    sun.position.z = -3;
    const sunlight = new THREE.PointLight( 0xffffff, 1.5 );
    sunlight.position.set( sun.position.x, sun.position.y, sun.position.z );
    
    // Mercury
    mercury = createSphere(mercuryRadius, 20, 'texture/mercury.jpg');
    mercury.position.z = - (mercuryRadius + sunRadius)*1.25;
    mercuryDistance = mercury.position.z;
    mercuryRevolutionAngle = 0;

    // Venus
    venus = createSphere(venusRadius, 20, 'texture/venus.jpg');
    venus.position.z = mercury.position.z - (venusRadius + mercuryRadius)*3;
    venusDistance = venus.position.z;
    venusRevolutionAngle = 0;

    // Earth
    earth = createSphere(earthRadius, 20, 'texture/earth.jpg');
    earth.position.z = venus.position.z - (earthRadius + venusRadius)*3;
    earthDistance = earth.position.z;
    earthRevolutionAngle = 0;
    // Moon
    moon = createSphere(moonRadius, 20, 'texture/moon.jpg');
    moon.position.z = - (earthRadius + moonRadius) * 1.5;
    moonDistance = moon.position.z;
    moonRevolutionAngle = 0;

    // Mars
    mars = createSphere(marsRadius, 20, 'texture/mars.jpg');
    mars.position.z = earth.position.z - ( marsRadius + earthRadius)*3;
    marsDistance = mars.position.z;
    marsRevolutionAngle = 0;

    // Jupiter
    jupiter = createSphere(jupiterRadius, 20, 'texture/jupiter.jpg');
    jupiter.position.z = mars.position.z - ( jupiterRadius + marsRadius)*2;
    jupiterDistance = jupiter.position.z;
    jupiterRevolutionAngle = 0;

    // Saturn
    saturn = createSphere(saturnRadius, 20, 'texture/saturn.jpg');
    saturn.position.z = jupiter.position.z - (saturnRadius + jupiterRadius)*2;
    saturnDistance = saturn.position.z;
    saturnRevolutionAngle = 0;
    // Saturn Ring
    saturnRing = createRing(saturnRingInnerRadius, saturnRingOuterRadius, 20, 'texture/saturn_ring.png');
    saturnRing.rotation.x = -Math.PI/4;

    // Uranus
    uranus = createSphere(uranusRadius, 20, 'texture/uranus.jpg');
    uranus.position.z = saturn.position.z - (uranusRadius + saturnRadius)*2;
    uranusDistance = uranus.position.z;
    uranusRevolutionAngle = 0;

    // Neptune
    neptune = createSphere(neptuneRadius, 20, 'texture/neptune.jpg');
    neptune.position.z = uranus.position.z - (neptuneRadius + uranusRadius)*2;
    neptuneDistance = neptune.position.z;
    neptuneRevolutionAngle = 0;

    

    /* Complete: add 
    other planets */ 
    
    sun.add(mercury);
    sun.add(venus); earth.add(moon);
    sun.add(earth);
    sun.add(mars);
    sun.add(jupiter);
    sun.add(saturn); saturn.add(saturnRing);
    sun.add(uranus);
    sun.add(neptune);

    
    sun.add(sunlight);
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
    
    var moonPosition = new THREE.Vector3(moon.position.x, moon.position.y, moon.position.z);

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    stats.update();
    renderer.render( scene, camera );

    // Lembrando que Vênus e Urano fazem rotação no sentido horário, e os outros no sentido

    mercury.rotation.y += mercuryRotationSpeed;
    mercuryRevolutionAngle -= (mercuryRevolutionSpeed * Math.PI)/180;
    mercury.position.x = Math.cos(mercuryRevolutionAngle) * mercuryDistance;
    mercury.position.z = Math.sin(mercuryRevolutionAngle) * mercuryDistance;

    venus.rotation.y -= venusRotationSpeed;
    venusRevolutionAngle -= (venusRotationSpeed * Math.PI)/180;
    venus.position.x = Math.cos(venusRevolutionAngle) * venusDistance;
    venus.position.z = Math.sin(venusRevolutionAngle) * venusDistance;

    earth.rotation.y += earthRotationSpeed;
    earthRevolutionAngle -= (earthRotationSpeed * Math.PI)/180;
    earth.position.x = Math.cos(earthRevolutionAngle) * earthDistance;
    earth.position.z = Math.sin(earthRevolutionAngle) * earthDistance;

    moonRevolutionAngle -= (moonRotationSpeed * Math.PI)/180;
    moon.position.x = Math.cos(moonRevolutionAngle) * moonDistance;
    moon.position.z = Math.sin(moonRevolutionAngle) * moonDistance;

    mars.rotation.y += marsRotationSpeed;
    marsRevolutionAngle -= (marsRotationSpeed * Math.PI)/180;
    mars.position.x = Math.cos(marsRevolutionAngle) * marsDistance;
    mars.position.z = Math.sin(marsRevolutionAngle) * marsDistance;

    jupiter.rotation.y += jupiterRotationSpeed;
    jupiterRevolutionAngle -= (jupiterRotationSpeed * Math.PI)/180;
    jupiter.position.x = Math.cos(jupiterRevolutionAngle) * jupiterDistance;
    jupiter.position.z = Math.sin(jupiterRevolutionAngle) * jupiterDistance;

    saturn.rotation.y += saturnRotationSpeed;
    saturnRevolutionAngle -= (saturnRotationSpeed * Math.PI)/180;
    saturn.position.x = Math.cos(saturnRevolutionAngle) * saturnDistance;
    saturn.position.z = Math.sin(saturnRevolutionAngle) * saturnDistance;

    uranus.rotation.y -= uranusRotationSpeed;
    uranusRevolutionAngle -= (uranusRotationSpeed * Math.PI)/180;
    uranus.position.x = Math.cos(uranusRevolutionAngle) * uranusDistance;
    uranus.position.z = Math.sin(uranusRevolutionAngle) * uranusDistance;
    
    neptune.rotation.y += neptuneRotationSpeed;
    neptuneRevolutionAngle -= (neptuneRotationSpeed * Math.PI)/180;
    neptune.position.x = Math.cos(neptuneRevolutionAngle) * neptuneDistance;
    neptune.position.z = Math.sin(neptuneRevolutionAngle) * neptuneDistance;
    

}

function adicionaObjetosNaCena() {
    sun.add(mercury);
    sun.add(venus); earth.add(moon);
    sun.add(earth);
    sun.add(mars);
    sun.add(jupiter);
    sun.add(saturn); saturn.add(saturnRing);
    sun.add(uranus);
    sun.add(neptune);

    
    sun.add(sunlight);
    scene.add(sun);
}

init();
animate();


