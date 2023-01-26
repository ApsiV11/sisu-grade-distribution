var pollDOM = (func, selector) => {
    const el = document.querySelector(selector);

    if (el) {
        func()
    } else {
        setTimeout(() => pollDOM(func, selector), 300); // try again in 300 milliseconds
    }
}

var sidebarOpen = () => {
    var header = document.querySelector(".header-text")

    var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                observer.disconnect()
                pollDOM(sidebarOpen, ".content-row")
            });
        });
    observer.observe(header, {characterData: true, subtree: true});

    var contentRow = document.querySelector(".content-row")

    if(document.querySelector("#public-grade-distribution")) {
        document.querySelector("#public-grade-distribution").parentElement.remove()
    }
    var div = document.createElement("div")
    var canvas = document.createElement("canvas")
    canvas.id = "public-grade-distribution"
    canvas.style.backgroundColor = 'rgba(255,255,255,255)'
    div.appendChild(canvas)
    contentRow.appendChild(div)

    pollDOM(() => {}, "#__interceptedData")
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
var inject = () => {
    var container = document.querySelector(".collapsible-columns-container").children[1]

    //If sidebar is already open when entering page, mutation doesn't happen
    if(!container.classList.contains('closed')) {
        pollDOM(sidebarOpen, ".content-row")
    }

    var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.attributeName == "class"){
                    var open = !mutation.target.classList.contains('closed');
                    if(open) {
                        pollDOM(sidebarOpen, ".content-row")
                    }
                }
            });
        });
    observer.observe(container, {attributes: true});
}

pollDOM(inject, ".collapsible-columns-container")