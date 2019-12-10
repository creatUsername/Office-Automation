<template>
  <div class="user-activity">
    <div v-for="(item, index) in activitys" :key="index" class="post">
      <template v-if="item.type === 'message'">
        <div class="user-block">
          <!-- <img :src="avatar+avatarPrefix" class="img-circle" alt=""> -->
          <img :src="avatar" class="img-circle" alt="">
          <span class="username text-muted">{{ name }}</span>
          <span class="description">Sent you a message - {{ item.time | formatTime }}</span>
        </div>
        <p>{{ item.content }}</p>
        <ul class="list-inline">
          <li>
            <span class="link-black text-sm" @click="handleShare(item.id)">
              <i class="el-icon-share icon" :class="{'isShare': isShare(item.share)}"></i>
              Share({{ item.share.length }})
            </span>
          </li>
          <li>
            <span class="link-black text-sm" @click="handleLike(item.id)">
              <svg-icon icon-class="like" class="icon" :class="{'isLike': isLike(item.like)}"></svg-icon>
              Like({{ item.like.length }})
            </span>
          </li>
        </ul>
      </template>
      <template v-if="item.type === 'share'">
        <div class="user-block">
          <!-- <img :src="avatar+avatarPrefix" class="img-circle" alt=""> -->
          <img :src="avatar" class="img-circle" alt="">
          <span class="username text-muted">{{ name }}</span>
          <span class="description">Shared publicly - {{ item.time | formatTime }}</span>
        </div>
        <p class="user-share">
          {{ item.desc || '' }}
        </p>
        <div class="share-content">
          {{ item.sharelink.content }}
        </div>
        <ul class="list-inline">
          <li>
            <span class="link-black text-sm" @click="handleShare(item.id)">
              <i class="el-icon-share icon" :class="{'isShare': isShare(item.share)}"></i>
              Share({{ item.share.length }})
            </span>
          </li>
          <li>
            <span class="link-black text-sm" @click="handleLike(item.id)">
              <svg-icon icon-class="like" class="icon" :class="{'isLike': isLike(item.like)}"></svg-icon>
              Like({{ item.like.length }})
            </span>
          </li>
        </ul>
      </template>
      <template v-if="item.type === 'image'">
        <div class="user-block">
          <!-- <img :src="avatar+avatarPrefix" class="img-circle" alt=""> -->
          <img :src="avatar" class="img-circle" alt="">
          <span class="username text-muted">{{ name }}</span>
          <span class="description">Posted {{ item.imgs.length }} photos - {{ item.time | formatTime }}</span>
        </div>
        <div class="user-images">
          <el-carousel :interval="6000" type="card" height="220px">
            <el-carousel-item v-for="(imgs, i) in item.imgs" :key="i">
              <img :src="imgs" class="image">
            </el-carousel-item>
          </el-carousel>
        </div>
        <ul class="list-inline">
          <li>
            <span class="link-black text-sm" @click="handleShare(item.id)">
              <i class="el-icon-share icon" :class="{'isShare': isShare(item.share)}"></i>
              Share({{ item.share.length }})
            </span>
          </li>
          <li>
            <span class="link-black text-sm" @click="handleLike(item.id)">
              <svg-icon icon-class="like" class="icon" :class="{'isLike': isLike(item.like)}"></svg-icon>
              Like({{ item.like.length }})
            </span>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'
import { mapGetters } from 'vuex'
import { formatTime } from '@/utils'

export default {
  data() {
    return {
      avatarPrefix,
      carouselPrefix
    }
  },
  filters: {
    formatTime(time, option) {
      return formatTime(time, option)
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'activitys'
    ])
  },
  methods: {
    handleShare(id) {
      this.$store.dispatch('share', {id, user: this.name})
          .then(res => {
            this.$message({
              type: 'success',
              message: res
            })
          })
          .catch(err => {
            this.$message({
              type: 'warning',
              message: err
            })
          })
    },
    handleLike(id) {
      this.$store.dispatch('likeAgree', { id, user: this.name})
    },
    isShare(share) {
      return share.indexOf(this.name) > -1
    },
    isLike(like) {
      return like.indexOf(this.name) > -1
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .user-share {
    color: #333;
    font-weight: 600;
  }

  .share-content {
    // margin-left: 20px;
    background-color: rgba(212, 209, 209, 0.911);
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;
    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {
      cursor: pointer;

      &:hover,
      &:focus {
        color: #999;
      }

      .icon {
        transition: all .3s;

        &.isShare {
          color: #67C23A;
        }

        &.isLike {
          color: #F56C6C;
        }
      }
    }
  }
}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>