//Makes a request to execute the code
function requestExecutionOfCode(){
    const code = document.getElementById("myCode").value;
    const username = document.getElementById("username").value;

    console.log("Requested execution with username = " + username + " and code = " + code);
}