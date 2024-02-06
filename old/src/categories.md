---
title: Categories
layout: page
---
This is the list of article categories. Click on an item to see a
summary and the list of articles published within it.

{% assign items = site.articles | concat: site.videos_elsewhere | concat: site.misc_elsewhere %}
{% assign collection = site.collections | where: "label", "categories" | first %}
{% include topics-list.html topic_collection=collection topics=site.categories items=items item_field='categories'%}

