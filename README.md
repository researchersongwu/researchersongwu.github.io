# Jekyll Academic Homepage

直接采用 `jackfromeast.github.io` 的 Jekyll 内容维护方式：每篇论文写成一个 `_posts/*.md` 文件，页面通过 Liquid 循环自动生成 Publications；报告放入 `_talks/*.md` 后自动生成 Talks。

## 第一次配置

编辑 `_config.yml`，填写姓名、学校、导师、邮箱、GitHub、Scholar、LinkedIn 和研究方向。

## 新增论文

复制示例：

```bash
cp _posts/2026-08-01-open-world.md _posts/2027-01-01-my-paper.md
```

修改新文件的 YAML Front Matter：

```yaml
---
layout: post
title: "论文标题"
date: 2027-01-01
categories: research
authors: "Author A, <strong>Your Name</strong>, Author B"
venue: "Conference Name, 2027"
pdf: "/assets/paper.pdf"
code: "https://github.com/USER/PROJECT"
slides: "/assets/slides.pdf"
award: "Oral Presentation"
---
```

论文 PDF 放入 `assets/`。

## 新增报告

复制 `_talks/` 内的示例 Markdown，并修改 `title`、`date`、`role`、`venue`、`link`、`slides` 和 `video`。

## 其他内容

- 最新动态：`_data/news.yml`
- 奖项：`_data/awards.yml`
- 学术服务：`_data/services.yml`
- 经历：`_data/experiences.yml`
- 页面结构：`_layouts/default.html`
- 样式：`style.scss`

## 本地运行

```bash
bundle install
bundle exec jekyll serve --livereload --port 8080
```

访问 `http://localhost:8080`。

如果使用 Docker：

```bash
npm run build:docker
npm run dev:docker
```

## GitHub Pages

推送到 `main` 后，`.github/workflows/pages.yml` 会用 Jekyll 构建 `_site` 并部署。仓库 Settings → Pages → Source 选择 **GitHub Actions**。

## Attribution

Template adapted from `jackfromeast.github.io`; upstream repository uses the MIT license and credits Jon Barron's academic website design.
