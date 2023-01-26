chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.status === 'complete' && tab.url.indexOf("valid-attainments")!=-1) {
        chrome.scripting.executeScript({
            target : {tabId : tabId},
            files : ["scripts/inject_chart.js", "scripts/chart.umd.js"],
        })
    }
})