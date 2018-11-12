<template>
  <show-process v-bind:loading="loading" v-if="this.loading"></show-process>
  <show-dialog v-else-if="this.err !== null" v-bind:message="this.err"></show-dialog>
  <div v-else-if="is_active" class="mdui-container">

      <landing-description v-bind:title="title" v-bind:subtitle="subtitle"
                           v-bind:description="intro"></landing-description>
    <div class="mdui-m-t-0">
      <template v-for="vote in groups">
        <landing-card v-bind="{vote: vote, ticket: ticket}" v-bind:key="vote.id"></landing-card>
      </template>
    </div>
  </div>
  <show-dialog v-else v-bind:message="`该投票劵无效, 请联系工作人员`"></show-dialog>

</template>

<script>
import LandingCard from '../components/LandingCard.vue'
import ShowDialog from '../components/ShowDialog.vue'
import LandingDescription from '../components/LandingDescription.vue'
import ShowProcess from '../components/ShowProcess.vue'

export default {
  props: ['ticket'],
  name: 'basement',
  components: {
    ShowDialog,
    LandingCard,
    LandingDescription,
    ShowProcess
  },
  data () {
    return {
      url: 'https://vote.hfi.me/vote/ticket/' + this.ticket,
      votes: null,
      loading: false,
      err: null
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  computed: {
    title: function () {
      return this.vote_group.title
    },
    subtitle: function () {
      return this.vote_group.subtitle
    },
    intro: function () {
      return this.vote_group.intro
    },
    vote_group: function () {
      return this.votes.vote_group
    },
    groups: function () {
      return this.vote_group.votes
    },
    is_active: function () {
      return this.votes !== null && this.votes.active === '1'
    },
    pic: function () {
      return this.vote_group.picture
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      this.$mdui.JQ.ajax({
        method: 'GET',
        url: this.url,
        success: data => {
          this.loading = false
          this.votes = JSON.parse(data)
          if (this.votes.status === '200') {
            this.votes = this.votes.data
          } else {
            this.err = '内容无法加载！' + this.votes.message
          }
        },
        error: (xhr, textStatus) => {
          this.loading = false
          this.err = '获取数据失败，请重试！'
        }
      })
    }
  }
}
</script>
