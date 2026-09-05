---
section_id: talks
nav: Talks
order: 5
---

## Talks

{% assign sorted_talks = site.talks | sort: 'date' | reverse %}
{% for talk in sorted_talks %}
<div class="list-entry">
  <div><strong>{{ talk.title }}</strong><br>{{ talk.role }}, <em>{{ talk.venue }}</em><br>{% if talk.link %}<a href="{{ talk.link }}">link</a> /{% endif %}{% if talk.slides %} <a href="{{ talk.slides | relative_url }}">slides</a> /{% endif %}{% if talk.video %} <a href="{{ talk.video }}">video</a> /{% endif %}</div>
  <time>{{ talk.display_date }}</time>
</div>
{% endfor %}
