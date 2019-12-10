<template>
  <div :class="classObj" class="app-wrapper">
    <div class="drawer-bg"></div>
    <side-bar class="sidebar-container" />
    <div class="main-container" :class="{hasTagsView: tagsView}">
      <div :class="{'fixed-header': fixedHeader}">
        <nav-bar />
        <tags-view v-if="tagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import { AppMain, NavBar, Settings, SideBar, TagsView } from './components'
import { RightPanel } from '@/components'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    NavBar,
    Settings,
    SideBar,
    TagsView,
    RightPanel
  },
  computed: {
    ...mapGetters([
      'showSettings',
      'tagsView',
      'fixedHeader',
      'sidebar',
      'device'
    ]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include claerfix;
  @include relative;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width .28s;

  .hideSidebar & {
    width: calc(100% - 54px);
  }
}
</style>