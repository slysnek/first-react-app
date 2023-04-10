import fetch from "cross-fetch";

interface getArtistParams {
  artist: string;
  method: string;
  limit: 10;
}

interface getArtistParamsInfo {
  artist: string;
  method: string;
}

type queryParams = {
  artist: string;
  method: string;
  limit?: number;
  api_key: string;
  format: string;
};

type queryKeys = keyof queryParams;

export const lastFM = {
  _apiLink: "http://ws.audioscrobbler.com/2.0/",
  _apiKey: "d15ae01ae3b43dd6f2f28360c896b596",
  _apiFormat: "json",

  async getInfo(params: getArtistParams | getArtistParamsInfo) {
    const qs = this._convertToQueryString({
      ...params,
      api_key: this._apiKey,
      format: this._apiFormat,
    });

    console.log(qs);

    const res = await fetch(`${this._apiLink}?${qs}`);

    if (!res.ok) {
      throw new Error(`Couldn't fetch data, status ${res.status}`);
    }

    return res.json();
  },

  async getArtist(artist: string) {
    const params: getArtistParams = {
      artist,
      method: "artist.search",
      limit: 10,
    };

    const data = await this.getInfo(params);
    console.log(data);
    const trasformedData = this.transformArtistInfo(data);
    return trasformedData;
  },

  async getArtistInfo(artist: string) {
    const params: getArtistParamsInfo = {
      artist,
      method: "artist.getInfo",
    };

    const data = await this.getInfo(params);
    console.log(data);
    /* const trasformedData = this.transformArtistInfo(data);
    return trasformedData; */
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
    return artistData.results.artistmatches.artist;
  },

  _convertToQueryString(params: queryParams) {
    return Object.keys(params)
      .map((key) => {
        if (!(typeof params[key as queryKeys] === "undefined")) {
          return `${encodeURIComponent(key)}=${params[key as queryKeys]}`;
        } else {
          return "";
        }
      })
      .join("&");
  },
};
