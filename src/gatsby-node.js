const assert = require('assert');

const { wrapMarkdownTemplate } = require('./utils');
const GithubApi = require('./github-api');

exports.sourceNodes = async (context, pluginOptions) => {
  const { actions, createNodeId, createContentDigest } = context;
  const { createNode } = actions;
  const { owner, repo } = pluginOptions;

  assert(owner, 'owner options is required');
  assert(repo, 'repo options is required');

  const github = new GithubApi(owner, repo);

  const issues = await github.getRepoIssues();

  issues.forEach(issue => {
    const markdownContent = wrapMarkdownTemplate(issue);
    createNode({
      ...issue,
      id: createNodeId(`github-issue-${issue.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'GithubIssue',
        mediaType: 'text/markdown',
        content: markdownContent,
        contentDigest: createContentDigest(issue),
      },
    });
  });

  return;
}
