let injected = false

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
    let inSisuPage = false
    for(let url of urls){
        if(tab.url.startsWith(url)) inSisuPage = true
    }
    if(!inSisuPage) injected = false
    if(!injected && changeInfo.status === 'complete' && (tab.url.indexOf("valid-attainments")!=-1 || tab.url.indexOf("failed-and-expired-attainments")!=-1)) {
        chrome.scripting.executeScript({
            target : {tabId : tabId},
            files : ["scripts/inject_chart.js", "scripts/chart.umd.js"],
        })
        injected = true
    }
}

chrome.tabs.onUpdated.addListener(listener)