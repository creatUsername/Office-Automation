import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

Vue.component('svg-icon', SvgIcon)
// 如果要从iconfont下载图标，请记住使用诸如Sketch之类的工具来指定图标的大小。
// size 128 * 128

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)