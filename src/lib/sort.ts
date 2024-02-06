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
  const pubs = await getPubs();
  const base = `${process.cwd()}/src/content`;
  const files = (await readdir(base, { withFileTypes: true }))
    .filter(dirent => dirent.isFile() && !dirent.name.endsWith('.json'))
    .map(dirent => dirent.name);

  for (const file of files) {
    console.log(file);
    const content = await readFile(`${base}/${file}`, 'utf-8');

    const meta = matter(content);

    const categories = meta.data.categories?.map((cat: string) =>
      cat?.replace(/_categories\//, '').replace(/\.md/, '')
    );

    const publication = meta.data.publication?.replace(/_publications\//, '').replace(/\.md/, '');

    const title = meta.data.title
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^a-zA-Z0-9-]/g, '_');

    const date = dayjs(meta.data.date).format('YYYY-MM-DD');

    const newContent = `---
title: ${meta.data.title.replace(/"/g, '')}
subtitle: ${meta.data.subtitle ?? ''}
date: ${date}
blurb: ${meta.data.blurb ?? ''}
notes: ${meta.data.notes ?? ''}
publication: ${publication}
categories: [${categories ? categories.join(', ') : ''}]
---

${meta.content}
`;

    const newPath = `${base}/sorted/${date}_${title}.md`;
    await writeFile(newPath, newContent);
  }
}

try {
  sortFiles();
} catch (e) {
  console.error(e);
}
