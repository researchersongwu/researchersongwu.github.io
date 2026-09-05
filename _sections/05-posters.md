---
section_id: posters
nav: Posters
order: 5
---

{% assign poster_posts = site.posts | where_exp: 'post', "post.categories contains 'poster'" %}
{% if poster_posts.size > 0 %}
## Posters

{% for post in poster_posts %}
<article class="publication poster" id="poster-{{ forloop.index }}">
  <h3>{{ post.title }}</h3>
  <p>{{ post.authors }}</p>
  {% if post.abstract %}<p class="paper-links"><a href="{{ post.abstract }}">abstract</a></p>{% endif %}
  {% if post.venue %}<p><em>{{ post.venue }}</em></p>{% endif %}
</article>
{% endfor %}
{% endif %}
