// @flow
export default class DownloadInfo {
  downloadLocation: string
  url: string
  mp3: boolean

  constructor(downloadLocation: string, url: string, mp3: boolean = false) {
    this.downloadLocation = downloadLocation;
    this.url = url;
    this.mp3 = mp3;
  }
}
