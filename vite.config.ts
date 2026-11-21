import path from 'path'
import { defineConfig } from '@lark-apaas/coding-preset-vite-react'

export default defineConfig({
  // 开源独立部署：client-toolkit-lite 的 AppContainer 在
  // process.env.MIAODA_BUILD_TARGET !== 'standalone' 时渲染「妙搭生成」水印。
  // 这里只改客户端常量，不改真实打包目标，因此代码分割与懒加载全部保留。
  define: {
    'process.env.MIAODA_BUILD_TARGET': JSON.stringify(
      process.env.MIAODA_BUILD_TARGET ?? 'standalone',
    ),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
})
