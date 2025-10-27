import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

class ModelCache {
  constructor() {
    this.cache = new Map();
    this.loading = new Map();
  }

  async load(url) {
    // Return from cache if already loaded
    if (this.cache.has(url)) {
      console.log('Model loaded from cache:', url);
      const cached = this.cache.get(url);
      return cached.clone();
    }

    // Wait if already loading
    if (this.loading.has(url)) {
      console.log('Waiting for model to finish loading:', url);
      const result = await this.loading.get(url);
      return result.clone();
    }

    // Load the model
    console.log('Loading model:', url);
    const loader = new OBJLoader();
    
    const promise = new Promise((resolve, reject) => {
      loader.load(
        url,
        (object) => {
          console.log('Model loaded and cached:', url);
          this.cache.set(url, object);
          this.loading.delete(url);
          resolve(object);
        },
        (xhr) => {
          if (xhr.lengthComputable) {
            const progress = (xhr.loaded / xhr.total) * 100;
            console.log(`Loading ${url}: ${progress.toFixed(2)}%`);
          }
        },
        (error) => {
          console.error('Error loading model:', error);
          this.loading.delete(url);
          reject(error);
        }
      );
    });

    this.loading.set(url, promise);
    const result = await promise;
    return result.clone();
  }

  preload(url) {
    return this.load(url);
  }

  clear() {
    this.cache.clear();
    this.loading.clear();
  }
}

export const modelCache = new ModelCache();
