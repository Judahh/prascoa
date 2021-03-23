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

  onSuccess(request) {
    const audioData = request.response;
    this.audioContext.decodeAudioData(
      audioData,
      this.play.bind(this),
      this.onDecodeBufferError.bind(this)
    );
  }

  protected play(buffer?) {
    const sourceNode = this.audioContext.createBufferSource();
    if (buffer) this.buffer = buffer;
    sourceNode.buffer = this.buffer;
    sourceNode.connect(this.audioContext.destination);
    sourceNode.loop = true;
    sourceNode.loopStart = 5.6;
    sourceNode.loopEnd = 70;
    sourceNode.start(0, 5.6);
  }

  protected jump(buffer?) {
    const sourceNode = this.audioContext.createBufferSource();
    if (buffer) this.buffer = buffer;
    sourceNode.buffer = this.buffer;
    sourceNode.connect(this.audioContext.destination);
    sourceNode.loop = false;
    sourceNode.start(0, 4.5, 1.5);
    sourceNode.stop(1.5);
  }

  protected coin(buffer?) {
    const sourceNode = this.audioContext.createBufferSource();
    if (buffer) this.buffer = buffer;
    sourceNode.buffer = this.buffer;
    sourceNode.connect(this.audioContext.destination);
    sourceNode.loop = false;
    sourceNode.start(0, 3, 1);
    sourceNode.stop(1);
  }

  onDecodeBufferError(error) {
    console.error(error);
  }

  fetch(url, resolve) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
      resolve(request);
    };
    request.send();
  }
}
