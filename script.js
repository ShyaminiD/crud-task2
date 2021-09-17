async function getUsers() {
    try {
        const data = await fetch("https://sports.api.decathlon.com/sports", {
            method: "GET"
        });
        const users = await data.json();
        console.log(users);
        console.log(users.data);
        console.log((users.data).length);
        createUsers(users);
    } catch (err) {
        console.log("Error", err);
    }

}
getUsers();

function createUsers(users) {

    for (var i = 0; i < (users.data).length; i++) {
        const container = document.createElement("div");
        container.setAttribute("class", "container");
        const sport = document.createElement("div");
        sport.innerHTML = `<div class = "sport-block">
        <p class = "sport-id"> <strong>Id</strong> : ${(users.data)[i].id} </p>
        <p class = "sport-type"> <strong>Type</strong> : ${(users.data)[i].type}</p>
        <p class = "sport-attributes"> <strong>Name</strong> : ${(users.data)[i].attributes.name}</p>
        <p class = "sport-attributes"><strong>Description</strong> : ${(users.data)[i].attributes.description}</p>
        <img src = ${(users.data)[i].attributes.icon}>
        <button class="delete-sport" value = "${(users.data)[i].id}" onclick = "deleteSport(value, ${i});"> Delete</button>
        
        </div>`;
        document.body.append(sport);

    }
}

async function deleteSport(value, i) {
    console.log("deleted sport" + i);
    console.log(value);

    const data = await fetch(`https://sports.api.decathlon.com/sports/${value}`, {
        method: "DELETE"
    });
    const removedSport = await data.json();
    console.log(removedSport);
    getUsers();
}