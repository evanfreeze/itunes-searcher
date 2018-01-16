let app = new Vue({
  el: '#app',
  data: {
    searchTerm: "",
    results: null,
  },
  methods: {
    searchWeb() {
      return new Promise((resolve, reject) => {
        const country = 'US';
        const media = 'music';
        const xhr = new XMLHttpRequest();
        xhr.open(
          "GET",
          "https://itunes.apple.com/search?term=" + encodeURI(this.searchTerm) + "&country=" + country + "&media=" + media,
          true
        );
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });
    },
    searchButtonClicked() {
      this.searchWeb()
        .then((response) => {
          this.results = JSON.parse(response);
        })
        .catch((response) => {
          console.log(response);
          this.results = response;
        });
    },
    stopAllAudio() {
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(el => el.pause());
    }
  }
});
