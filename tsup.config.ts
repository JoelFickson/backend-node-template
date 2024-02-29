import { defineConfig } from 'tsup'
import { BuildOptions } from 'esbuild'

export default defineConfig(options => {
  const dev = options.env?.NODE_ENV === 'dev'
  return {
    entry: ['src/app.ts'],
    outDir: undefined,
    esbuildOptions: (options: BuildOptions) => {
      options.outfile = 'dist/bundle.js'
    },
    sourcemap: true,
    watch: dev,
    noExternal: [/(.*)/]
  }
})