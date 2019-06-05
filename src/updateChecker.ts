import axios from "axios";

interface UpdateCheckerOptions {
  method?: string;
  url: string;
  headers?: any;
  version: (data: any) => string | Promise<string>;
  checker: (version: string) => boolean | Promise<boolean>;
  notification: (version: string, subscribed: boolean) => void;
}

const updateChecker = async ({
  method,
  url,
  headers,
  version,
  checker,
  notification,
}: UpdateCheckerOptions): Promise<boolean> => {
  if (!url || !checker || !version) {
    throw new Error("`url`, `checker` or `version` param required."); // TODO: Fix
  }

  try {
    const { data } = await axios({
      method: method || "get",
      url,
      headers: headers || {
        Accept: "application/vnd.github.v3+json",
      },
    });

    const latest = await version(data);
    const isUpdate = await checker(latest);
    const subscribed = isUpdate === null;

    if (subscribed || isUpdate) {
      notification(latest, subscribed);
    }

    return isUpdate;
  } catch (e) {
    throw e;
  }
};

export default updateChecker;
