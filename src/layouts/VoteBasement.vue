<template>
  <show-process v-bind:loading="loading" v-if="this.loading"></show-process>
  <show-dialog v-else-if="this.err !== null" v-bind:message="this.err"></show-dialog>
  <div v-else-if="is_active" class="mdui-container">
    <landing-description v-bind:title="title" v-bind:subtitle="subtitle"
                         v-bind:description="description"></landing-description>
    <div class="mdui-col-xs-12 mdui-m-t-2">
      <vote-card v-bind:questions="questions" v-bind:url="url"></vote-card>
    </div>
  </div>
  <show-dialog v-else v-bind:message="`操作将不能进行，请返回`"></show-dialog>
</template>

<script>
import VoteCard from '../components/VoteCard.vue'
import ShowDialog from '../components/ShowDialog.vue'
import ShowProcess from '../components/ShowProcess.vue'
import LandingDescription from '../components/LandingDescription.vue'

export default {
  props: ['ticket', 'vote_id'],
  name: 'vote-basement',
  components: {
    VoteCard,
    LandingDescription,
    ShowDialog,
    ShowProcess
  },
  data () {
    return {
      url: 'https://vote.hfi.me' + '/vote/id/' + this.vote_id + '/ticket/' + this.ticket,
      json: null,
      loading: false,
      err: null
    }
  },
  created: function () {
    this.fetchData()
  },
  computed: {
    vote: function () {
      return this.json.vote
    },
    title: function () {
      return this.vote.title
    },
    subtitle: function () {
      return this.vote.subtitle
    },
    description: function () {
      return this.vote.intro
    },
    questions: function () {
      return this.vote.questions
    },
    is_active: function () {
      return this.vote !== null && this.vote.is_voted === '0'
    },
    pic: function () {
      return this.vote.picture
    },
    end_word: function () {
      return this.vote.end_word
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      this.$mdui.JQ.ajax({
        method: 'GET',
        url: this.url,
        success: (data) => {
          this.loading = false
          this.json = JSON.parse(data)
          if (this.json.status === '200') {
            this.json = this.json.data
          } else {
            this.err = '内容无法加载！' + this.json.message
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
