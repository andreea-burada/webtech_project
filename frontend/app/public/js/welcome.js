console.log("HERE");

const getSessionUser = async () => {
    const username_ = document.getElementById("username");
    var username = null;
    await fetch('http://localhost:8080/api/user')
        .then(async (response) => {
            console.log(response);
            response = response.json();
            
            await response.then((result) => {
                console.log(result);
                username = result.username;
                console.log(username);
            }).catch((error) => { });
        })
        .then((data) => {
            //console.log(data);
        });
    console.log("Here: " + username);
    if (username === null) {
        username_.innerText = "Not Logged In";
    } else {
        username_.innerText = username;
    }
    
};

window.onload = getSessionUser;

function logout() {
    fetch('http://localhost:8080/logout', {method: "POST"})
        .then((response) => {
            console.log(response);
            if (response.status == 200 || response.status == 400) {
                document.getElementById("username").innerText = "Not Logged In";
            }
        }).then((data) => {
            //console.log(data);
        });
};