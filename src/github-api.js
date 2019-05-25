const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';

class GithubApi {
  constructor(owner, repo, token) {
    this.owner = owner;
    this.repo = repo;
    this.token = token
  }

  async getRepoIssues() {
    const { owner, repo, token } = this;
    const issuesUrl = `${GITHUB_API_URL}/repos/${owner}/${repo}/issues?access_token=${token}`;
    const issuesResponse = await axios.get(issuesUrl);
    return issuesResponse.data;
  }
}

module.exports = GithubApi;

