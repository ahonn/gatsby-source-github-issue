const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';

class GithubApi {
  constructor(owner, repo) {
    this.owner = owner;
    this.repo = repo;
  }

  async getRepoIssues() {
    const { owner, repo } = this;
    const issuesUrl = `${GITHUB_API_URL}/repos/${owner}/${repo}/issues`;
    const issuesResponse = await axios.get(issuesUrl);
    return issuesResponse.data;
  }
}

module.exports = GithubApi;

