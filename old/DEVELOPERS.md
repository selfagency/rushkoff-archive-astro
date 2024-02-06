# Developers

This file has some guidelines for developers working on this site. It is a work in progress. If you think anything is wrong or missing, please file an issue in the GitHub project.

## Editing the site and building a development copy

This is how to build and develop this site.

You will need a working Jekyll installation - details of how to set this up on various platforms can be found on the [Jekyll Website][jekyll], the [GitHub Pages Docs][github-pages] and the [GitHub Pages Jekyll Docs][jekyll-github]. I also assume working knowledge of Jekyll, Ruby, Git, and HTML/CSS.

Given that you can build a working copy of the site, malke changes, and observe the result, before pushing the changes back to the repository's master branch. Once that is done, the GitHub pages action will be triggered to rebuild and publish the latest version of the site.

In brief, assuming you're on a Unix-like OS and have Git, Ruby, and Ruby's Bundler command installed:

- Check out this repository locally: `git clone git@github.com:wu-lee/rushkoff-archive.git`
- Change to the `src` folder: `cd rushkoff-archive/src`
- Install Jekyll: `bundle install`
- Run Jekyll: `bundle exec jekyll serve`
- This should print out the server address to use, typically http://127.0.0.1:4000. Open that in a browser.
- Edits should trigger Jekyll to rebuild the site automatically.

When satisfied, commit your changes on the master branch and:

- Run `git push` to push the commits back to the origin, GitHub.
- Wait a few minutes and the site should be rebuilt.
- Check the Actions tab on the GitHub project for progress and to see any errors in the build.

## Import scripts

Within the [scripts/](./scripts) directory there exists code to extract content and populate this site from the previous incarnation of this archive website, which was hosted on a Strapi installation at:

https://api.archive.rushkoff.com/.

This site may no longer be online, and is now out of date in any case. 

But for the record, very briefly, to execute the extraction, you would run:

    scripts/posts2yaml.rb  # to get Markdown with a YAML metadata header
	
Or:

    scripts/posts2tsv.rb   # to get tab-delimited values suitable for spreadsheet import
	
These scripts require Ruby 2.x or later.


[github-pages]: https://pages.github.com/
[jekyll-github]: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll
[actions]: https://github.com/rushkoff/rushkoff-archive/actions
[issues]: https://github.com/rushkoff/rushkoff-archive/issues
