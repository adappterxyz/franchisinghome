function init() {
    // ... existing camera and scene setup ...

    // Add center text
    var centerText = document.createElement('div');
    centerText.className = 'center-text';
    centerText.textContent = 'Your Text Here';
    centerText.style.color = 'white';
    centerText.style.fontSize = '48px';
    centerText.style.fontWeight = 'bold';
    centerText.style.position = 'absolute';
    centerText.style.transform = 'translate(-50%, -50%)';
    centerText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
    
    var centerTextObject = new THREE.CSS3DObject(centerText);
    centerTextObject.position.set(0, 0, 0); // Position at center
    scene.add(centerTextObject);

    // ... rest of the init function ...
} 