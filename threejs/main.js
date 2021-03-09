/* ------------------------------------------------------------
    Alunos:
    Larissa Dalimar Lima Viana              DRE: 117213958
    Miguel Santos de Araujo do Nascimento   DRE: 115191914
    Tarefa Prática 3 - Computação Gráfica 2020.1
*/

// ThreeJS variables
var camera, scene, renderer;

// OrbitControls (camera)
var controls;

// Optional (showFps)
var stats;

// Objects in Scene
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
var saturnRadius, saturnRingInnerRadius, saturnRingOuterRadius, saturnRingTilt;
var saturnRotationTimeInDays = 0.5;
var saturnRevolutionTimeInDays = Math.round(365*29.46);
var saturnRotationSpeed;
var saturnRevolutionSpeed;
var saturnDistance;
var saturnRevolutionAngle;


// Uranus
var uranus;
var uranusRadius;
var uranusRotationTimeInDays = 0.7;
var uranusRevolutionTimeInDays = Math.round(365*84);
var uranusRotationSpeed;
var uranusRevolutionSpeed;
var uranusDistance;
var uranusRevolutionAngle;

// Neptune
var neptune;
var neptuneRadius;
var neptuneRotationTimeInDays = 0.6; // Aqui arredondei pra baixo só pra não ficar igual ao de Urano
var neptuneRevolutionTimeInDays = Math.round(365*165);
var neptuneRotationSpeed;
var neptuneRevolutionSpeed;
var neptuneDistance;
var neptuneRevolutionAngle;

// Pluto
var pluto
var plutoRadius;
var plutoRotationTimeInDays = 6;
var plutoRevolutionTimeInDays = Math.round(365*248.6);
var plutoRotationSpeed;
var plutoRevolutionSpeed;
var plutoDistance;
var plutoRevolutionAngle;

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

plutoRadius = sunRadius * 0.02;

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
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// OBS: As variáveis planetaRotationSpeed e planetaRevolutionSpeed, apesar do nome, servem para realizar os movimentos de rotação e de revolução.
// então elas funcionam mais como um dA, sendo 'A' o ângulo da rotação realizada no movimento, do que como velocidades propriamente ditas
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

mercuryRotationSpeed = earthRotationSpeed / mercuryRotationTimeInDays;
venusRotationSpeed = earthRotationSpeed / venusRotationTimeInDays;
moonRotationSpeed = earthRotationSpeed / moonRotationTimeInDays;
marsRotationSpeed = earthRotationSpeed / marsRotationTimeInDays;
jupiterRotationSpeed = earthRotationSpeed / jupiterRotationTimeInDays;
saturnRotationSpeed = earthRotationSpeed / saturnRotationTimeInDays;
uranusRotationSpeed = earthRotationSpeed / uranusRotationTimeInDays;
neptuneRotationSpeed = earthRotationSpeed / neptuneRotationTimeInDays;
plutoRotationSpeed = earthRotationSpeed / plutoRotationTimeInDays;

// Pras velocidades de revolução, pego o inverso do tempo de revolução de cada planeta e multiplico pelo produto entre a velocidade de rotação da Terra com seu tempo de revolução (365 dias)
var proporcao = earthRevolutionTimeInDays * earthRotationSpeed;

mercuryRevolutionSpeed = proporcao / mercuryRevolutionTimeInDays;
venusRevolutionSpeed = proporcao / venusRevolutionTimeInDays;
earthRevolutionSpeed = proporcao / earthRevolutionTimeInDays;
moonRevolutionSpeed = proporcao / moonRevolutionTimeInDays;
marsRevolutionSpeed = proporcao / marsRevolutionTimeInDays;
jupiterRevolutionSpeed = proporcao / jupiterRevolutionTimeInDays;
saturnRevolutionSpeed = proporcao / saturnRevolutionTimeInDays;
uranusRevolutionSpeed = proporcao / uranusRevolutionTimeInDays;
neptuneRevolutionSpeed = proporcao / neptuneRevolutionTimeInDays;
plutoRevolutionSpeed = proporcao / plutoRevolutionTimeInDays;

// Variáveis usadas pra controlar a velocidade dos movimentos, caso eu queira mudar a velocidade da animação
var globalRotationSpeed;
var globalRevolutionSpeed;

// Vetores usados pro movimento de revolução
// centerRevolution é inicializado no (0, 0, 0), pois como o planeta é filho do Sol, a posição do Sol é a posição (0, 0, 0) do planeta
//// (raciocínio análogo pra Lua e anel de Saturno com seus respectivos planetas como parent)
// axisRevolution é o eixo y, pois a revolução realiza movimento circular no plano XZ
var centerRevolution = new THREE.Vector3(0, 0, 0);
var axisRevolution = new THREE.Vector3(0, 1, 0);

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
    mercury = createSphere(mercuryRadius, 20, 'texture/mercury.jpg', 'Phong');
    mercury.position.z = - (mercuryRadius + sunRadius)*1.25;
    mercuryDistance = mercury.position.z;
    mercuryRevolutionAngle = Math.PI;

    // Venus
    venus = createSphere(venusRadius, 20, 'texture/venus.jpg', 'Phong');
    venus.position.z = mercury.position.z - (venusRadius + mercuryRadius)*3;
    venusDistance = venus.position.z;
    venusRevolutionAngle = Math.PI;

    // Earth
    earth = createSphere(earthRadius, 20, 'texture/earth.jpg', 'Phong');
    earth.position.z = venus.position.z - (earthRadius + venusRadius)*3;
    earthDistance = earth.position.z;
    earthRevolutionAngle = Math.PI;
    // Moon
    moon = createSphere(moonRadius, 20, 'texture/moon.jpg', 'Phong');
    moon.position.z = - (earthRadius + moonRadius) * 1.5;
    moonDistance = moon.position.z;
    moonRevolutionAngle = Math.PI;

    // Mars
    mars = createSphere(marsRadius, 20, 'texture/mars.jpg', 'Phong');
    mars.position.z = earth.position.z - ( marsRadius + earthRadius)*3;
    marsDistance = mars.position.z;
    marsRevolutionAngle = Math.PI;

    // Jupiter
    jupiter = createSphere(jupiterRadius, 20, 'texture/jupiter.jpg', 'Phong');
    jupiter.position.z = mars.position.z - ( jupiterRadius + marsRadius)*2;
    jupiterDistance = jupiter.position.z;
    jupiterRevolutionAngle = Math.PI;
    jupiterRevolutionSpeed = jupiterRevolutionSpeed / Math.abs(jupiterDistance);

    // Saturn
    saturn = createSphere(saturnRadius, 20, 'texture/saturn.jpg', 'Phong');
    saturn.position.z = jupiter.position.z - (saturnRadius + jupiterRadius)*2;
    saturnDistance = saturn.position.z;
    saturnRevolutionAngle = Math.PI;
    saturnRevolutionSpeed = saturnRevolutionSpeed / Math.abs(mercuryDistance);
    // Saturn Ring
    saturnRingTilt = -Math.PI/4;
    saturnRing = createRing(saturnRingInnerRadius, saturnRingOuterRadius, 20, 'texture/saturn_ring.png', 'Phong');
    saturnRing.rotateX(saturnRingTilt);

    // Uranus
    uranus = createSphere(uranusRadius, 20, 'texture/uranus.jpg', 'Phong');
    uranus.position.z = saturn.position.z - (uranusRadius + saturnRadius)*2;
    uranusDistance = uranus.position.z;
    uranusRevolutionAngle = Math.PI;

    // Neptune
    neptune = createSphere(neptuneRadius, 20, 'texture/neptune.jpg', 'Phong');
    neptune.position.z = uranus.position.z - (neptuneRadius + uranusRadius)*2;
    neptuneDistance = neptune.position.z;
    neptuneRevolutionAngle = Math.PI;
    
    // Pluto
    pluto = createSphere(plutoRadius, 20, 'texture/pluto.jpg', 'Phong');
    pluto.position.z = neptune.position.z - (plutoRadius + neptuneRadius)*2;
    plutoDistance = pluto.position.z;
    plutoRevolutionAngle = Math.PI;

    // Aqui eu mudo a velocidade da animação, pra caso eu queira ver os movimentos de rotação e de revolução com mais rapidez
    // Para deixar os valores padrão, basta deixar as variáveis globalRotationSpeed e globalRevolutionSpeed como sendo 1
    // Por default, faço globalRevolutionSpeed = globalRotationSpeed, pois não faria sentido deixar os 2 movimentos com velocidades diferentes, mas fica a critério do usuário
    globalRotationSpeed = 1;
    globalRevolutionSpeed = globalRotationSpeed;
    changeGlobalSpeed(globalRotationSpeed, globalRevolutionSpeed);

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
    sun.add(pluto);
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

    // Lembrando que Vênus e Urano fazem rotação no sentido horário, e os outros no sentido anti-horário 
  
    mercury.rotateY(mercuryRotationSpeed);
    mercury.rotateAroundPoint(centerRevolution, (mercuryRevolutionSpeed), axisRevolution);

    venus.rotateY(-venusRotationSpeed);
    venus.rotateAroundPoint(centerRevolution, (venusRevolutionSpeed), axisRevolution);

    earth.rotateY(earthRotationSpeed);
    earth.rotateAroundPoint(centerRevolution, (earthRevolutionSpeed), axisRevolution);

    moon.rotateY(moonRotationSpeed);
    // Compensa a rotação da Terra, que a Lua acompanha por causa do parentesco
    moon.rotateAroundPoint(centerRevolution, -(earthRotationSpeed), axisRevolution);
    // Agora faço o movimento de revolução da Lua ao redor da Terra
    moon.rotateAroundPoint(centerRevolution, (moonRevolutionSpeed), axisRevolution);

    mars.rotateY(marsRotationSpeed);
    mars.rotateAroundPoint(centerRevolution, (marsRevolutionSpeed), axisRevolution);

    jupiter.rotateY(jupiterRotationSpeed);
    jupiter.rotateAroundPoint(centerRevolution, (jupiterRevolutionSpeed), axisRevolution);

    saturn.rotateY(saturnRotationSpeed);
    saturn.rotateAroundPoint(centerRevolution, (saturnRevolutionSpeed), axisRevolution);
    // Compensa a rotação de Saturno, que o anel acompanha por causa do parentesco
    // Antes tenho que desfazer a inclinação do anel, pra rotação ocorrer de maneira correta
    saturnRing.rotateX(-saturnRingTilt);
    saturnRing.rotateY(-saturnRotationSpeed);
    saturnRing.rotateX(saturnRingTilt);

    uranus.rotateY(-uranusRotationSpeed);
    uranus.rotateAroundPoint(centerRevolution, (uranusRevolutionSpeed), axisRevolution);

    neptune.rotateY(neptuneRotationSpeed);
    neptune.rotateAroundPoint(centerRevolution, (neptuneRevolutionSpeed), axisRevolution);
   
    pluto.rotateY(plutoRotationSpeed);
    pluto.rotateAroundPoint(centerRevolution, (plutoRevolutionSpeed), axisRevolution);

}

function changeGlobalSpeed(globalRotationSpeed, globalRevolutionSpeed) {
    mercuryRotationSpeed *= globalRotationSpeed;
    mercuryRevolutionSpeed *= globalRevolutionSpeed;

    venusRotationSpeed *= globalRotationSpeed;
    venusRevolutionSpeed *= globalRevolutionSpeed;

    earthRotationSpeed *= globalRotationSpeed;
    earthRevolutionSpeed *= globalRevolutionSpeed;

    moonRotationSpeed *= globalRotationSpeed;
    moonRevolutionSpeed *= globalRevolutionSpeed;

    marsRotationSpeed *= globalRotationSpeed;
    marsRevolutionSpeed *= globalRevolutionSpeed;

    jupiterRotationSpeed *= globalRotationSpeed;
    jupiterRevolutionSpeed *= globalRevolutionSpeed;

    saturnRotationSpeed *= globalRotationSpeed;
    saturnRevolutionSpeed *= globalRevolutionSpeed;

    uranusRotationSpeed *= globalRotationSpeed;
    uranusRevolutionSpeed *= globalRevolutionSpeed;

    neptuneRotationSpeed *= globalRotationSpeed;
    neptuneRevolutionSpeed *= globalRevolutionSpeed;

    plutoRotationSpeed *= globalRotationSpeed;
    plutoRevolutionSpeed *= globalRevolutionSpeed;
}

init();
animate();


