export const lastFM = {
  _apiLink: "http://ws.audioscrobbler.com/2.0/",
  _apiKey: "d15ae01ae3b43dd6f2f28360c896b596",
  _apiFormat: "json",

  async getInfo(params: { artist: string; method: string; limit: number }) {
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
      method: "artist.search",
      limit: 10,
    };

    const data = await this.getInfo(params);
    console.log(data);
    const trasformedData = this.transformArtistInfo(data);
    return trasformedData;
  },

  transformArtistInfo(artistData: {
    results: {
      artistmatches: {
        artist: {
          name: string;
          image: {
            size: string;
            "#text": string;
          }[];
        }[];
      };
    };
  }) {
    if (Object.keys(artistData).length === 0) return;
    console.log(artistData);
    return artistData.results.artistmatches.artist;
  },

  _convertToQueryString(params: {
    [x: string]: string | number | boolean;
    api_key: string;
    format: string;
    artist: string;
    method: string;
    limit: number;
  }) {
    return Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");
  },
};
