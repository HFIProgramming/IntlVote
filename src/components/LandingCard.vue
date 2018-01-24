<template>
  <div class="mdui-card mdui-m-t-5 mdui-m-b-5 mdui-col-xs-12 mdui-col-md-6">
    <div class="mdui-card-media">
      <img src="../assets/card.jpg"/>
      <div class="mdui-card-media-covered">
        <div class="mdui-card-primary">
          <div class="mdui-card-primary-title">{{ vote.title }}</div>
          <div class="mdui-card-primary-subtitle">{{ vote.intro }}</div>
        </div>
      </div>
    </div>
    <div class="mdui-card-content">
      <div class="mdui-chip">
        <span class="mdui-chip-title">开始时间: {{ vote.started_at }}</span>
      </div>
      <div class="mdui-chip">
        <span class="mdui-chip-title">结束时间: {{ vote.ended_at }}</span>
      </div>
      <div class="mdui-chip">
        <span class="mdui-chip-title">总投票人数: {{ vote.times }}</span>
      </div>
    </div>
    <div class="mdui-card-actions mdui-m-b-5">
      <button v-if="vote.is_voted === '1'" class="mdui-btn mdui-ripple" disabled>已经投过票</button>
      <button v-else-if="vote.vote_time" class="mdui-btn mdui-ripple" disabled>投票尚未开始</button>
      <router-link v-else
                   :to="{ name: 'VoteBasement', params: {ticket: ticket,vote_id: vote.id}}">
        <button class="mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent">开始投票</button>
      </router-link>
      <!--Not Finished Yet-->
      <router-link v-if="vote.show_result === '1'"
                   :to="'/'">
        <button class="mdui-btn mdui-ripple">查看结果</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['vote', 'ticket'],
  name: 'landing-card',
  computed: {
    vote_time: function () {
      return !(Date.parse(this.vote.started_at) <= Date.now() && Date.parse(this.vote.ended_at) >= Date.now())
    }
  }
}
</script>
