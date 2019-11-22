const app = new Vue({
    el: '#app',
    data: {
        members: [],
        statistics: {
            "numberOfDemocrats": 0,
            "numberOfRepublicans": 0,
            "numberOfIndependents": 0,
            "promedioDeDemo": 0,
            "promedioDeRepu": 0,
            "promedioDeIndep": 0,
        },
        lastEngaged: [],
        mostEngaged: [],
        leastLoyal: [],
        mostLoyal: [],


    }
})

var options = {
    headers: {
        "X-API-KEY": "Ck6JgdVdpJear9QcLt585wPQR3SnatP0KUMXpPtS"
    }
};

var url;

if (document.title == "House Attendance" || document.title == "House loyalty") {
    url = 'https://api.propublica.org/congress/v1/113/house/members.json'
} else if (document.title == "Senate Attendance" || document.title == "Senate loyalty") {
    url = 'https://api.propublica.org/congress/v1/113/senate/members.json'
}

var members
$(function () {
    fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            app.members = data.results[0].members;
            cantidadYPromedios();
            mejores10Missed();
            peores10Missed();
            mejores10VoteParty();
            peores10VoteParty();
        });
});


/*
//Datos de estadisticas
app.statistics = {
    "numberOfDemocrats": 0,
    "numberOfRepublicans": 0,
    "numberOfIndependents": 0,
    "promedioDeDemo": 0,
    "promedioDeRepu": 0,
    "promedioDeIndep": 0,
}
*/

//-------------------------------------------------------------------------------------------------------------------------------
function cantidadYPromedios() {
    //cantindad de DEMOCRATAS
    var partyFilterD = app.members.filter(function (member) {
        return member.party === "D"
    })

    app.statistics.numberOfDemocrats = partyFilterD.length;
    console.log(app.statistics.numberOfDemocrats)

    //cantidad de REPUBLICANOS
    var partyFilterR = app.members.filter(function (member) {
        return member.party === "R"
    })

    app.statistics.numberOfRepublicans = partyFilterR.length;
    console.log(app.statistics.numberOfRepublicans)

    //cantidad de INDEPENDIENTES

    var partyFilterI = app.members.filter(function (member) {
        return member.party === "I"
    })

    app.statistics.numberOfIndependents = partyFilterI.length;
    console.log(app.statistics.numberOfIndependents)

    //Suma de DEMOCRATAS
    var sumaPromeDemo = 0;
    for (var i = 0; i < partyFilterD.length; i++) {
        sumaPromeDemo = sumaPromeDemo + partyFilterD[i].votes_with_party_pct
    }
    console.log(sumaPromeDemo)

    //Suma de REPUBLICANOS
    var sumaPromeRepu = 0;
    for (var i = 0; i < partyFilterR.length; i++) {
        sumaPromeRepu = sumaPromeRepu + partyFilterR[i].votes_with_party_pct
    }
    console.log(sumaPromeRepu)

    //Suma de INDEPENDIENTES
    var sumaPromeInde = 0;
    for (var i = 0; i < partyFilterI.length; i++) {
        sumaPromeInde = sumaPromeInde + partyFilterD[i].votes_with_party_pct
    }
    console.log(sumaPromeInde)

    //Promedio de DEMOCRATAS

    var promedioDemo = sumaPromeDemo / partyFilterD.length
    app.statistics.promedioDeDemo = promedioDemo

    //Promedio de REPUBLICANOS
    var promedioRepu = sumaPromeRepu / partyFilterR.length
    app.statistics.promedioDeRepu = promedioRepu

    //Promedio de INDEPENDIENTES
    var promedioInde = 0
    if (partyFilterI.length != 0)
        promedioInde = sumaPromeInde / partyFilterI.length
    app.statistics.promedioDeIndep = promedioInde

    //-------------------------------------------------------------------------------------------------------------------------------
    //TABLA DE PARTIDOS,CANTIDAD DE INTEGRANTES POR PARTIDO Y PROMEDIOS

    /* var table = "";
    table += "<tr><td>Democratas</td><td>" + statistics.numberOfDemocrats + "</td><td>" + statistics.promedioDeDemo + "%" + "</td><tr>"
    table += "<tr><td>Republicanos</td><td>" + statistics.numberOfRepublicans + "</td><td>" + ssstatistics.promedioDeRepu + "%" + "</td><tr>"
    table += "<tr><td>Independientes</td><td>" + statistics.numberOfIndependents + "</td><td>" + statistics.promedioDeIndep + "%" + "</td><tr>"
    table += "<tr><td>Total</td><td>" + (statistics.numberOfDemocrats + statistics.numberOfRepublicans + statistics.numberOfIndependents) + "</td><td>" + (promedioDemo + promedioRepu + promedioInde).toFixed(2) + "%" + "</td><tr>"

    document.getElementById("senate-data").innerHTML = table;
*/

    //-----------------------------------------------------------------------------------------------------------------------------

}

//-------------------------------------------------------------------------------------------------------------------------------


//Lista de los peores 10% Engaged senate and house

function peores10Missed() {
    app.members.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    })
    //math.round redonde el numero para arrriba 
    var el10Porciento = Math.round(app.members.length * 10 / 100);
    console.log(el10Porciento)

    for (i = 0; i < el10Porciento; i++) {
        app.lastEngaged.push(app.members[i]);
    }


    /* //Tabla de la izquierda     
     var table = "";
     for (i = 0; i < el10Porciento; i++) {
         table += "<tr><td><a href=" + members[i].url + ">" + members[i].first_name + " " + (members[i].middle_name || "") + " " + members[i].last_name + "</a></td>"
         table += "<td>" + members[i].missed_votes + "</td>"
         table += "<td>" + members[i].missed_votes_pct + "</td></tr>"

     }
     if (document.getElementById("leastEngaged") != null)
         document.getElementById("leastEngaged").innerHTML = table;*/
}

//Lista del mejor 10% Engaged

function mejores10Missed() {
    //invierto con reverse.
    app.members.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct;
    }).reverse()

    var el10Porciento = Math.round(app.members.length * 10 / 100);
    console.log(el10Porciento)

    for (i = 0; i < el10Porciento; i++) {
        app.mostEngaged.push(app.members[i]);
    }

    //Tabla de la derecha los mas compremetidos

    /* var table = "";
     for (i = 0; i < el10Porciento; i++) {
         table += "<tr><td><a href=" + members[i].url + ">" + members[i].first_name + " " + (members[i].middle_name || "") + " " + members[i].last_name + "</a></td>"
         table += "<td>" + members[i].missed_votes + "</td>"
         table += "<td>" + members[i].missed_votes_pct + "</td></tr>"

     }
     if (document.getElementById("mostEngaged") != null)
         document.getElementById("mostEngaged").innerHTML = table;*/
}
//-----------------------------------------------------------------------------------------------------------------------------

//Lista de los mas leales 10% party loyalty house and senate.

function peores10VoteParty() {
    app.members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    })
    //math.round redonde el numero para arrriba 
    var el10Porciento = Math.round(app.members.length * 10 / 100);
    console.log(el10Porciento)

    for (i = 0; i < el10Porciento; i++) {
        app.leastLoyal.push(app.members[i]);
    }



    //Tabla de la izquierda 
    /* var table = "";
     for (i = 0; i < el10Porciento; i++) {
         table += "<tr><td><a href=" + members[i].url + ">" + members[i].first_name + " " + (members[i].middle_name || "") + " " + members[i].last_name + "</a></td>"
         table += "<td>" + members[i].total_votes + "</td>"
         table += "<td>" + members[i].votes_with_party_pct + "</td></tr>"

     }
     if (document.getElementById("leastLoyal") != null)
         document.getElementById("leastLoyal").innerHTML = table;*/
}

//Lista del mejor 10% Engaged

function mejores10VoteParty() {
    //invierto con reverse.
    app.members.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
    }).reverse()

    var el10Porciento = Math.round(app.members.length * 10 / 100);
    console.log(el10Porciento)

    for (i = 0; i < el10Porciento; i++) {
        app.mostLoyal.push(app.members[i]);
    }



    //Tabla de la derecha los mas compremetidos

    /* var table = "";
     for (i = 0; i < el10Porciento; i++) {
         table += "<tr><td><a href=" + members[i].url + ">" + members[i].first_name + " " + (members[i].middle_name || "") + " " + members[i].last_name + "</a></td>"
         table += "<td>" + members[i].total_votes + "</td>"
         table += "<td>" + members[i].votes_with_party_pct + "</td></tr>"

     }
     if (document.getElementById("mostLoyal") != null)
         document.getElementById("mostLoyal").innerHTML = table;*/
}
