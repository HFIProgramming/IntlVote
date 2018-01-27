<template>
  <div class="mdui-card mdui-m-t-5 mdui-col-xs-12 mdui-col-md-6">
    <div class="mdui-card-primary">
      <div class="mdui-card-primary-title">{{ vote.title }}</div>
      <div class="mdui-card-primary-subtitle">{{ vote.intro }}</div>
    </div>
    <div class="mdui-card-content">
      <div class="mdui-chip">
        <span class="mdui-chip-icon mdui-color-blue"><i class="mdui-icon material-icons">access_time</i></span>
        <span class="mdui-chip-title">开始时间: {{ vote.started_at }}</span>
      </div>
      <div class="mdui-chip">
        <span class="mdui-chip-icon mdui-color-pink"><i class="mdui-icon material-icons">timelapse</i></span>
        <span class="mdui-chip-title">结束时间: {{ vote.ended_at }}</span>
      </div>
      <div class="mdui-chip">
        <span class="mdui-chip-icon mdui-color-purple"><i class="mdui-icon material-icons">adjust</i></span>
        <span class="mdui-chip-title" v-if="vote_before">在 {{ vote_start.fromNow() }} 开始</span>
        <span class="mdui-chip-title" v-else-if="vote_time">在 {{ vote_end.fromNow() }} 结束</span>
        <span class="mdui-chip-title" v-else-if="vote_after">在 {{ vote_end.fromNow() }} 结束</span>
      </div>
      <div class="mdui-chip">
        <span class="mdui-chip-icon"><i class="mdui-icon material-icons">people</i></span>
        <span class="mdui-chip-title">总投票人数: {{ vote.times }}</span>
      </div>
    </div>
    <div class="mdui-card-actions mdui-m-b-2">
      <button v-if="vote.is_voted === '1'" class="mdui-btn mdui-ripple" disabled>已经投过票</button>
      <button v-else-if="!vote_time" class="mdui-btn mdui-ripple" disabled>不在投票时间</button>
      <router-link v-else
                   :to="{ name: 'VoteBasement', params: {ticket: ticket,vote_id: vote.id}}">
        <button class="mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent">开始投票</button>
      </router-link>
      <button v-if="vote.show_result !== '1'" class="mdui-btn mdui-ripple" disabled>当前投票不显示结果</button>
      <router-link v-else-if="vote.is_voted === '1'"
                   :to="{ name: 'VoteResult', params: {ticket: ticket,vote_id: vote.id}}">
        <button class="mdui-btn mdui-ripple">查看当前投票结果</button>
      </router-link>
      <button v-else class="mdui-btn mdui-ripple" disabled>投票后方可查看结果</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['vote', 'ticket'],
  name: 'landing-card',
  data () {
    return {
      vote_start: this.$moment(this.vote.started_at, 'YYYY-MM-DD HH:mm:ss'),
      vote_end: this.$moment(this.vote.ended_at, 'YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    vote_time: function () {
      return this.$moment().isBetween(this.vote_start, this.vote_end)
    },
    vote_before: function () {
      return this.$moment().isBefore(this.vote_start)
    },
    vote_after: function () {
      return this.$moment().isAfter(this.vote_end)
    }
  }
}
</script>
