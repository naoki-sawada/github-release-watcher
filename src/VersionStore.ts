import * as Redis from "ioredis";

interface CompareOptions {
  version: string;
  key: string;
}

export default class VersionStore {
  private redis: Redis.Redis;

  constructor(redisURL?: string) {
    this.redis = new Redis(redisURL || "127.0.0.1:6379");
  }

  public async compare({ version, key }: CompareOptions): Promise<boolean> {
    try {
      const latest = await this.redis.get(key);
      if (version !== latest) {
        await this.redis.set(key, version);
        return latest === null ? null : true;
      }
      return false;
    } catch (e) {
      throw e;
    }
  }

  public disconnect(): void {
    this.redis.disconnect();
  }
}
