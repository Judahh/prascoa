export class Audio {
  type: string;
  audio: HTMLMediaElement;
  audioContext: AudioContext;
  buffer: AudioBuffer;

  constructor() {
    this.audio = document.createElement('audio');
    this.type = this.audio.canPlayType('audio/ogg') ? '.ogg' : '.mp3';

    this.audioContext = new AudioContext();
    this.buffer = this.audioContext.createBuffer(
      1,
      1,
      this.audioContext.sampleRate
    );

    this.fetch('/sounds/sounds' + this.type, this.onSuccess.bind(this));
  }

  protected fetch(
    url: string,
    // eslint-disable-next-line no-unused-vars
    resolve: (request: XMLHttpRequest) => void
  ): void {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      resolve(request);
    };
    request.send();
  }
  protected onSuccess(request: XMLHttpRequest): void {
    const audioData = request.response;
    this.audioContext.decodeAudioData(
      audioData,
      this.play.bind(this),
      this.onDecodeBufferError.bind(this)
    );
  }
  protected onDecodeBufferError(error: DOMException): void {
    console.error(error);
  }

  protected initSourceNode(buffer?: AudioBuffer): AudioBufferSourceNode {
    const sourceNode = this.audioContext.createBufferSource();
    if (buffer) this.buffer = buffer;
    sourceNode.buffer = this.buffer;
    sourceNode.connect(this.audioContext.destination);
    return sourceNode;
  }

  protected play(buffer?: AudioBuffer): void {
    const sourceNode = this.initSourceNode(buffer);
    sourceNode.loop = true;
    sourceNode.loopStart = 6;
    sourceNode.loopEnd = 70;
    sourceNode.start(0, 6);
  }

  jump(buffer?: AudioBuffer): void {
    const sourceNode = this.initSourceNode(buffer);
    sourceNode.loop = false;
    sourceNode.start(0, 4.5, 1.5);
    sourceNode.stop(1.5);
  }

  coin(buffer?: AudioBuffer): void {
    const sourceNode = this.initSourceNode(buffer);
    sourceNode.loop = false;
    sourceNode.start(0, 3, 1.5);
    sourceNode.stop(1.5);
  }

  fall(buffer?: AudioBuffer): void {
    const sourceNode = this.initSourceNode(buffer);
    sourceNode.loop = false;
    sourceNode.start(0, 1.5, 1.5);
    sourceNode.stop(1.5);
  }

  raise(buffer?: AudioBuffer): void {
    const sourceNode = this.initSourceNode(buffer);
    sourceNode.loop = false;
    sourceNode.start(0, 0, 1.5);
    sourceNode.stop(1.5);
  }
}
