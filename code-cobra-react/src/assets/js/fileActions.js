import { ask } from "@tauri-apps/api/dialog";

export const fileAction = (btn, start, setShowFileAction, setFileId) => {
    let t;
    let repeatable = true;
    let repeat = () => {
        console.log(start);
        if(start < 1) {
            repeatable = false;
            setShowFileAction(true);
            clearTimeout(t);
            start = 700;
            repeatable = true;
            setFileId(btn.id);
        } else {
            t = setTimeout(repeat, start);
            start = start / 2;
        }
    }

    btn.onmousedown = () => {
        if(repeatable === true) {
            repeat();
        }
    }

    btn.onmouseup = () => {
        clearTimeout(t);
        start = 700;
    }
}

export const closeFile = (setShowFileAction, setFileId, fileId) => {
    ask("Are you sure you want to close this file?").then(result => {
        console.log(result);
        if(result === true) {
            const tabBar = document.getElementById('tab-bar');
            const el = document.getElementById(fileId);
            tabBar.removeChild(el);
            setFileId('');
            setShowFileAction(false);
        } else {
            console.log(result);
            return;
        }
    });
}