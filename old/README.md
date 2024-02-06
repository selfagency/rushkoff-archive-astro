# Rushkoff Archive

<img src="./assets/avatar.svg" width="150" alt="Rushkoff Avatar" title="Rushkoff Avatar">

This is the source code repository for the Rushkoff Archive website, currently at:

https://rushkoff.github.io/rushkoff-archive/

## What's here

The top-level folder contains support code, configuration, and documentation, like this README.md file.

Folders within are:

 - `.github/workflows/` - Configuration for the GitHub [Action][actions] which rebuild the site.
 - `assets/` - Images and other what-not used in documentation etc. (not those used for the site).
 - `src/` - The actual Jekyll site.
 - `scripts/` - Scripts used for the initial population and subsequent maintenance of the repository.

## For Content Editors:

See [EDITORS.md](./EDITORS.md)

## For Developers

Developers can clone this repository, and assuming Jekyll and the other prerequisites are installed on their development computer, build a copy there.

Pushing changes back to the `master` branch should trigger a site rebuild.

More details in [DEVELOPERS.md](./DEVELOPERS.md).

[actions]: https://github.com/rushkoff/rushkoff-archive/actions
[issues]: https://github.com/rushkoff/rushkoff-archive/issues
