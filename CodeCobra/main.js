import { open } from '@tauri-apps/api/dialog';
import { appDataDir } from '@tauri-apps/api/path';
import { readTextFile, writeTextFile, readDir, renameFile, removeDir } from '@tauri-apps/api/fs';

document.getElementById('open-folder').addEventListener('click', async () => {
  try {
    const selectedPath = await open({
      multiple: false,
      title: 'Open Folder',
      directory: true,
    });
    
    if(!selectedPath) return;

    const contents = await readDir(selectedPath);

    if(contents.length) {
      console.log(contents);
    }
  } catch (err) {
    console.error(err);
  }
});

document.getElementById('open-file').addEventListener('click', async () => {
  try {
    const selectedPath = await open({
      multiple: false,
      title: "Open File"
    });

    if(!selectedPath) return;

    const contents = await readTextFile(selectedPath);

    if(contents.length) {
      console.log(contents);
    }
  } catch (err) {
    console.error(err);
  }
});