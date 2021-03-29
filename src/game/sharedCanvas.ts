// file deepcode ignore no-any: any needed
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

export class SharedCanvas {
  canvas: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  protected canvasClass: string;
  protected refreshId;
  protected drawings: {
    image: HTMLImageElement;
    imageStartX: number;
    imageStartY: number;
    imageWidth: number;
    imageHeight: number;
    x: number;
    y: number;
    canvasWidth: number;
    canvasHeight: number;
  }[][];
  protected lastDrawings: {
    image: HTMLImageElement;
    imageStartX: number;
    imageStartY: number;
    imageWidth: number;
    imageHeight: number;
    x: number;
    y: number;
    canvasWidth: number;
    canvasHeight: number;
  }[];
  protected lastDraw;
  protected images;
  constructor(canvasClass: string) {
    this.canvasClass = canvasClass;
    this.canvas = document.getElementsByClassName(
      this.canvasClass
    )[0] as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    this.context = ctx !== null ? ctx : undefined;
    this.drawings = [];
    this.lastDrawings = [];
    this.images = {};
    this.refreshCanvas();
    // this.refreshId = setInterval(this.draw.bind(this), 100);
  }

  reset() {
    this.canvas = document.getElementsByClassName(
      this.canvasClass
    )[0] as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    this.context = ctx !== null ? ctx : undefined;
    this.drawings = [];
    this.lastDraw = undefined;
    this.refreshCanvas();
  }
  protected refreshCanvas(): void {
    const height = window.innerHeight - 70;
    const width = window.innerWidth - 140;
    const smaller = height <= width ? height : width;
    this.canvas.height = smaller;
    this.canvas.width = smaller;
    this.clear();
  }
  addObject(): number {
    //return index
    return this.drawings.push([]) - 1;
  }
  protected load(imageSource: string): Promise<HTMLImageElement> {
    return new Promise(async (resolve) => {
      if (!this.images[imageSource] || !this.images[imageSource].src) {
        this.images[imageSource] = new Image();
        this.images[imageSource].onload = async () => {
          resolve(this.images[imageSource]);
        };
        this.images[imageSource].src = imageSource;
      }
      if (this.images[imageSource].complete) {
        resolve(this.images[imageSource]);
      } else {
        this.images[imageSource].onload = async () => {
          resolve(this.images[imageSource]);
        };
      }
    });
  }
  async addDrawing(
    objectIndex: number,
    imageSource: string,
    imageStartX: number,
    imageStartY: number,
    imageWidth: number,
    imageHeight: number,
    x: number,
    y: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    const image = await this.load(imageSource);
    const drawing = {
      image,
      imageStartX,
      imageStartY,
      imageWidth,
      imageHeight,
      x,
      y,
      canvasWidth,
      canvasHeight,
    };
    this.drawings[objectIndex].push(drawing);
    this.lastDrawings[objectIndex] = drawing;
    if (this.isTheBiggestDrawer(objectIndex) || !this.lastDraw) {
      console.log('new');
      this.lastDraw = this.draw();
    } else {
      console.log('wait');
    }
    const r = await this.lastDraw;
    console.log(r);
  }
  protected isTheBiggestDrawer(objectIndex: number) {
    let biggest = true;
    const drawerLength = this.drawings[objectIndex].length;
    for (let index = 0; index < this.drawings.length; index++) {
      if (objectIndex !== index) {
        const length = this.drawings[index].length;
        if (drawerLength <= length) {
          biggest = false;
          return biggest;
        }
      }
    }
    return biggest;
  }
  protected delay(time: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  }
  protected async draw() {
    this.clear();
    for (let index = 0; index < this.drawings.length; index++) {
      const drawings = this.drawings[index];
      let deleteDrawing = true;
      let drawing = drawings[0];
      if (!drawing) {
        drawing = this.lastDrawings[index];
        deleteDrawing = false;
      }
      if (drawing) {
        this.context?.drawImage(
          drawing.image,
          drawing.imageStartX,
          drawing.imageStartY,
          drawing.imageWidth,
          drawing.imageHeight,
          drawing.x,
          drawing.y,
          drawing.canvasWidth,
          drawing.canvasHeight
        );
        if (deleteDrawing) {
          drawings.splice(0, 1);
        }
      }
    }
    await this.delay(100);
  }

  clear() {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  get height(): number {
    return this.canvas.height;
  }

  get width(): number {
    return this.canvas.width;
  }
}
