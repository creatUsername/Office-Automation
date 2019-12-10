<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user"></user-card>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="动态" name="activity">
                <Activity />
              </el-tab-pane>
              <el-tab-pane label="账号" name="account">
                <Account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="时间线" name="timeline">
                <Timeline />                
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { UserCard, Activity, Account, Timeline } from './components'

export default {
  components: {
    UserCard,
    Activity,
    Account,
    Timeline
  },
  data() {
    return {
      user: {
        name: '',
        role: '',
        email: '',
        avatar: '',
        introduction: ''
      },
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'introduction'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: '623904853@qq.com',
        avatar: this.avatar,
        introduction: this.introduction
      }
    }
  },
}
</script>