export class Audio {
  type: string;
  audio: HTMLMediaElement;
  gainNode?: GainNode;
  audioContext?: AudioContext;
  source?: MediaElementAudioSourceNode;
  sourceNode?: AudioBufferSourceNode;
  buffer?: AudioBuffer;
  started?: boolean;

  constructor() {
    this.audio = document.createElement('audio');
    this.audio.loop = true;
    this.audio.autoplay = true;
    this.type = this.audio.canPlayType('audio/ogg') ? '.ogg' : '.mp3';
    //! fix
    this.audio.src = 'http://localhost:3000/sounds/sounds' + this.type;
  }

  play() {
    console.log('PLAY audio');
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.buffer = this.audioContext.createBuffer(
        1,
        1,
        this.audioContext.sampleRate
      );
    }
    if (!this.source) {
      this.source = this.audioContext.createMediaElementSource(this.audio);
    }
    if (!this.gainNode) {
      this.gainNode = this.audioContext.createGain();
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    }
    if (!this.sourceNode) {
      this.sourceNode = this.audioContext.createBufferSource();
      if (this.buffer) this.sourceNode.buffer = this.buffer;
      this.sourceNode.connect(this.audioContext.destination);
    }
    if (!this.started) this.sourceNode.start(0);
    this.started = true;

    // this.sourceNode.buffer=this.audioContext.createBuffer(numberOfChannels, length, sampleRate)
  }
}
