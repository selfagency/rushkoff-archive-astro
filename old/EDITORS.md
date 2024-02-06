# Editors

This file has some guidelines for editors working on this site. It is a work in progress. If you think anything is wrong or missing, please file an [issue in the GitHub project][issues].

## Editing the content.

There used to be a friendly UI for non-techy people to edit the content at [Forestry.io][forestry] but that application was end-of-lifed in April 2023. A replacement may be implemented, perhaps using the successor to Forestry, [TinaCMS][tinacms], but this is work in progress at the time of writing.

### Using GitHub's UI

In the meantime, assuming you have write access you can edit the articles directly in GitHub's UI. If you click on the name of an editable file, you should see a preview, with a pencil icon in the top-right of the header above the content.  This should open the content in edit view, allowing you to make changes, preview the result and commit them.

The details depend on the file type, but for files with a `.md` suffix, the content is [Markdown][markdown], which is more or less plain text with some formatting rules, and the ability to inline some basic HTML tags should you need to. See the [GitHub Markdown Documentation][github-markdown] for more information on the format. There is usually a link to that document in the edit page, at the bottom right - click the Markdown icon there.

You will also need to know some basic concepts about Jekyll. [Still to be written; in the mean time ask an existing editor for guidance.]

After editing a file, you should include a commit message explaining what was changed. The site should rebuild on committing the change, and this message remains in the commit history as a record.

If you don't have write access, you need to ask the maintainers of this project, or submit your changes by cloning the repository, and submitting a pull request (which requires some technical know-how).  Most people who need to be altering the site will already be in contact with the maintainers. But in case not, the best way to contact the maintainers is probably to submit an issue to the GitHub project.


## Rebuilding the site.

There is a GitHub Action which rebuilds the website whenever changes are committed to the master branch of this repository. To check the state of this action look on the [Actions Tab][actions] of this project.  You can also trigger the action manually there.

If there are problems building, contact a developer who has access to the project. A sensible way to do this is to submit an issue describing a problem in the [Issues][issues] tab on the GitHub project page. When doing this it is extremely helpful to explain what the problem is - and importantly - how a developer would recreate the problem you're seeing.

[forestry]: https://forestry.io
[tinacms]: https://tina.io
[actions]: https://github.com/rushkoff/rushkoff-archive/actions
[issues]: https://github.com/rushkoff/rushkoff-archive/issues
[github-markdown]: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
[markdown]: https://en.wikipedia.org/wiki/Markdown
