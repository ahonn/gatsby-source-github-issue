module.exports = {
  wrapMarkdownTemplate(issue) {
    const { title, body, created_at, labels } = issue;

    const tags = '[' + labels.map(({ name }) => `"${name}"`).join(',') + ']';
    const markdown = `---\ntitle: "${title}"\ndate: "${created_at}"\ntags: ${tags}\n---\n\n${body}`;

    return markdown;
  },
};
