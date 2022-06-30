// https://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
document.addEventListener("DOMContentLoaded", function (event) {
    var path = window.location.pathname;
    console.log(path);
    // if we are on the view user page
    if (path.startsWith("/users") && path.endsWith("/view")) {
        // https://www.w3schools.com/jsref/jsref_substring.asp
        let userId = path.substring(7, path.length - 5);
        console.log(userId);
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch('/users/' + userId + "/view?format=json")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.address.houseNumber == null) {
                    data.address.houseNumber = "";
                }
                // https://gomakethings.com/two-ways-to-get-and-set-html-content-with-vanilla-javascript/
                document.getElementById("user-name").textContent = `${data.name.first} ${data.name.last}`;
                document.getElementById("user-address").textContent = `${data.address.streetName} ${String(data.address.houseNumber)} ${data.address.zipCode}`;
                document.getElementById("user-email").textContent = data.email;
                document.getElementById("user-role").textContent = data.role;
            });
    }
});
