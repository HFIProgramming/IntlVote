<template>
  <show-process v-bind:loading="loading" v-if="this.loading"></show-process>
  <show-dialog v-else-if="this.err !== null" v-bind:message="this.err"></show-dialog>
  <div class="mdui-container" v-else>
    <div class="mdui-col-xs-12">
      <landing-description v-bind:title="title" v-bind:subtitle="subtitle"
                           v-bind:description="description"></landing-description>
    </div>
    <div class="mdui-col-xs-12 mdui-m-t-0">
      <template v-for="question in questions">
      <vote-result-card v-bind:question="question" v-bind:key="question.id"></vote-result-card>
      </template>
    </div>
  </div>
</template>

<script>
import VoteResultCard from '../components/VoteResultCard.vue'
import ShowDialog from '../components/ShowDialog.vue'
import ShowProcess from '../components/ShowProcess.vue'
import LandingDescription from '../components/LandingDescription.vue'

export default {
  props: ['ticket', 'vote_id'],
  name: 'vote-result',
  components: {
    VoteResultCard,
    LandingDescription,
    ShowDialog,
    ShowProcess
  },
  data () {
    return {
      url:
        'https://vote.hfi.me' +
        '/vote/id/' +
        this.vote_id +
        '/ticket/' +
        this.ticket +
        '/result',
      json: null,
      loading: false,
      err: null
    }
  },
  created: function () {
    this.fetchData()
  },
  computed: {
    title: function () {
      return this.json.title
    },
    subtitle: function () {
      return this.json.subtitle
    },
    description: function () {
      return this.json.intro
    },
    questions: function () {
      return this.json.questions
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
