/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
export class Confetti {
  protected colors: string[];
  // eslint-disable-next-line no-unused-vars
  protected supportsAnimationFrame: (callback: FrameRequestCallback) => number;
  protected streamingConfetti: boolean;
  protected pause: boolean;
  protected lastFrameTime: number;
  protected animationTimer?: number;
  protected particles: any[];
  protected waveAngle: number;
  protected width: number;
  protected height: number;
  protected context?: CanvasRenderingContext2D;
  protected canvas: HTMLCanvasElement;
  protected maxCount: number;
  protected speed: number;
  protected frameInterval: number;
  protected alpha: number;
  protected gradient: boolean;

  constructor(
    maxCount?: number,
    speed?: number,
    frameInterval?: number,
    alpha?: number,
    gradient?: boolean
  ) {
    this.maxCount = maxCount ? maxCount : 250;
    this.speed = speed ? speed : 2;
    this.frameInterval = frameInterval ? frameInterval : 15;
    this.alpha = alpha ? alpha : 1.0;
    this.gradient = gradient !== undefined ? gradient : false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.supportsAnimationFrame =
      requestAnimationFrame ||
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      // @ts-ignore
      window.mozRequestAnimationFrame ||
      // @ts-ignore
      window.oRequestAnimationFrame ||
      // @ts-ignore
      window.msRequestAnimationFrame;
    this.colors = [
      'rgba(30,144,255,',
      'rgba(107,142,35,',
      'rgba(255,215,0,',
      'rgba(255,192,203,',
      'rgba(106,90,205,',
      'rgba(173,216,230,',
      'rgba(238,130,238,',
      'rgba(152,251,152,',
      'rgba(70,130,180,',
      'rgba(244,164,96,',
      'rgba(210,105,30,',
      'rgba(220,20,60,',
    ];
    this.streamingConfetti = false;
    this.pause = false;
    this.lastFrameTime = Date.now();
    this.particles = [];
    this.waveAngle = 0;
    this.canvas = document.getElementById(
      'confetti-canvas'
    ) as HTMLCanvasElement;
    if (this.canvas === undefined || this.canvas === null) {
      this.createCanvas();
    }
  }

  resetParticle(
    particle: {
      color?: any;
      color2?: any;
      x?: any;
      y?: any;
      diameter?: any;
      tilt?: any;
      tiltAngleIncrement?: any;
      tiltAngle?: any;
    },
    width: number,
    height: number
  ) {
    particle.color =
      this.colors[(Math.random() * this.colors.length) | 0] +
      (this.alpha + ')');
    particle.color2 =
      this.colors[(Math.random() * this.colors.length) | 0] +
      (this.alpha + ')');
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = Math.random() * Math.PI;
    return particle;
  }

  toggleConfettiPause() {
    if (this.pause) this.resumeConfetti();
    else this.pauseConfetti();
  }

  isConfettiPaused() {
    return this.pause;
  }

  pauseConfetti() {
    this.pause = true;
  }

  resumeConfetti() {
    this.pause = false;
    this.runAnimation();
  }

  runAnimation() {
    if (this.pause) return;
    else if (this.particles.length === 0) {
      this.context?.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.animationTimer = undefined;
    } else {
      const now = Date.now();
      const delta = now - this.lastFrameTime;
      if (!this.supportsAnimationFrame || delta > this.frameInterval) {
        this.context?.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.updateParticles();
        this.drawParticles(this.context);
        this.lastFrameTime = now - (delta % this.frameInterval);
      }
      this.animationTimer = requestAnimationFrame(this.runAnimation.bind(this));
    }
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'confetti-canvas');
    this.canvas.setAttribute(
      'style',
      'display:block;z-index:999999;pointer-events:none;position:fixed;top:0'
    );
    document.body.prepend(this.canvas);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    window.addEventListener(
      'resize',
      () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      },
      true
    );
    this.createContext();
  }

  createContext() {
    if (this.context === undefined) {
      const ctx = this.canvas.getContext('2d');
      this.context = ctx !== null ? ctx : undefined;
    }
  }

  protected timer(callback: any) {
    return window.setTimeout(callback, this.frameInterval);
  }

  startConfetti(
    timeout?: number | undefined,
    min?: number,
    max?: number
  ): void {
    window.requestAnimationFrame = ((callback) => {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        //@ts-ignore
        window.mozRequestAnimationFrame ||
        //@ts-ignore
        window.oRequestAnimationFrame ||
        //@ts-ignore
        window.msRequestAnimationFrame ||
        this.timer(callback)
      );
    })();
    this.createContext();
    let count = this.maxCount;
    if (min) {
      if (max) {
        if (min == max) count = this.particles.length + max;
        else {
          if (min > max) {
            const temp = min;
            min = max;
            max = temp;
          }
          count =
            this.particles.length + ((Math.random() * (max - min) + min) | 0);
        }
      } else count = this.particles.length + min;
    } else if (max) count = this.particles.length + max;
    while (this.particles.length < count)
      this.particles.push(this.resetParticle({}, this.width, this.height));
    this.streamingConfetti = true;
    this.pause = false;
    this.runAnimation();
    if (timeout) {
      window.setTimeout(this.stopConfetti, timeout);
    }
  }

  stopConfetti() {
    this.streamingConfetti = false;
  }

  removeConfetti() {
    stop();
    this.pause = false;
    this.particles = [];
  }

  toggleConfetti() {
    if (this.streamingConfetti) this.stopConfetti();
    else this.startConfetti();
  }

  isConfettiRunning() {
    return this.streamingConfetti;
  }

  drawParticles(context: CanvasRenderingContext2D | undefined) {
    let particle: {
      diameter: number;
      x: number;
      tilt: number;
      y: number;
      color: any;
      color2: any;
    };
    let x: number,
      // y: number,
      x2: number,
      y2: number;
    for (let i = 0; i < this.particles.length; i++) {
      particle = this.particles[i];
      context?.beginPath();
      if (context) context.lineWidth = particle.diameter;
      x2 = particle.x + particle.tilt;
      x = x2 + particle.diameter / 2;
      y2 = particle.y + particle.tilt + particle.diameter / 2;
      if (this.gradient) {
        const gradient = context?.createLinearGradient(x, particle.y, x2, y2);
        if (gradient) {
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1.0, particle.color2);
          if (context) context.strokeStyle = gradient;
        }
      } else if (context) context.strokeStyle = particle.color;
      context?.moveTo(x, particle.y);
      context?.lineTo(x2, y2);
      context?.stroke();
    }
  }

  updateParticles() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let particle: {
      y: number;
      tiltAngle: number;
      tiltAngleIncrement: any;
      x: number;
      diameter: number;
      tilt: number;
    };
    this.waveAngle += 0.01;
    for (let i = 0; i < this.particles.length; i++) {
      particle = this.particles[i];
      if (!this.streamingConfetti && particle.y < -15)
        particle.y = height + 100;
      else {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.x += Math.sin(this.waveAngle) - 0.5;
        particle.y +=
          (Math.cos(this.waveAngle) + particle.diameter + this.speed) * 0.5;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;
      }
      if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
        if (this.streamingConfetti && this.particles.length <= this.maxCount)
          this.resetParticle(particle, width, height);
        else {
          this.particles.splice(i, 1);
          i--;
        }
      }
    }
  }
}
