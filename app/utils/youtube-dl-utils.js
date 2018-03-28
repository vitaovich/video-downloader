// @flow
import DownloadInfo from '../models/download-info';

const { spawn } = require('child_process');
const binPath = require('electron').remote.getGlobal('binPath');
const youtubedlPath = require('electron').remote.getGlobal('youtubedlPath');


export const downloadVideo = (download: DownloadInfo) => {
  const { downloadLocation, url, mp3 } = download;
  if (downloadLocation) {
    if (url) {
      if (mp3) {
        downloadMp3ByUrl(url, downloadLocation);
      } else {
        downloadVideoByUrl(url, downloadLocation);
      }
    }
  }
};

const downloadVideoByUrl = (url: string, downloadLocation: string) => {
  download(url, [], ['-o', downloadLocation]);
};

const downloadMp3ByUrl = (url: string, downloadLocation: string) => {
  const args = ['--extract-audio', '--audio-format', 'mp3', '--embed-thumbnail', '--ffmpeg-location', binPath];
  download(url, args, ['-o', downloadLocation]);
};

export const download = (url: string, args: string[], downloadLocation: string[]) => {
  const youtubedl = spawn(youtubedlPath, [...args, ...downloadLocation, url]);
  youtubedl.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  youtubedl.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  youtubedl.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
