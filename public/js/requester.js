const waitTime = 100;
let canBeExecutedAgain;

function getStatusOfCode() {
    const username = document.getElementById("username").value;
    const params = {"username": username};

    httpPostAsync("/status", params, function(response) {
        console.log(response);
        printStatus(response.status);

        if(response.status !== 'ok') {
            if(canBeExecutedAgain) {
                setTimeout(function () {
                    getStatusOfCode();
                }, waitTime);
            }
        }
        else
            printOutput(response.output);
    })
}

//Makes a request to execute the code
function requestExecutionOfCode(code) {
    canBeExecutedAgain = false;
    const username = document.getElementById("username").value;
    const params = {"username": username, "code": code};
    console.log("Requested execution of code with username = " + username + " and code = " + code);

    httpPostAsync("/code", params, function(response) {
        setTimeout(function () {
            canBeExecutedAgain = true;
            getStatusOfCode()
        }, waitTime*1.1);
    })
}

function requestExecutionOfCodeWithTextArea() {
    const code = document.getElementById("myCode").value;
    requestExecutionOfCode(code);
}

function httpPostAsync(theUrl, params, callback) {
    const http = new XMLHttpRequest();
    http.open("POST", theUrl, true); // true for asynchronous

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', "application/json;charset=UTF-8");
    http.send(JSON.stringify(params));

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200)
            callback(JSON.parse(http.responseText));
    };
}

function httpGetAsync(theUrl, callback) {
    const http = new XMLHttpRequest();
    http.open("GET", theUrl, true); // true for asynchronous

    http.send(null);

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200)
            callback(JSON.parse(http.responseText));
    };
}
