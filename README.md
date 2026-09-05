# 学术主页模板

一个零构建依赖、可直接部署到 GitHub Pages 的响应式学术主页。版块包括简介、动态、研究方向、代表论文、经历与荣誉，并内置深色模式、移动导航、论文筛选与滚动高亮。

## 本地预览

```bash
npm test
npm run dev
```

浏览器打开 `http://localhost:8080`。

## 修改清单

1. 在 `index.html` 搜索“你的名字”“某某”“Your Name”并替换。
2. 将个人照片放入 `assets/profile.jpg`，把 `.portrait-placeholder` 替换为 `<img src="assets/profile.jpg" alt="你的名字">`。
3. 将 PDF 简历放入 `assets/cv.pdf` 并修改简历链接。
4. 更新邮箱、GitHub、Google Scholar、论文和经历。

## 发布到 GitHub

```bash
git init
git add .
git commit -m "Create academic homepage"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

随后在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。工作流会自动部署，地址为 `https://YOUR_USERNAME.github.io/`。

若使用普通项目仓库，地址通常为 `https://YOUR_USERNAME.github.io/REPOSITORY/`；本模板使用相对路径，可直接工作。
