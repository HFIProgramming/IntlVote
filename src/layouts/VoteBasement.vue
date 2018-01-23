<template>
  <div v-if="is_active" class="mdui-container">
    <div class="mdui-row mdui-col-xs-12">
      <landing-description v-bind:title="title" v-bind:subtitle="subtitle"
                           v-bind:description="description"></landing-description>
    </div>
    <div class="mdui-row mdui-m-t-0">
      <vote-card v-bind:questions="questions" v-bind:url="url"></vote-card>
    </div>
  </div>
  <show-dialog v-else v-bind:message="`操作将不能进行，请返回`"></show-dialog>
</template>

<script>
import VoteCard from '../components/VoteCard.vue'
import ShowDialog from '../components/ShowDialog.vue'
import mdui from 'mdui'

export default {
  props: ['ticket', 'vote_id'],
  name: 'vote-basement',
  components: {
    VoteCard,
    ShowDialog
  },
  data () {
    return {
      url: 'https://vote.hfi.me' + '/vote/id/' + this.vote_id + '/ticket/' + this.ticket
    }
  },
  computed: {
    fetch_data: function () {
      var json = null
      mdui.JQ.ajax({
        method: 'GET',
        url: this.url,
        success: function (data) {
          json = JSON.parse(data).data
        }
      })

      return json.data
    },
    vote: function () {
      return this.fetch_data.vote
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
    }
  },
  methods: {}
}
</script>
