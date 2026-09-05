# Markdown-Only Jekyll Academic Homepage

Live site: <https://researchersongwu.github.io/>

All routine content changes are made in Markdown. Jekyll turns the Markdown into HTML and GitHub Pages publishes it automatically. You do not need to edit `_layouts/`, `_includes/`, `style.scss`, or any HTML file.

## Edit the profile

Open [`_sections/01-about.md`](_sections/01-about.md) and edit only the Markdown below the second `---` line:

```markdown
![Song Wu](images/personal.png)

# Song Wu

Write the English biography here.

**Email:** [researchersongwu@gmail.com](mailto:researchersongwu@gmail.com)
```

The email line is ordinary Markdown. Its visible text is the full email address and clicking it opens the visitor's mail application.

## Edit homepage sections

| Content | Markdown file |
| --- | --- |
| Profile | `_sections/01-about.md` |
| News | `_sections/02-news.md` |
| Research | `_sections/03-research.md` |
| Awards | `_sections/06-awards.md` |
| Services | `_sections/07-services.md` |
| Experiences | `_sections/08-experiences.md` |

Write ordinary Markdown below the Front Matter. Leave that area empty to hide the section and its navigation link.

## Add a publication using only Markdown

Copy [`_templates/publication.md`](_templates/publication.md) into `_posts/` and rename it with a date:

```bash
cp _templates/publication.md _posts/2027-01-01-my-paper.md
```

Then edit that new Markdown file. Use Markdown bold syntax such as `**Song Wu**` in the authors field. Blank optional fields stay hidden. Jekyll generates the Publications HTML automatically.

## Add a talk using only Markdown

Copy [`_templates/talk.md`](_templates/talk.md) into `_talks/`:

```bash
cp _templates/talk.md _talks/2027-01-01-my-talk.md
```

Edit the new Markdown file. Jekyll generates the Talks section automatically. If `_posts/` or `_talks/` contains no filled entry, its section stays hidden.

## Render locally

```bash
npm run build:docker
npm run dev:docker
```

Open <http://localhost:8080/>.

## Publish

```bash
git add .
git commit -m "Update academic homepage"
git push
```

The workflow in `.github/workflows/pages.yml` runs Jekyll and deploys the generated site to GitHub Pages.

## Attribution

Template adapted from `jackfromeast.github.io`; the upstream repository uses the MIT license and credits Jon Barron's academic website design.
