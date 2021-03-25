const assert = require('assert');

const { wrapMarkdownTemplate } = require('./utils');
const GithubApi = require('./github-api');

exports.sourceNodes = async (context, pluginOptions) => {
  const { actions, createNodeId, createContentDigest, reporter } = context;
  const { createNode } = actions;
  const { owner, repo, token } = pluginOptions;

  assert(owner, 'owner options is required');
  assert(repo, 'repo options is required');

  try {
    const github = new GithubApi(owner, repo, token);

    const issues = await github.getRepoIssues();
    const validIssues = issues.filter(({ user, state }) => {
      return user.login === owner && state === 'open';
    });

    validIssues.forEach((issue) => {
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
  } catch (err) {
    reporter.panic(err);
  }
};
