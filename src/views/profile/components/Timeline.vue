<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) of timeline"
        :key="index"
        :timestamp="item.timestamp"
        :icon="item.icon"
        :type="item.type"
        :color="item.color"
        :size="item.size"
        placement="top"
      >
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'timeline'
    ])
  },
  // created() {
  //   this.timeline[0]['color'] = '#67C23A'
  // },
  methods: {

  }
}
</script>
