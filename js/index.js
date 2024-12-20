var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };

function run() {
	init();
	animate();
}

// Add this after your existing event listeners


// Add this to your init() function

function init() {
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 3000;
	scene = new THREE.Scene();

	var centerText = document.createElement('div');
    centerText.className = 'center-text';
    centerText.textContent = 'Kickstart the next wave of Global Brands onchain';
    centerText.style.color = 'white';
    centerText.style.fontSize = '6.5vmin';
    centerText.style.fontWeight = 'bold';
    centerText.style.position = 'absolute';
    centerText.style.transform = 'translate(-50%, -50%)';
    
	centerText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
// or
centerText.style.backgroundColor = 'rgba(0,0,0,0.3)';
centerText.style.padding = '20px';
centerText.style.borderRadius = '10px';

    var centerTextObject = new THREE.CSS3DObject(centerText);
    centerTextObject.position.set(0, 0, 0); // Position at center
    centerTextObject.rotation.x = -0.3; // Tilt forward
    centerTextObject.rotation.y = 0.2;  // Slight rotation on Y axis
    scene.add(centerTextObject);
	
	// table
	for ( var i = 0; i < table.length; i += 5 ) {
		var element = document.createElement( 'div' );
		element.className = 'element';
		// Generate random RGB values
	/*
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		element.style.backgroundColor = `rgba(${r},${g},${b},${Math.random() * 0.5 + 0.25})`;

		 */
		element.style.backgroundColor = `transparent`;

		
		var symbol = document.createElement( 'div' );
		symbol.className = 'symbol';
		symbol.innerHTML = '<a href="' + table[ i ].split('|')[0] + '" target="_blank"><img src="' + table[ i ].split('|')[1] + '"></a>';
		element.appendChild( symbol );
		/*
		var number = document.createElement( 'div' );
		number.className = 'number';
		number.textContent = table[ i + 2 ];
		element.appendChild( number );
		var details = document.createElement( 'div' );
		details.className = 'details';
		details.innerHTML = table[ i + 1 ];
		element.appendChild( details );
		*/
		var object = new THREE.CSS3DObject( element );
		object.position.x = Math.random() * 4000 - 2000;
		object.position.y = Math.random() * 4000 - 2000;
		object.position.z = Math.random() * 4000 - 2000;
		scene.add( object );
		objects.push( object );
		//
		var object = new THREE.Object3D();
		object.position.x = ( table[ i + 3 ] * 140 ) - 1330;
		object.position.y = - ( table[ i + 4 ] * 180 ) + 990;
		targets.table.push( object );
	}

	// sphere

	var vector = new THREE.Vector3();
	var spherical = new THREE.Spherical();

	for ( var i = 0, l = objects.length; i < l; i ++ ) {
		var phi = Math.acos( -1 + ( 2 * i ) / l );
		var theta = Math.sqrt( l * Math.PI ) * phi;
		var object = new THREE.Object3D();
		spherical.set( 800, phi, theta );
		object.position.setFromSpherical( spherical );
		vector.copy( object.position ).multiplyScalar( 2 );
		object.lookAt( vector );
		targets.sphere.push( object );
	}

	// helix

	var vector = new THREE.Vector3();
	var cylindrical = new THREE.Cylindrical();

	for ( var i = 0, l = objects.length; i < l; i ++ ) {
		var theta = i * 0.175 + Math.PI;
		var y = - ( i * 8 ) + 450;
		var object = new THREE.Object3D();
		cylindrical.set( 900, theta, y );
		object.position.setFromCylindrical( cylindrical );
		vector.x = object.position.x * 2;
		vector.y = object.position.y;
		vector.z = object.position.z * 2;
		object.lookAt( vector );
		targets.helix.push( object );
	}

	// grid

	for ( var i = 0; i < objects.length; i ++ ) {
		var object = new THREE.Object3D();
		object.position.x = ( ( i % 5 ) * 400 ) - 800;
		object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
		object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
		targets.grid.push( object );
	}
	//
	renderer = new THREE.CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.style.position = 'absolute';
	document.getElementById( 'container' ).appendChild( renderer.domElement );
	//
	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed = 0.5;
	controls.minDistance = 500;
	controls.maxDistance = 2000;
	controls.addEventListener( 'change', render );

	/**
	 var button = document.getElementById( 'grid' );
	button.addEventListener( 'click', function ( event ) {
		transform( targets.grid, 2000 );
	}, false );
	*/
	transform( targets.sphere, 2000 );
	
	//
	
	window.addEventListener( 'resize', onWindowResize, false );

}

function transform( targets, duration ) {
	TWEEN.removeAll();
	for ( var i = 0; i < objects.length; i ++ ) {
		var object = objects[ i ];
		var target = targets[ i ];
		new TWEEN.Tween( object.position )
			.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();
		new TWEEN.Tween( object.rotation )
			.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();
	}
	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( render )
		.start();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}

function animate() {
	requestAnimationFrame( animate );
	TWEEN.update();
	controls.update();
}

function render() {
	renderer.render( scene, camera );
}

run();
