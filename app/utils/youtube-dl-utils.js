const { spawn } = require('child_process');
const binPath = require('electron').remote.getGlobal('binPath');
const youtubedlPath = require('electron').remote.getGlobal('youtubedlPath');


export const downloadVideo = (url, mp3, downloadLocation) => {
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

export const downloadVideoByUrl = (url, downloadLocation) => {
  download(url, [], ['-o', downloadLocation]);
};

const downloadMp3ByUrl = (url, downloadLocation) => {
  const args = ['--extract-audio', '--audio-format', 'mp3', '--embed-thumbnail', '--ffmpeg-location', binPath];
  download(url, args, ['-o', downloadLocation]);
};

const download = (url, args, downloadLocation) => {
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
