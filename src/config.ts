interface Config {
  name: string;
  url: string;
  version: string;
  changelog: string;
}

const githubBaseURL = "https://api.github.com";

export const messageTemplate =
  "{name} {varsion} was released! Please check {changelog}";

const config: Config[] = [
  {
    name: "typeorm",
    url: `${githubBaseURL}/repos/typeorm/typeorm/tags`,
    version: ".[0].name",
    changelog: "https://github.com/typeorm/typeorm/blob/master/CHANGELOG.md",
  },
  {
    name: "kubernetes",
    url: `${githubBaseURL}/repos/kubernetes/kubernetes/releases/latest`,
    version: ".name",
    changelog:
      "https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG.md",
  },
];

export default config;
