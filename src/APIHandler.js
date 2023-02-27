import { AppConfiguration } from "./Constants";

export class APIHandler {
  constructor() {}

  static async fetchData(requestOptions) {
    const respo = await fetch(AppConfiguration.networkURL, requestOptions);
    const json = await respo.json();
    return json;
  }
}
