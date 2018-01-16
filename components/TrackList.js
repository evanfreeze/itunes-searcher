Vue.component('TrackList', {
  props: ['tracks'],
  methods: {
    play() {
      this.$emit('play');
    }
  },
  template: `
    <div class="track-list">
      <track-item v-for="track in this.tracks" :key="track.trackId" :track="track" @play="play"></track-item>
    </div>
  `
});
