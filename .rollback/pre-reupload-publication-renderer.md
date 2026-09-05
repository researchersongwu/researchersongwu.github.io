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
    {% assign has_previous_link = false %}
    {% if post.paper %}<a href="{{ post.paper }}">paper</a>{% assign has_previous_link = true %}{% elsif post.pdf %}<a href="{{ post.pdf | relative_url }}">paper</a>{% assign has_previous_link = true %}{% endif %}
    {% if post.artifact %}{% if has_previous_link %} / {% endif %}<a href="{{ post.artifact }}">artifact</a>{% assign has_previous_link = true %}{% endif %}
    {% if post.poster %}{% if has_previous_link %} / {% endif %}<a href="{{ post.poster | relative_url }}">poster</a>{% assign has_previous_link = true %}{% endif %}
    {% if post.code %}{% if has_previous_link %} / {% endif %}<a href="{{ post.code }}">code</a>{% assign has_previous_link = true %}{% endif %}
    {% if post.slides %}{% if has_previous_link %} / {% endif %}<a href="{{ post.slides | relative_url }}">slides</a>{% endif %}
  </p>
  <p><em>{{ post.venue }}</em></p>
  {% if post.features %}<p class="feature-line"><span class="square"></span>{{ post.features }}</p>{% endif %}
  {% if post.award %}<p class="feature-line"><span class="square red"></span><strong>{{ post.award }}</strong></p>{% endif %}
</article>
{% endfor %}
{% endif %}
