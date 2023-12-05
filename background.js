const urls = [
    "https://sisu.aalto.fi",
    "https://sisu.helsinki.fi",
    "https://sisu.hanken.fi",
    "https://sisu.jyu.fi",
    "https://sisu.lut.fi",
    "https://sis-tuni.funidata.fi",
    "https://sisu.tuni.fi",
    "https://sisu.arcada.fi"
]

function listener(tabId, changeInfo, tab){
    if(changeInfo.status === 'complete' && (tab.url.indexOf("valid-attainments")!=-1 || tab.url.indexOf("failed-and-expired-attainments")!=-1)) {
        chrome.scripting.executeScript({
            target : {tabId : tabId},
            files : ["scripts/inject_chart.js", "scripts/chart.umd.js"],
        })
    }
}

chrome.tabs.onUpdated.addListener(listener)