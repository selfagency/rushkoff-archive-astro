import { mkdir, readFile, writeFile, readdir } from 'fs/promises';
import { existsSync } from 'fs';
import * as matter from 'gray-matter';
import * as dayjs from 'dayjs';

async function getPubs() {
  const base = `${process.cwd()}/old/src/_publications`;
  const files = await readdir(base);
  let pubs = [];
  for (const file of files) {
    const content = await readFile(`${base}/${file}`, 'utf-8');
    const meta = matter(content);
    pubs.push({ name: meta.data.title, slug: file.replace(/\.md/, '') });
  }
  await writeFile(`${process.cwd()}/src/content/pubs.json`, JSON.stringify(pubs));
}

async function sortFiles() {
  // const pubs = await getPubs();

  // set base folder
  const base = `${process.cwd()}/src/content`;
  const unsorted = `${base}/unsorted`;
  const sorted = `${base}/sorted`;

  // get all files in the base folder
  const files = (await readdir(unsorted, { withFileTypes: true }))
    .filter(dirent => dirent.isFile() && !dirent.name.endsWith('.json'))
    .map(dirent => dirent.name);

  // loop through each file
  for (const file of files) {
    console.log(file);

    // read the file content
    let content = await readFile(`${unsorted}/${file}`, 'utf-8');

    // get the notes
    let note = content.match(/^notes: (.+)\npublication/m);

    // if notes exist, replace the double quotes with single quotes and remove new lines
    if (note && note[1]) {
      let newNote = note[1].replace(/"/g, "'").replace(/\n/g, ' ');
      content = content.replace(/^notes: Source: (.+)$/gm, `source: $1`);
      content = content.replace(/^notes:.+?\[(.+)\].+?$/gm, `notes: $1`);
    }

    // get the blurb
    let blurb = content.match(/^blurb: (.+)$/gm);

    // if blurb exists and it doesn't contain double quotes, add them
    if (blurb && !blurb[0]?.includes('"')) {
      content = content.replace(/^blurb: (.+)\nnotes/gm, `blurb: "$1"\nnotes`);
    }

    // parse the frontmatter
    const meta = matter(content);

    // get the categories
    const categories = meta.data.categories?.map((cat: string) =>
      cat?.replace(/_categories\//, '').replace(/\.md/, '')
    );

    // get the publication
    const publication = meta.data.publication?.replace(/_publications\//, '').replace(/\.md/, '');

    // get the title and format it
    const title = meta.data.title
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^a-zA-Z0-9-]/g, '_');

    // get the date and format it
    const date = dayjs(meta.data.date).format('YYYY-MM-DD');

    // create the new file content
    const newContent = `---
title: ${meta.data.title.replace(/"/g, '')}
subtitle: ${meta.data.subtitle ?? ''}
date: ${date}
blurb: ${meta.data.blurb ?? ''}
notes: ${meta.data.notes ?? ''}
publication: ${publication ? publication.replace(/-/g, '_') : ''}
---

${meta.content}
`;

    // create the new file path
    let newPath;

    // if categories exist, create a folder for the first category and save the file there
    if (categories?.length > 0) {
      newPath = `${sorted}/${categories[0]}/${date}_${title}.md`;

      if (!existsSync(`${sorted}/${categories[0]}`)) {
        await mkdir(`${sorted}/${categories[0]}`);
      }
      // if no categories exist, save the file in the base folder
    } else {
      newPath = `${sorted}/${date}_${title}.md`;
    }

    // write the new file
    await writeFile(newPath, newContent);
  }
}

// run the function
try {
  sortFiles();
} catch (e) {
  console.error(e);
}
