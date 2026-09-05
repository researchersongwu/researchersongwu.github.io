# Jekyll Academic Homepage

An English academic homepage using the same Jekyll content workflow as `jackfromeast.github.io`. Each publication is a Markdown file in `_posts/`; the Liquid template automatically generates the Publications section. Talks work the same way through `_talks/`.

## Initial configuration

Edit `_config.yml` to set your name, university, advisor, email, GitHub profile, Google Scholar profile, LinkedIn profile, research interests, CV, and profile photo.

## Add a publication

Copy an existing example:

```bash
cp _posts/2026-08-01-open-world.md _posts/2027-01-01-my-paper.md
```

Edit its YAML Front Matter:

```yaml
---
layout: post
title: "Paper Title"
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

Place the associated PDF files in `assets/`.

## Add a talk

Copy an example from `_talks/` and update `title`, `date`, `display_date`, `role`, `venue`, `link`, `slides`, and `video`.

## Other content

- News: `_data/news.yml`
- Awards: `_data/awards.yml`
- Academic service: `_data/services.yml`
- Experience: `_data/experiences.yml`
- Page layout: `_layouts/default.html`
- Styles: `style.scss`

## Local development

With Ruby and Bundler:

```bash
bundle install
bundle exec jekyll serve --livereload --port 8080
```

Or with Docker:

```bash
npm run build:docker
npm run dev:docker
```

Open `http://localhost:8080`.

## GitHub Pages

Push to `main`. The workflow in `.github/workflows/pages.yml` builds the Jekyll site and deploys it. In the repository, select **Settings → Pages → Source → GitHub Actions**.

## Attribution

Template adapted from `jackfromeast.github.io`; the upstream repository uses the MIT license and credits Jon Barron's academic website design.
