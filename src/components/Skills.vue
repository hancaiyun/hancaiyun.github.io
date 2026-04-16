<template>
  <section id="skills" class="section">
    <h2>核心能力</h2>
    <div class="grid">
      <div class="card" v-for="skill in skills" :key="skill.name">
        <h3>{{ skill.name }}</h3>
        <p>{{ skill.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      skills: [
        { name: '前端工程化', description: '熟悉 Vue 生态、组件化开发与打包部署流程。' },
        { name: '产品实现', description: '将需求快速拆解并落地为可迭代页面能力。' },
        { name: '体验优化', description: '关注性能、响应式布局与交互一致性。' }
      ]
    };
  }
};
</script>
