import * as THREE from 'three';
import {
  skyVertex, skyFragment,
  terrainVertex, terrainFragment,
  particleVertex, particleFragment,
} from './shaders.js';

export class CinematicScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.time = 0;
    this.scrollProgress = 0;
    this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    this.wind = { x: 0, z: 0 };
    this.disposed = false;

    try {
      this.init();
    } catch (e) {
      console.error('CinematicScene init error:', e);
    }
  }

  init() {
    this.setupRenderer();
    this.setupCamera();
    this.setupScene();
    this.createSky();
    this.createTerrain();
    this.createFigure();
    this.createParticles();
    this.setupEvents();
    this.animate();
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.NoToneMapping;
    if (THREE.LinearSRGBColorSpace) {
      this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    }
    this.renderer.setClearColor(0x010D6E, 1);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(40, this.width / this.height, 0.1, 600);
    this.camera.position.set(0, 5.0, 24);
    this.cameraBase = this.camera.position.clone();
    this.lookTarget = new THREE.Vector3(0, 2.2, -8);
    this.camera.lookAt(this.lookTarget);
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0A2870, 0.007);

    this.scene.add(new THREE.AmbientLight(0x0A1A6A, 0.35));
    this.scene.add(new THREE.HemisphereLight(0x0042AF, 0x010D6E, 0.25));

    const sun = new THREE.DirectionalLight(0x2244AA, 0.4);
    sun.position.set(5, 3, -30);
    this.scene.add(sun);
  }

  createSky() {
    const geo = new THREE.SphereGeometry(250, 64, 40);
    const mat = new THREE.ShaderMaterial({
      vertexShader: skyVertex,
      fragmentShader: skyFragment,
      uniforms: { uTime: { value: 0 } },
      side: THREE.BackSide,
      depthWrite: false,
    });
    this.sky = new THREE.Mesh(geo, mat);
    this.scene.add(this.sky);
  }

  createTerrain() {
    const geo = new THREE.PlaneGeometry(100, 100, 180, 180);
    geo.rotateX(-Math.PI / 2);

    const mat = new THREE.ShaderMaterial({
      vertexShader: terrainVertex,
      fragmentShader: terrainFragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
      },
      side: THREE.FrontSide,
    });

    this.terrain = new THREE.Mesh(geo, mat);
    this.terrain.position.y = -2.0;
    this.scene.add(this.terrain);
  }

  createDotTexture() {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Dark base
    ctx.fillStyle = '#06061a';
    ctx.fillRect(0, 0, size, size);

    // Scattered cream/white dots
    const dotCount = 320;
    for (let i = 0; i < dotCount; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random() * 2.2 + 1.0;
      const alpha = Math.random() * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(254, 241, 208, ${alpha})`;
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 3);
    return tex;
  }

  createFigure() {
    const g = new THREE.Group();
    const dotTex = this.createDotTexture();
    const mat = new THREE.MeshBasicMaterial({ map: dotTex });

    // Elegant feminine silhouette — flowing gown, graceful proportions
    const s = new THREE.Shape();

    // Base of dress (wide flowing hem)
    s.moveTo(-0.48, 0);

    // Left dress hem — wide flowing gown
    s.quadraticCurveTo(-0.50, 0.10, -0.46, 0.22);
    // Left skirt sweeps inward toward waist
    s.bezierCurveTo(-0.40, 0.45, -0.30, 0.68, -0.20, 0.84);
    // Left waist — narrow cinch
    s.bezierCurveTo(-0.15, 0.94, -0.12, 1.00, -0.10, 1.06);
    // Left ribcage to bust
    s.bezierCurveTo(-0.11, 1.14, -0.13, 1.22, -0.14, 1.28);
    // Left shoulder
    s.bezierCurveTo(-0.16, 1.34, -0.17, 1.38, -0.16, 1.41);
    // Left upper arm
    s.bezierCurveTo(-0.19, 1.40, -0.21, 1.36, -0.22, 1.28);
    s.bezierCurveTo(-0.23, 1.18, -0.22, 1.06, -0.21, 0.96);
    // Left hand
    s.bezierCurveTo(-0.205, 0.92, -0.195, 0.90, -0.19, 0.92);
    // Left inner arm back up
    s.bezierCurveTo(-0.185, 0.98, -0.18, 1.08, -0.17, 1.18);
    s.bezierCurveTo(-0.16, 1.26, -0.15, 1.32, -0.14, 1.37);
    // Left neck
    s.bezierCurveTo(-0.10, 1.42, -0.07, 1.46, -0.06, 1.52);
    // Left jaw / face
    s.bezierCurveTo(-0.07, 1.56, -0.08, 1.61, -0.09, 1.66);
    // Left side of head
    s.bezierCurveTo(-0.10, 1.72, -0.10, 1.77, -0.09, 1.81);
    // Top of head
    s.bezierCurveTo(-0.06, 1.86, -0.02, 1.88, 0.02, 1.88);
    s.bezierCurveTo(0.06, 1.88, 0.10, 1.86, 0.12, 1.82);
    // Right side of head into hair
    s.bezierCurveTo(0.14, 1.78, 0.15, 1.73, 0.15, 1.68);
    // Hair flows down the back — long flowing strands
    s.bezierCurveTo(0.16, 1.58, 0.18, 1.46, 0.20, 1.34);
    s.bezierCurveTo(0.22, 1.20, 0.23, 1.06, 0.22, 0.94);
    // Hair tip
    s.bezierCurveTo(0.21, 0.86, 0.19, 0.82, 0.17, 0.80);
    // Inner hair edge back up
    s.bezierCurveTo(0.16, 0.84, 0.15, 0.92, 0.14, 1.02);
    s.bezierCurveTo(0.13, 1.14, 0.12, 1.26, 0.11, 1.34);
    // Back of neck
    s.bezierCurveTo(0.10, 1.40, 0.09, 1.44, 0.08, 1.48);
    // Right back of head
    s.bezierCurveTo(0.08, 1.54, 0.08, 1.60, 0.07, 1.64);
    // Back head curve connecting
    s.bezierCurveTo(0.07, 1.58, 0.07, 1.52, 0.07, 1.46);
    // Right shoulder area
    s.bezierCurveTo(0.09, 1.40, 0.12, 1.38, 0.15, 1.36);
    // Right upper arm
    s.bezierCurveTo(0.18, 1.34, 0.20, 1.28, 0.21, 1.18);
    s.bezierCurveTo(0.22, 1.06, 0.21, 0.96, 0.20, 0.90);
    // Right hand
    s.bezierCurveTo(0.195, 0.87, 0.185, 0.86, 0.18, 0.88);
    // Right inner arm
    s.bezierCurveTo(0.175, 0.94, 0.17, 1.04, 0.16, 1.14);
    s.bezierCurveTo(0.155, 1.22, 0.15, 1.28, 0.14, 1.32);
    // Right torso
    s.bezierCurveTo(0.12, 1.24, 0.11, 1.16, 0.10, 1.06);
    // Right waist
    s.bezierCurveTo(0.12, 1.00, 0.15, 0.94, 0.20, 0.84);
    // Right skirt
    s.bezierCurveTo(0.30, 0.68, 0.40, 0.45, 0.46, 0.22);
    // Right hem
    s.quadraticCurveTo(0.50, 0.10, 0.48, 0);
    // Close bottom
    s.lineTo(-0.48, 0);

    // Extrude for depth — prevents terrain from bleeding through
    const extrudeSettings = { depth: 0.3, bevelEnabled: false };
    const silhouetteGeo = new THREE.ExtrudeGeometry(s, extrudeSettings);
    // Center the extrusion on Z so it faces the camera
    silhouetteGeo.translate(0, 0, -0.15);
    const silhouette = new THREE.Mesh(silhouetteGeo, mat);
    silhouette.renderOrder = 10;
    g.add(silhouette);

    // Flowing dress train at the bottom (animated)
    const dressShape = new THREE.Shape();
    dressShape.moveTo(-0.48, 0);
    dressShape.bezierCurveTo(-0.52, -0.06, -0.58, -0.18, -0.60, -0.32);
    dressShape.bezierCurveTo(-0.58, -0.40, -0.50, -0.44, -0.38, -0.44);
    dressShape.lineTo(0.38, -0.44);
    dressShape.bezierCurveTo(0.50, -0.44, 0.58, -0.40, 0.60, -0.32);
    dressShape.bezierCurveTo(0.58, -0.18, 0.52, -0.06, 0.48, 0);
    dressShape.lineTo(-0.48, 0);

    const dressGeo = new THREE.ExtrudeGeometry(dressShape, extrudeSettings);
    dressGeo.translate(0, 0, -0.15);
    this.dressGeo = dressGeo;
    this.dressOrig = new Float32Array(dressGeo.attributes.position.array);
    const dress = new THREE.Mesh(dressGeo, mat);
    dress.renderOrder = 10;
    g.add(dress);

    g.scale.setScalar(1.6);
    g.position.set(0, -1.6, 2);
    this.figure = g;
    this.scene.add(g);
  }

  createParticles() {
    const N = 120;
    const pos = new Float32Array(N * 3);
    const sc = new Float32Array(N);
    const sp = new Float32Array(N);
    const off = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 20 + 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
      sc[i]  = Math.random() * 0.5 + 0.2;
      sp[i]  = Math.random() * 0.3 + 0.15;
      off[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aScale', new THREE.BufferAttribute(sc, 1));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(sp, 1));
    geo.setAttribute('aOffset', new THREE.BufferAttribute(off, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      transparent: true,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  setupEvents() {
    this._onResize = () => this.resize();
    this._onMouse = (e) => {
      this.mouse.tx = (e.clientX / this.width) * 2 - 1;
      this.mouse.ty = -(e.clientY / this.height) * 2 + 1;
    };
    window.addEventListener('resize', this._onResize);
    window.addEventListener('mousemove', this._onMouse);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  setScroll(p) { this.scrollProgress = Math.max(0, Math.min(1, p)); }

  update(dt) {
    this.time += dt;

    const ml = 1 - Math.pow(0.02, dt);
    this.mouse.x += (this.mouse.tx - this.mouse.x) * ml;
    this.mouse.y += (this.mouse.ty - this.mouse.y) * ml;

    this.wind.x += (this.mouse.x * 0.2 - this.wind.x) * 0.012;
    this.wind.z += (this.mouse.y * 0.12 - this.wind.z) * 0.012;

    const t = this.time;
    const mv = new THREE.Vector2(this.mouse.x, this.mouse.y);
    if (this.sky) this.sky.material.uniforms.uTime.value = t;
    if (this.terrain) {
      this.terrain.material.uniforms.uTime.value = t;
      this.terrain.material.uniforms.uMouse.value = mv;
    }
    if (this.particles) {
      this.particles.material.uniforms.uTime.value = t;
      this.particles.material.uniforms.uMouse.value = mv;
    }

    this.updateCamera(dt);
    this.updateCloth();
  }

  updateCamera(dt) {
    const bx = Math.sin(this.time * 0.15) * 0.05;
    const by = Math.cos(this.time * 0.11) * 0.025;
    const px = this.mouse.x * 1.0;
    const py = this.mouse.y * 0.5;
    const sz = this.cameraBase.z - this.scrollProgress * 20;
    const sy = this.cameraBase.y - this.scrollProgress * 2.5;

    const target = new THREE.Vector3(
      this.cameraBase.x + px + bx,
      Math.max(1.5, sy + by + py * 0.2),
      sz,
    );

    const cl = 1 - Math.pow(0.03, dt);
    this.camera.position.lerp(target, cl);

    const look = new THREE.Vector3(
      this.lookTarget.x + this.mouse.x * 0.4,
      this.lookTarget.y + this.mouse.y * 0.2,
      this.lookTarget.z,
    );
    this.camera.lookAt(look);

    if (this.scene.fog) {
      this.scene.fog.density = 0.007 + this.scrollProgress * 0.015;
    }
  }

  updateCloth() {
    if (!this.dressGeo || !this.dressOrig) return;
    const p = this.dressGeo.attributes.position.array;
    const o = this.dressOrig;
    const t = this.time;
    const ws = 0.03 + Math.abs(this.wind.x) * 0.12;

    for (let i = 0; i < p.length; i += 3) {
      const depth = Math.max(0, -o[i + 1] * 2.0);
      p[i]     = o[i]     + Math.sin(t * 1.0 + o[i + 1] * 4.0 + o[i] * 2.5) * ws * depth + this.wind.x * depth * 0.2;
      p[i + 1] = o[i + 1] + Math.sin(t * 1.5 + o[i] * 5.0) * 0.006 * depth;
      p[i + 2] = o[i + 2];
    }
    this.dressGeo.attributes.position.needsUpdate = true;
  }

  animate() {
    if (this.disposed) return;
    try {
      const now = performance.now() * 0.001;
      const dt = Math.min(now - (this.lastTime || now), 0.05);
      this.lastTime = now;
      this.update(dt);
      this.renderer.render(this.scene, this.camera);
    } catch (e) {
      console.error('Animate error:', e);
    }
    requestAnimationFrame(() => this.animate());
  }

  dispose() {
    this.disposed = true;
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('mousemove', this._onMouse);
    this.renderer.dispose();
  }
}
