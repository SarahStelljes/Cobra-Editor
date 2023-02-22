import { useEffect } from "react"

export default function TabNav({setShowFileAction, fileId, setFileId, fileOpened, setFileOpened, openFileTabs }) {
    useEffect(() => {
        if(fileOpened) {
            for(let i = 0; i < openFileTabs.length; i++) {
                const liElem = document.createElement('li');
                liElem.className = "nav-item";
                liElem.id = openFileTabs[i].id;
                const btn = document.createElement('button');
                btn.className = "btn btn-secondary";
                btn.id = openFileTabs[i].id;

                const tabNav = document.getElementById("tab-nav");
                if(tabNav.hasChildNodes()) {
                    tabNav.childNodes.forEach(tab => {
                        console.log(tab);
                    }
                )}
            }
            setShowFileAction(false);
            setFileOpened(false);
        }
    })

    return (
        <ul className="justify-content-even align-items-center" id="tab-nav">
            <li className="nav-item" id="test.json">TEst</li>
        </ul>
    )
}