# Markdown-Only Jekyll Academic Homepage

Live site: <https://researchersongwu.github.io/>

Every piece of editable homepage content lives in a Markdown file. The HTML layout is only a rendering shell; routine updates do not require editing HTML, YAML data files, or CSS.

## Edit your profile

Edit:

```text
_sections/01-about.md
```

This Markdown file contains your name, biography, university, advisor, research interests, email, GitHub, CV, Google Scholar, and LinkedIn links.

The browser title and description live in the Front Matter of `index.md`, which is also a Markdown file.

## Replace the CV placeholder

Replace this file with your real CV while keeping the same filename:

```text
assets/cv.pdf
```

The CV link in About will then open your uploaded document automatically.

## Edit homepage sections

```text
_sections/01-about.md
_sections/02-news.md
_sections/03-research.md
_sections/04-publications.md
_sections/05-talks.md
_sections/06-awards.md
_sections/07-services.md
_sections/08-experiences.md
```

All eight files are Markdown. Their Front Matter controls the navigation label and display order.

Leave the body of a section Markdown file empty to hide that section and its navigation item. Empty publication and talk folders likewise produce no placeholder content.

## Add a publication

Create a dated Markdown file in `_posts/`:

```text
_posts/2027-01-01-my-paper.md
```

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

Jekyll reads this Markdown automatically and adds it to Publications in reverse chronological order.

## Add a talk

Create a Markdown file in `_talks/` using the examples already present there. Jekyll automatically adds it to Talks.

## Local development

```bash
npm run build:docker
npm run dev:docker
```

Open `http://localhost:8080`.

## GitHub Pages

Push the Markdown files to `main`. The workflow in `.github/workflows/pages.yml` builds the Jekyll source into HTML and deploys it automatically.

## Attribution

Template adapted from `jackfromeast.github.io`; the upstream repository uses the MIT license and credits Jon Barron's academic website design.
