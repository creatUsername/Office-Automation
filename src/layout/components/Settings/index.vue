<template>
  <div class="drawer-container">
    <div>

      <h3 class="drawer-title">Page Style Setting</h3>

      <div class="drawer-item">
        <span>主题色</span>
        <theme-picker
          style="float: right;height: 26px; margin: -3px 8px 0 0;"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>标签视图</span>
        <el-switch v-model="tagsView" class="drawer-switch"></el-switch>
      </div>

      <div class="drawer-item">
        <span>导航悬浮</span>
        <el-switch v-model="fixedHeader" class="drawer-switch"></el-switch>
      </div>

      <div class="drawer-item">
        <span>侧边栏LOGO</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch"></el-switch>
      </div>

    </div>
  </div>
</template>

<script>
import { ThemePicker } from '@/components'

export default {
  name: 'Settings',
  components: {
    ThemePicker
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(value) {
        this.$store.dispatch('changeSetting', {
          key: 'fixedHeader',
          value
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(value) {
        this.$store.dispatch('changeSetting', {
          key: 'tagsView',
          value
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(value) {
        this.$store.dispatch('changeSetting', {
          key: 'sidebarLogo',
          value
        })
      }
    },
  },
  methods: {
    themeChange(value) {
      this.$store.dispatch('changeSetting', {
        key: 'theme',
        value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0,0,0,.85);
    font-size: 14px;
    line-height: 1.5;
  }

  .drawer-item {
    color: rgba(0,0,0,.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>