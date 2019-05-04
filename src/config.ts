import { transformAndValidate } from "class-transformer-validator";
import { IsString, IsUrl } from "class-validator";

class Config {
  @IsString()
  public name: string;

  @IsUrl()
  public url: string;

  @IsString()
  public version: string;

  @IsString()
  public changelog: string;
}

export const importConfig = async (path?: string): Promise<Config[]> => {
  const obj = require(`${process.cwd()}/${path || "app.config.js"}`);

  const config = await transformAndValidate(Config, obj).catch(e => {
    throw new Error(`Config validation error: ${JSON.stringify(e)}`);
  });

  return Array.isArray(config) ? config : [config];
};

export default importConfig;
