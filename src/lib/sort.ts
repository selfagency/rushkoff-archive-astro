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
  let processed: any[] = [];

  // set base folder
  const base = `${process.cwd()}/src/content`;
  const unsorted = `${base}/unsorted`;
  const sorted = `${base}/sorted`;

  if (!existsSync(sorted)) {
    await mkdir(sorted);
    await mkdir(sorted + '/duplicates');
  }

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
    let note = content.match(/^notes: ((.|\n)+)\npublication/m);

    // if notes exist, replace the double quotes with single quotes and remove new lines
    if (note && note[1]) {
      let newNote = note[1]
        ?.replace(/\[(.+)\]\(.+\)/gm, '$1')
        ?.replace(/"/gm, "'")
        ?.replace(/\n/gm, ' ')
        ?.trim();
      content = content.replace(/^notes: ((.|\n)+)\npublication/gm, `notes: "${newNote}"\npublication`);
    }

    // get the blurb
    let blurb = content.match(/^blurb: (.+)\nnotes/m);

    // if blurb exists and it doesn't contain double quotes, add them
    if (blurb && blurb[1]) {
      const newBlurb = blurb[1].replace(/"/g, '').replace(/\\/g, '');
      content = content.replace(/^blurb: (.+)\nnotes/gm, `blurb: "${newBlurb}"\nnotes`);
    }

    // parse frontmatter
    const meta = matter(content);

    // get the categories
    const categories = meta.data.categories?.map((cat: string) =>
      cat?.replace(/_categories\//, '').replace(/\.md/, '')
    );

    // get the publication
    const publication = meta.data.publication?.replace(/_publications\//, '').replace(/\.md/, '');

    // get the title and format it
    const slug = meta.data.title
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/[^a-zA-Z0-9-]/g, '_');

    // get the date and format it
    const date = dayjs(meta.data.date).format('YYYY-MM-DD');

    let title = meta.data.title?.replace(/"/g, '');
    title = title?.includes(': ') ? '"' + title + '"' : title;

    let subtitle = meta.data.subtitle?.replace(/"/g, '');
    subtitle = subtitle?.includes(': "') ? '"' + subtitle + '"' : subtitle;

    let blurbText = meta.data.blurb?.replace(/"/g, '');
    blurbText = blurbText?.includes(': "') ? '"' + blurbText + '"' : blurbText;

    let notes = meta.data.notes?.replace(/"/g, '');
    notes = notes?.includes(': "') ? '"' + notes + '"' : notes;

    let newMeta = '';
    newMeta += `title: ${title ?? ''}\n`;
    newMeta += `subtitle: ${subtitle ?? ''}\n`;
    newMeta += `date: ${date ?? ''}\n`;
    newMeta += `blurb: ${blurbText ?? ''}\n`;
    newMeta += `notes: ${notes ?? ''}\n`;
    newMeta += `source: ${meta.data.source ?? ''}\n`;
    newMeta += `publication: ${publication?.replace(/-/g, '_') ?? ''}\n`;

    // console.log(newMeta);

    // create the new file content
    const newContent = `---\n${newMeta}---\n${meta.content}`;

    // create the new file path
    let newPath;

    if (!existsSync(`${sorted}/journalism`)) {
      await mkdir(`${sorted}/journalism`);
    }

    // if categories exist, create a folder for the first category and save the file there
    if (categories?.length > 0) {
      newPath = `${sorted}/${categories[0]}/${date}_${slug}.md`;

      if (!existsSync(`${sorted}/${categories[0]}`)) {
        await mkdir(`${sorted}/${categories[0]}`);
      }
      // if no categories exist, save the file in the journalism folder
    } else {
      newPath = `${sorted}/journalism/${date}_${slug}.md`;
    }

    const exists = processed.find(p => p.slug === slug);
    if (exists && exists.title === meta.data.title.replace(/"/g, '')) {
      newPath = `${sorted}/duplicates/${date}_${slug}.md`;
    } else {
      processed.push({ slug, ...meta.data });
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
