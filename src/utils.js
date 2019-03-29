module.exports = {
  wrapMarkdownTemplate(issue) {
    const { title, body, created_at, labels, number } = issue;

    const tags = '[' + labels.map(({ name }) => `"${name}"`).join(',') + ']';
    const markdown = `---\ntitle: "${title}"\ndate: "${created_at}"\ntags: ${tags}\nissueId: ${number}\n---\n\n${body}`;

    return markdown;
  },
};
