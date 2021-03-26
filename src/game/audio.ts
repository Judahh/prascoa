export class Audio {
  type: string;
  audio: HTMLMediaElement;
  audioContext: AudioContext;
  buffer: AudioBuffer;
  url: string;

  constructor(url: string) {
    this.audio = document.createElement('audio');
    this.type = this.audio.canPlayType('audio/ogg') ? '.ogg' : '.mp3';

    this.audioContext = new AudioContext();
    this.buffer = this.audioContext.createBuffer(
      1,
      1,
      this.audioContext.sampleRate
    );

    this.url = url;
  }

  playSound(delay: number, loop: boolean, start: number, end: number): void {
    this.fetch(this.url + this.type, (request: XMLHttpRequest) => {
      this.onSuccess.bind(this)(request, delay, loop, start, end);
    });
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
  protected onSuccess(
    request: XMLHttpRequest,
    delay: number,
    loop: boolean,
    start: number,
    end: number
  ): void {
    const audioData = request.response;
    this.audioContext.decodeAudioData(
      audioData,
      (buffer) => {
        this.play.bind(this)(buffer, delay, loop, start, end);
      },
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

  protected play(
    buffer: AudioBuffer,
    delay: number,
    loop: boolean,
    start: number,
    end: number
  ): void {
    // console.log('Play');
    const sourceNode = this.initSourceNode(buffer);
    sourceNode.loop = loop;
    if (loop) {
      sourceNode.loopStart = start;
      sourceNode.loopEnd = end;
      sourceNode.start(delay, start);
    } else {
      sourceNode.start(delay, start, end);
      // sourceNode.stop(end);
    }
  }
}
