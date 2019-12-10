<template>
  <el-form>
    <el-form-item>
      <label class="avatar-tip">点击图片上传头像</label>
      <el-upload
        class="avatar-uploader"
        action="https://httpbin.org/post"
        accept=".jpg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="avatar" :src="avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model.trim="user.name"></el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email"></el-input>
    </el-form-item>
    <el-form-item label="介绍">
      <el-input v-model.trim="user.introduction"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click.native="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      uploading: null
    }
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    submit() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '用户信息已更新',
          duration: 5 * 1000
        })
      }, 1000)
    },
    beforeAvatarUpload(file) {
      // console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      this.uploading = Loading.service({
        text: '图片上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        this.uploading.close()
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        this.uploading.close()
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
      console.log(file)
      // 上传会被mock拦截，mock暂不支持文件上传
      
      this.$store.dispatch('uploadAvatar', res.files.file)
          .then(() => {
            this.uploading.close()
            this.$message({
              message: '上传成功',
              type: 'success'
            })
          })
          .catch(err => {
            this.uploading.close()
            console.log(err)
          })
    },
  }
}
</script>

<style lang="scss" scoped>
.avatar-tip {
  font-size: 14px;
  color: #606266;
  line-height: 40px
}
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover {
      border-color: #409EFF;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 2px;
    border: 1px dashed #ccc;

    &:hover {
      border: 1px dashed lightseagreen;
    }
  }
}
</style>