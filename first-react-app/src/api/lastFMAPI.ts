export const lastFM = {
  _apiLink: "http://ws.audioscrobbler.com/2.0/",
  _apiKey: "d15ae01ae3b43dd6f2f28360c896b596",
  _apiFormat: "json",

  async getInfo(params: any) {
    const qs = this._convertToQueryString({
      ...params,
      api_key: this._apiKey,
      format: this._apiFormat,
    });

    const res = await fetch(`${this._apiLink}?${qs}`);

    if (!res.ok) {
      throw new Error(`Couldn't fetch data, status ${res.status}`);
    }

    return res.json();
  },

  async getArtistInfo(artist: string) {
    const params = {
      artist,
      method: "artist.getInfo",
      autocorrect: 1,
      lang: "en",
    };

    const data = await this.getInfo(params);

    return data;
  },

  _convertToQueryString(params: any) {
    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");
  },
};
