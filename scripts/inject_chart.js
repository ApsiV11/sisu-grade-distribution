var pollDOM = (func, selector) => {
    const el = document.querySelector(selector);

    if (el) {
        func()
    } else {
        setTimeout(() => pollDOM(func, selector), 300); // try again in 300 milliseconds
    }
}

var injectChart = () => {
    var contentRow = document.querySelector(".modal-body")
    var div = document.createElement("div")
    var canvas = document.createElement("canvas")
    canvas.id = "public-grade-distribution"
    canvas.style.backgroundColor = 'rgba(255,255,255,255)'
    div.appendChild(canvas)
    contentRow.appendChild(div)

    var data = JSON.parse(document.querySelector("#__interceptedData").innerHTML).publicGradeDistribution.gradeCounts
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
    );
}

// Add mutation observer to document to detect when the modal is added to dom
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (!mutation.addedNodes.length) return
        for(const node of mutation.addedNodes) {
            if (!node.tagName) continue // not an element
            if(node.classList.contains("modal-body")) {
                setTimeout(injectChart, 300)
                break
            }
        }
    })
})
observer.observe(document, { childList: true, subtree: true })