function printOutput(text) {
    const output = document.getElementById('output_text');
    output.value = text;
}

function printStatus(currentStatus) {
    const statusText = document.getElementById('currentStatus');

    if(currentStatus === 'ok')
        statusText.innerHTML = "<span style='color: lawngreen;'>Ok</span>";
    else if(currentStatus === 'running')
        statusText.innerHTML = "<span style='color: blue;'>Running</span>";
    else if(currentStatus === 'failure')
        statusText.innerHTML = "<span style='color: red;'>Failure</span>";
    else {
        console.log("Error on output_handler.js: There is no state named: " + currentStatus);
        statusText.innerHTML = "<span style='color: red;'>Error on the code</span>";
    }
}