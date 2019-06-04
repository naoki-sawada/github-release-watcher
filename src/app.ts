import * as jq from "node-jq";
import * as format from "string-template";
import importConfig from "./config";
import logger from "./logger";
import { messageTemplate } from "./template";
import updateChecker from "./updateChecker";
import VersionStore from "./VersionStore";
import webhook from "./webhook";

(async () => {
  const config = await importConfig();
  const store = new VersionStore(process.env.REDIS_URL);
  const results = await Promise.all(
    config.map(({ name, url, version, changelog }) =>
      updateChecker({
        url,
        version: data =>
          jq.run(version, data, { input: "json", output: "json" }),
        checker: current => store.compare({ key: name, version: current }),
        notification: version =>
          webhook({
            message: format(messageTemplate, { version, name, changelog }),
          }),
      }),
    ),
  );
  config.forEach(({ name }, index) =>
    logger.info(`${name}: ${results[index]}`),
  );
  store.disconnect();
})();
