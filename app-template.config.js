const githubBaseURL = "https://api.github.com";

module.exports = [
  {
    name: "Typeorm",
    url: `${githubBaseURL}/repos/typeorm/typeorm/tags`,
    version: ".[0].name",
    changelog: "https://github.com/typeorm/typeorm/blob/master/CHANGELOG.md",
  },
  {
    name: "Kubernetes",
    url: `${githubBaseURL}/repos/kubernetes/kubernetes/releases/latest`,
    version: ".name",
    changelog: "https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG.md",
  },
];
