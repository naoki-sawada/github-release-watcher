import * as jq from "node-jq";
import * as format from "string-template";
import importConfig from "./config";
import logger from "./logger";
import { messageTemplate, subscribedMessageTemplate } from "./template";
import updateChecker from "./updateChecker";
import VersionStore from "./VersionStore";
import webhook from "./webhook";

(async () => {
  const store = new VersionStore(process.env.REDIS_URL);
  try {
    const config = await importConfig();
    const results = await Promise.all(
      config.map(({ name, url, version, changelog }) =>
        updateChecker({
          url,
          version: data =>
            jq.run(version, data, { input: "json", output: "json" }),
          checker: current => store.compare({ key: name, version: current }),
          notification: (version, subscribed) =>
            webhook({
              message: format(
                subscribed ? subscribedMessageTemplate : messageTemplate,
                { version, name, changelog },
              ),
            }),
        }),
      ),
    );
    if (results) {
      config.forEach(({ name }, index) =>
        logger.info(`${name}: ${results[index]}`),
      );
    }
  } catch (e) {
    logger.error(e.stack);
  } finally {
    store.disconnect();
  }
})();
