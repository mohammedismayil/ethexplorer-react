import { AppConfiguration } from "./Constants";

export class APIHandler {
  constructor() {}

  static async fetchData(requestOptions, URL) {
    const respo = await fetch(URL, requestOptions);
    const json = await respo.json();
    return json;
  }
}
