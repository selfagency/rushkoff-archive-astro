---
title: Publications
layout: page
---
This is the list of places articles have been published. Click on an
item to see a summary and the list of articles published there.

{% assign items = site.articles | concat: site.videos_elsewhere | concat: site.misc_elsewhere %}
{% assign collection = site.collections | where: "label", "publications" | first %}
{% include topics-list.html topic_collection=collection topics=site.publications items=items item_field='publication'%}
