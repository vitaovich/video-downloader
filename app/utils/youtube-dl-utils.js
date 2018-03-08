const { spawn } = require('child_process');
const binPath = require('electron').remote.getGlobal('binPath');
const youtubedlPath = require('electron').remote.getGlobal('youtubedlPath');

export const donwloadVideoByUrl = (url, downloadLocation, logger) => {
  downloadVideo(url, [], ['-o', downloadLocation], logger)
}

export const downloadMp3ByUrl = (url, downloadLocation, logger) => {
  const args = ['--extract-audio', '--audio-format', 'mp3', '--embed-thumbnail', '--ffmpeg-location', binPath]
  downloadVideo(url, args, ['-o', downloadLocation], logger)
}

const downloadVideo = (url, args, downloadLocation, logger) => {
  const youtubedl = spawn(youtubedlPath, [...args, ...downloadLocation, url])
  youtubedl.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    logger(`out: ${data}`)
  });

  youtubedl.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
    logger(`error: ${data}`)
  });

  youtubedl.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    logger(`Finished download with code ${code}`);
  });
}
