import * as jq from "node-jq";
import { forEach } from "p-iteration";
import * as format from "string-template";
import config, { messageTemplate } from "./config";
import updateChecker from "./updateChecker";
import VersionStore from "./VersionStore";
import webhook from "./webhook";

(async () => {
  const store = new VersionStore({
    port: 6379,
    host: process.env.REDIS_URL || "127.0.0.1",
  });

  await forEach(config, async ({ name, url, version, changelog }) => {
    const result = await updateChecker({
      url,
      version: data => jq.run(version, data, { input: "json", output: "json" }),
      checker: current => store.compare({ key: name, version: current }),
      notification: varsion =>
        webhook({
          message: format(messageTemplate, { varsion, name, changelog }),
        }),
    });

    console.log(`${name}: ${result}`);
  });

  store.disconnect();
})();
