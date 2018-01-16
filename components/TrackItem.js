Vue.component('TrackItem', {
  props: ['track'],
  data: function() {
    return {
      audioPreview: null,
      isPlaying: false,
      played: 0.00,
      duration: 0.00,
    }
  },
  methods: {
    playAudio() {
      this.$emit('play');
      this.audioPreview.play();
      this.duration = this.audioPreview.duration;
    },
    pauseAudio() {
      this.audioPreview.pause();
    },
    updatePlayed() {
      this.played = this.audioPreview.currentTime;
      document.getElementById("progress-" + this.track.trackId).style.width = this.percentagePlayed + '%';
    },
    playingEnded() {
      this.isPlaying = false;
      document.getElementById("progress-" + this.track.trackId).style.width = '0%';
    }
  },
  mounted() {
    this.audioPreview = document.getElementById("preview" + this.track.trackId);
    this.duration = document.getElementById("preview" + this.track.trackId).duration;
  },
  computed: {
    percentagePlayed() {
      return (this.played / this.duration) * 100;
    }
  },
  template: `
  <div class="track-item-wrapper" :class="{'playing-track': isPlaying}">
    <div class="track-item">
      <img v-if="!isPlaying" :src="track.artworkUrl60" class="track-artwork" />
      <img v-if="isPlaying" :src="track.artworkUrl60" class="track-artwork" />
      <div class="track-content">
        <div class="track-title-block">
          <h3 class="track-name">{{ track.trackName }}</h3>
          <h5 class="track-artist">{{ track.artistName }}</h5>
        </div>
        <div class="track-play">
          <div :class="{hidden: isPlaying}" @click="playAudio" style="color: #bbb;">
            <i class="far fa-play-circle"></i>
          </div>
          <div :class="{hidden: !isPlaying}" @click="pauseAudio" style="color: #4FA7B6;">
            <i class="far fa-pause-circle"></i>
          </div>
        </div>
      </div>
      <audio
        @playing="isPlaying = true"
        @pause="isPlaying = false"
        @ended="playingEnded"
        @timeupdate="updatePlayed"
        :id="'preview' + track.trackId"
      >
        <source :src="track.previewUrl" type="audio/mpeg">
      </audio>
    </div>
    <p class="progress-bar" :class="{blueprog: isPlaying, greyprog: !isPlaying}":id="'progress-' + track.trackId"></p>
  </div>
  `
});


/*

{
  "wrapperType":"track",
  "kind":"song",
  "artistId":472054,
  "collectionId":184335550,
  "trackId":184335560,
  "artistName":"John Mayer",
  "collectionName":"Continuum",
  "trackName":"Waiting On the World to Change",
  "collectionCensoredName":"Continuum",
  "trackCensoredName":"Waiting On the World to Change",
  "artistViewUrl":"https://itunes.apple.com/us/artist/john-mayer/472054?uo=4",
  "collectionViewUrl":"https://itunes.apple.com/us/album/waiting-on-the-world-to-change/184335550?i=184335560&uo=4",
  "trackViewUrl":"https://itunes.apple.com/us/album/waiting-on-the-world-to-change/184335550?i=184335560&uo=4",
  "previewUrl":"https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview20/v4/8e/fd/e0/8efde0e3-6967-6493-9f2d-23869174e315/mzaf_1904943406835518703.plus.aac.p.m4a",
  "artworkUrl30":"http://is4.mzstatic.com/image/thumb/Music7/v4/4d/83/3f/4d833ff9-5277-bcf3-2a84-e54cd425054f/source/30x30bb.jpg",
  "artworkUrl60":"http://is4.mzstatic.com/image/thumb/Music7/v4/4d/83/3f/4d833ff9-5277-bcf3-2a84-e54cd425054f/source/60x60bb.jpg",
  "artworkUrl100":"http://is4.mzstatic.com/image/thumb/Music7/v4/4d/83/3f/4d833ff9-5277-bcf3-2a84-e54cd425054f/source/100x100bb.jpg",
  "collectionPrice":5.99,
  "trackPrice":1.29,
  "releaseDate":"2006-07-11T07:00:00Z",
  "collectionExplicitness":"cleaned",
  "trackExplicitness":"notExplicit",
  "discCount":1,
  "discNumber":1,
  "trackCount":12,
  "trackNumber":1,
  "trackTimeMillis":200667,
  "country":"USA",
  "currency":"USD",
  "primaryGenreName":"Singer/Songwriter",
  "isStreamable":true
}

*/
