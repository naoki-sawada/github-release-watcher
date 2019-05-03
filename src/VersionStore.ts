import * as Redis from "ioredis";

interface VersionStoreOptions {
  host: string;
  port: number;
}

interface CompareOptions {
  version: string;
  key: string;
}

export default class VersionStore {
  private redis: Redis.Redis;

  constructor({ host, port }: VersionStoreOptions) {
    this.redis = new Redis({
      host,
      port,
    });
  }

  public async compare({ version, key }: CompareOptions): Promise<boolean> {
    const latest = await this.redis.get(key);
    if (version !== latest) {
      await this.redis.set(key, version);
      return true;
    }
    return false;
  }

  public disconnect(): void {
    this.redis.disconnect();
  }
}
