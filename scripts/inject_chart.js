var injectChart = async () => {
    // Check if chart already exists and remove it
    if(document.getElementById("grade-distribution-container")) {
        document.getElementById("grade-distribution-container").remove()
    }
    const lang = document.querySelector("html").lang
    var contentRow = document.querySelector(".modal-body")
    var div = document.createElement("div")
    div.id = "grade-distribution-container"
    var canvas = document.createElement("canvas")
    canvas.id = "public-grade-distribution"
    canvas.style.backgroundColor = 'rgba(255,255,255,255)'

    var title = document.createElement("h3")
    var titleText = lang === "fi" ? "Julkinen arvosanajakauma" : lang === "sv" ? "Publik betygsspridning" : "Public grade distribution"
    title.innerHTML = titleText

    div.appendChild(title)
    div.appendChild(canvas)

    contentRow.appendChild(div)

    await new Promise(r => setTimeout(r, 300)) // Wait for data to be loaded
    var data = JSON.parse(document.querySelector('#__interceptedData').innerHTML || '{}').publicGradeDistribution.gradeCounts
    console.log("Grade distribution data: " + JSON.stringify(data))

    new Chart(
        document.getElementById("public-grade-distribution").getContext('2d'),
        {
            type: "bar",
            data: {
                datasets: [{
                    backgroundColor: "blue",
                    data: data,
                }]
            },
            options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    }
                }
            }
        }
    )
}

// Add mutation observer to document to detect when the modal is added to dom
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (!mutation.addedNodes.length) return
        for(const node of mutation.addedNodes) {
            if(node.tagName === 'APP-ASSESSMENT-ITEM-ATTAINMENT-DETAILS') {
                injectChart()
                break
            }
        }
    })
})
observer.observe(document, { childList: true, subtree: true })