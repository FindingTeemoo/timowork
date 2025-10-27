<template>
  <div ref="container" class="model-viewer">
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Loading 3D Model...</p>
    </div>
    <div v-if="!loading && showSpinText" class="spin-me-text">SPIN <span class="space"></span> ME</div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { modelCache } from '../utils/modelCache.js';

export default {
  name: 'ModelViewer',
  props: {
    modelPath: {
      type: String,
      required: true
    },
    scale: {
      type: Number,
      default: 1.0
    }
  },
  setup(props) {
    const container = ref(null);
    const loading = ref(true);
    const showSpinText = ref(true);
    let scene, camera, renderer, controls;
    let model = null;
    let resizeObserver = null;
    let animationFrameId = null;
    let resetTimeout = null;
    let isResetting = false;
    let initialSpherical = null;  const getPixelRatio = () => Math.min(2, Math.max(window.devicePixelRatio || 1, 1.5));

  const init = () => {
      // Ensure container has proper dimensions
      if (!container.value.clientWidth || !container.value.clientHeight) {
        setTimeout(init, 100);
        return;
      }

      // Create scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      const width = container.value.clientWidth;
      const height = container.value.clientHeight;

      // Create camera
      camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      );
      camera.position.z = 5;

      // Create renderer with proper resolution
  const pixelRatio = getPixelRatio();
      const isHelmet = props.modelPath.includes('helmet');
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: isHelmet ? 'default' : 'high-performance'
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.setPixelRatio(isHelmet ? Math.min(1.5, pixelRatio) : pixelRatio);
      renderer.setSize(width, height, false);
      renderer.domElement.width = width * pixelRatio;
      renderer.domElement.height = height * pixelRatio;
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      container.value.appendChild(renderer.domElement);
      requestAnimationFrame(() => handleResize());

      // Add lights - omnidirectional lighting for visibility from all angles
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      // Front light
      const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
      frontLight.position.set(0, 0, 10);
      scene.add(frontLight);

      // Back light
      const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
      backLight.position.set(0, 0, -10);
      scene.add(backLight);

      // Top light
      const topLight = new THREE.DirectionalLight(0xffffff, 0.6);
      topLight.position.set(0, 10, 0);
      scene.add(topLight);

      // Bottom light
      const bottomLight = new THREE.DirectionalLight(0xffffff, 0.5);
      bottomLight.position.set(0, -10, 0);
      scene.add(bottomLight);

      // Left light
      const leftLight = new THREE.DirectionalLight(0xffffff, 0.7);
      leftLight.position.set(-10, 0, 0);
      scene.add(leftLight);

      // Right light
      const rightLight = new THREE.DirectionalLight(0xffffff, 0.7);
      rightLight.position.set(10, 0, 0);
      scene.add(rightLight);

      // Add orbit controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.minPolarAngle = 0; // Allow full vertical rotation
      controls.maxPolarAngle = Math.PI; // Allow full vertical rotation

      // Add event listeners for user interaction to reset timer
      const resetTimer = () => {
        console.log('START event - User begins touching/dragging, clearing timer and stopping reset');
        if (resetTimeout) clearTimeout(resetTimeout);
        isResetting = false;
        showSpinText.value = false;
      };

      const startResetTimer = () => {
        console.log('END event - User releases, starting 2-second countdown');
        if (resetTimeout) clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          console.log('After 2 seconds of inactivity - Starting smooth rotation back to original position');
          isResetting = true;
        }, 2000);
      };

      // Only start timer when user stops interacting
      controls.addEventListener('start', resetTimer);
      controls.addEventListener('end', startResetTimer);

      // Load model from cache
      loadModel();
    };

    const loadModel = async () => {
      try {
        const loadedModel = await modelCache.load(props.modelPath);
        console.log('Model loaded successfully from cache');
        if (model) scene.remove(model);
        model = loadedModel;

        // Optimize material based on model
        const isHelmet = props.modelPath.includes('helmet');
        
        // Set material for all meshes
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (isHelmet) {
              // Simpler material for helmet for faster rendering
              child.material = new THREE.MeshStandardMaterial({
                color: 0xe8e8e8,
                metalness: 0.3,
                roughness: 0.2,
              });
            } else {
              // High quality material for key
              child.material = new THREE.MeshPhysicalMaterial({
                color: 0xe8e8e8,
                metalness: 0.5,
                roughness: 0.05,
                clearcoat: 1.0,
                clearcoatRoughness: 0.05,
              });
            }
          }
        });

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Get the largest dimension of the model
        const maxDim = Math.max(size.x, size.y, size.z);

        // Apply scale to the model
        model.scale.set(props.scale, props.scale, props.scale);

        // Set fixed camera position closer for larger view
        camera.position.set(0, 0, maxDim * 1);
        camera.updateProjectionMatrix();

        // Center the model
        model.position.sub(center);

        scene.add(model);

        // Update controls with fixed target
        controls.target.set(0, 0, 0);
        controls.update();
        
        // Store initial spherical coordinates (maintains distance, just rotation)
        const spherical = new THREE.Spherical();
        spherical.setFromVector3(camera.position.clone().sub(controls.target));
        initialSpherical = {
          radius: spherical.radius,
          phi: spherical.phi,
          theta: spherical.theta
        };
        
        console.log('Initial spherical coordinates stored:', initialSpherical);
        
        loading.value = false;
        handleResize();
      } catch (error) {
        console.error('Error loading model:', error);
        loading.value = false;
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Smoothly reset camera rotation when inactive (maintaining distance)
      if (isResetting && initialSpherical) {
        console.log('Resetting camera rotation...');
        const speed = 0.05;
        
        // Get current spherical coordinates
        const currentSpherical = new THREE.Spherical();
        currentSpherical.setFromVector3(camera.position.clone().sub(controls.target));
        
        // Interpolate only theta and phi (rotation), keep radius constant
        currentSpherical.theta += (initialSpherical.theta - currentSpherical.theta) * speed;
        currentSpherical.phi += (initialSpherical.phi - currentSpherical.phi) * speed;
        currentSpherical.radius = initialSpherical.radius; // Maintain distance
        
        // Convert back to cartesian and update camera position
        const newPosition = new THREE.Vector3();
        newPosition.setFromSpherical(currentSpherical);
        newPosition.add(controls.target);
        camera.position.copy(newPosition);
        
        // Stop resetting when close enough to original angles
        const threshold = 0.01;
        const angleDiff = Math.abs(currentSpherical.theta - initialSpherical.theta) + 
                         Math.abs(currentSpherical.phi - initialSpherical.phi);
        
        if (angleDiff < threshold) {
          // Set exact position
          const finalPosition = new THREE.Vector3();
          finalPosition.setFromSpherical(new THREE.Spherical(
            initialSpherical.radius,
            initialSpherical.phi,
            initialSpherical.theta
          ));
          finalPosition.add(controls.target);
          camera.position.copy(finalPosition);
          isResetting = false;
          showSpinText.value = true;
          console.log('Reset complete!');
        }
      }
      
      if (controls) {
        controls.update();
      }
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };

    const handleResize = () => {
      if (!container.value || !camera || !renderer) return;
      
      const width = container.value.clientWidth;
      const height = container.value.clientHeight;
      
      if (width <= 0 || height <= 0) return;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
  const pixelRatio = getPixelRatio();
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      renderer.domElement.width = width * pixelRatio;
      renderer.domElement.height = height * pixelRatio;
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
    };

    onMounted(() => {
      init();
      animate();
      handleResize();
      window.addEventListener('resize', handleResize);
      
      if ('ResizeObserver' in window && !resizeObserver) {
        resizeObserver = new ResizeObserver(() => {
          handleResize();
        });
        resizeObserver.observe(container.value);
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (controls) {
        controls.dispose();
      }
    });

    return {
      container,
      loading,
      showSpinText
    };
  }
};
</script>

<style scoped>
.model-viewer {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: #ffffff;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  z-index: 10;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p {
  color: #333;
  font-size: 1rem;
}

.spin-me-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.15);
  pointer-events: none;
  z-index: 5;
  letter-spacing: 8px;
  user-select: none;
  animation: breathe 5s ease-in-out infinite;
}

.spin-me-text .space {
  display: inline-block;
  width: 2rem;
}

@keyframes breathe {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>