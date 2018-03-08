const { spawn } = require('child_process');
const binPath = require('electron').remote.getGlobal('binPath');
const youtubedlPath = require('electron').remote.getGlobal('youtubedlPath');
const downloads = `-o downloads/%(title)s.%(ext)s`

export const donwloadVideoByUrl = (url) => {
  downloadVideo(url, [])
}

export const downloadMp3ByUrl = (url) => {
  const args = ['--extract-audio', '--audio-format', 'mp3', '--embed-thumbnail', '--ffmpeg-location', binPath]
  downloadVideo(url, args)
}

const downloadVideo = (url, args) => {
  const youtubedl = spawn(youtubedlPath, [downloads, ...args, url])
  youtubedl.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  youtubedl.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  youtubedl.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
