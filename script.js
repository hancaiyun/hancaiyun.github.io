// Simple demo script to populate projects & posts and implement theme toggle
const projects = [
  {
    title: "个人作品集网站",
    desc: "一个响应式作品集站点，展示项目与文章，支持暗色主题与自定义域名配置。",
    url: "#",
    tags: ["HTML","CSS","JS"]
  },
  {
    title: "开源组件库",
    desc: "可复用的 UI 组件集合，包含表单、表格、模态框等。",
    url: "#",
    tags: ["Vue","React","组件"]
  },
  {
    title: "性能监控仪表盘",
    desc: "实时数据展示与告警系统的前端实现示例。",
    url: "#",
    tags: ["D3","Chart","性能"]
  }
];

const posts = [
  { title: "如何用 CSS 实现现代卡片样式", date: "2026-03-10", href: "#" },
  { title: "前端构建工具：Vite 与 Webpack 的对比", date: "2026-02-25", href: "#" },
  { title: "从零构建一个轻量化的组件库", date: "2026-01-12", href: "#" }
];

function renderProjects() {
  const el = document.getElementById("projects-list");
  el.innerHTML = projects.map(p => `
    <article class="project-card">
      <h4><a href="${p.url}">${p.title}</a></h4>
      <p>${p.desc}</p>
      <div class="badges">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderPosts() {
  const el = document.getElementById("posts-list");
  el.innerHTML = posts.map(p => `
    <li>
      <h4><a href="${p.href}">${p.title}</a></h4>
      <div class="muted">${p.date}</div>
    </li>
  `).join("");
}

function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved === "dark") root.classList.add("dark");
  toggle.textContent = root.classList.contains("dark") ? "☀️" : "🌙";
  toggle.addEventListener("click", () => {
    root.classList.toggle("dark");
    const isDark = root.classList.contains("dark");
    toggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

function init() {
  renderProjects();
  renderPosts();
  initTheme();
  document.getElementById("year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", init);
