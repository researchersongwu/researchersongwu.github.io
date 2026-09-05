---
section_id: publications
nav: Publications
order: 4
---

{% assign research_posts = site.posts | where_exp: 'post', "post.categories contains 'research'" %}
{% if research_posts.size > 0 %}
## Publications

{% for post in research_posts %}
<article class="publication" id="paper-{{ forloop.index }}">
  <h3>{{ post.title }}</h3>
  <p>{{ post.authors }}</p>
  <p class="paper-links">
    {% if post.pdf %}<a href="{{ post.pdf | relative_url }}">paper</a> /{% endif %}
    {% if post.poster %} <a href="{{ post.poster | relative_url }}">poster</a> /{% endif %}
    {% if post.code %} <a href="{{ post.code }}">code</a> /{% endif %}
    {% if post.slides %} <a href="{{ post.slides | relative_url }}">slides</a> /{% endif %}
  </p>
  <p><em>{{ post.venue }}</em></p>
  {% if post.features %}<p class="feature-line"><span class="square"></span>{{ post.features }}</p>{% endif %}
  {% if post.award %}<p class="feature-line"><span class="square red"></span><strong>{{ post.award }}</strong></p>{% endif %}
</article>
{% endfor %}
{% endif %}
