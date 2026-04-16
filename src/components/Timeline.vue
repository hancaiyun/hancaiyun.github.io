<template>
  <section id="timeline" class="section timeline">
    <h2>开发历程</h2>
    <div v-for="item in timeline" :key="item.title" class="timeline-item">
      <h3>{{ item.title }}</h3>
      <p class="period">{{ item.period }}</p>
      <p>{{ item.content }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      timeline: [
        {
          title: '初版搭建',
          period: '2024 Q1',
          content: '完成站点基础框架和首批页面内容。'
        },
        {
          title: '内容补全',
          period: '2025 Q3',
          content: '补充项目与能力信息，统一页面结构与视觉风格。'
        },
        {
          title: '首页重构',
          period: '2026 Q2',
          content: '围绕“主页面重新开发”目标完成组件整合和样式升级。'
        }
      ]
    };
  }
};
</script>
