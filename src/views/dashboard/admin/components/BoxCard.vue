<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" alt="">
    </div>
    <div style="position:relative;">
      <user-thumb :image="avatar" class="userThumb"></user-thumb>
      <mallki class-name="mallki-text" text="vue-element-admin" />
      <div style="padding-top:35px;" class="progress-item">
        <span>Vue</span>
        <el-progress :percentage="70" />
      </div>
      <div class="progress-item">
        <span>JavaScript</span>
        <el-progress :percentage="18" />
      </div>
      <div class="progress-item">
        <span>Css</span>
        <el-progress :percentage="12" />
      </div>
      <div class="progress-item">
        <span>ESLint</span>
        <el-progress :percentage="100" status="success" />
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { UserThumb } from '@/components'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  data() {
    return {

    }
  },
  components: {
    UserThumb,
    Mallki
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
}
</script>

<style lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}
</style>

<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      transition: all .2s linear;

      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .userThumb {
    z-index: 100;
    width: 70px!important;
    height: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0;
    border: 5px solid #fff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    ::v-deep .ava-info {
      box-shadow: none!important;
    }
  }

  .mallki-text {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    font-weight: bold;
  }
  
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
}
</style>
