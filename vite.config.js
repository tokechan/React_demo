export default {
    root: './',  // index.htmlがpublicフォルダにあるため
    server: {
        watch: {
            usePolling: true
        },
        hmr: {
            overlay: true
        }
    },
    build: {
      outDir: 'dist'
    }
  }