// VUE
const app = new Vue({
    el: '#app',
    data:{
        members:[],
        membersBackup:[],
        states: []
    }
})

var optionsFetch = {
    headers: {
        "X-API-KEY": "Ck6JgdVdpJear9QcLt585wPQR3SnatP0KUMXpPtS"
    }
};

var url;

if (document.title == "Congress House") {
    url = 'https://api.propublica.org/congress/v1/113/house/members.json'
} else if (document.title == "Congress Senate") {
    url = 'https://api.propublica.org/congress/v1/113/senate/members.json'
}

$(function () {
    fetch(url, optionsFetch)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            app.members = data.results[0].members;
            app.membersBackup = data.results[0].members;
            optionState();
            filter();
        })
});


/*
function crearTabla() {
    var table = "";
    for (i = 0; i < members.length; i++) {
        table += "<tr><td><a href=" + members[i].url + ">" + members[i].first_name + " " + (members[i].middle_name || "") + " " + members[i].last_name + "</a></td>"
        table += "<td>" + members[i].party + "</td>"
        table += "<td>" + members[i].state + "</td>"
        table += "<td>" + members[i].seniority + "</td> "
        table += "<td>" + members[i].votes_with_party_pct + "%" + "</td></tr>"
    }
    document.getElementById("membersData").innerHTML = table;
}*/

function optionState() {
    var options = "";
    var states = [];
    for (var i = 0; i < app.members.length; i++) {
        if (states.indexOf(app.members[i].state) == -1)
            states.push(app.members[i].state);
    }

    states.sort();
    app.states = states;
    /*
    for (var i = 0; i < states.length; i++) {
        options += '<option value="' + states[i] + '">' + states[i] + "</option>";
    }

    document.getElementById("states").innerHTML += options;*/
}

function filter() {
    //obtengo los cheboxes marcados
    var partys = Array.from(document.querySelectorAll('input[name=party]:checked')).map(mapearInput);
    var state = document.querySelector('#states').value;
    var options = [partys, state];

    //filtro los miembros que su party sea igual a los checkboxes marcados
    app.members = app.membersBackup.filter(filterMember, options);

/*
    //dibujo de nuevo la tabla
    var table = "";
    for (var i = 0; i < membersFiltered.length; i++) {
        table += "<tr><td><a href=" + membersFiltered[i].url + ">" + membersFiltered[i].first_name + " " + (membersFiltered[i].middle_name || "") + " " + membersFiltered[i].last_name + "</a></td>"
        table += "<td>" + membersFiltered[i].party + "</td>"
        table += "<td>" + membersFiltered[i].state + "</td>"
        table += "<td>" + membersFiltered[i].seniority + "</td> "
        table += "<td>" + membersFiltered[i].votes_with_party_pct + "%" + "</td></tr>"
    }

    document.getElementById("membersData").innerHTML = table;*/
}

function mapearInput(input) {
    return input.value;
}

function filterMember(member) {
    return this[0].indexOf(member.party) >= 0 && (this[1] == member.state || this[1] == "All");
}

function filterParties() {
    var byDemocrats = app.members.filter(filterParty)
    document.getElementById("republicans").innerHTML = table;

}

function filterParty(party) {
    return app.member.party == 'R';
}
