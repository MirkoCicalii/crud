

var nexId = 10006;



//Elimina
$(document).ready(function () {

  // url iniziale
  callServer("http://localhost:8080/employees");





  $("body").on("click", ".btn-delete", function () {
    var td = $(this).parent("td");
    var id = td.data("id");
    for (var i = 0; i < dati.length; i++) {
      if (dati[i].id == id) {
        dati.splice(i, 1);
        break;
      }
    }
    displayTable();
  })
  displayTable();

  //Aggiungi
  $("body").on("click", ".btn-add", function () {
    var firstName = $('#firstName').val();
    console.log(firstName);
    var lastname = $('#lastname').val();
    console.log(lastname);
    var nuovo = {
      "id": nexId,
      "firstName": firstName,
      "lastName": lastname,
      "gender": "M",
    }
    dati.push(nuovo);
    displayTable();
    nexId++;

    //chiusura dopo aggiungi
    var modal = $('#exampleModal');
    modal.modal("hide");


  });



  //modifica
  $("body").on("click", ".btn-mod", function () {
    var modal = $('#modal-modific');
    modal.modal("show");
    var td = $(this).parent("td");
    console.log(td);
    var id = td.data("id");

    for (var i = 0; i < dati.length; i++) {
      if (dati[i].id == id) {
        $('#nome').val(dati[i].firstName);
        $('#cognome').val(dati[i].lastName);
        break;
      }
    }

  });


  //displayTable();



  /*
var modifica = {
  "id": id,
  "firstName": firstName,
  "lastName": lastname,
  "gender": gender,
}
console.log(modifica);
*/

$('#Next').click(function(){
  var Next=response['_links']['Next']['href']
  console.log(Next);
  callServer(Next);
});

$('#Last').click(function(){
  var Next=response['_links']['Last']['href']
  console.log(Last);
  callServer(Last);
});

$('#First').click(function(){
  var Next=response['_links']['First']['href']
  console.log(First);
  callServer(First);
});

$('#Prev').click(function(){
  var Next=response['_links']['Prev']['href']
  console.log(Prev);
  callServer(Prev);
});






});


function callServer(url) {
  $.get(url, function(response){
    console.log(response);
    displayTable(response["_embedded"]["employees"]);
    //displayPagination(response["page"], response["_links"]);
});



}

function displayTable(dati) {
  var r = '';
  $.each(dati, function (id, value) {
    r += '<tr>';
    r += '<td>' + value.id + '</td>';
    r += '<td>' + value.firstName + '</td>';
    r += '<td>' + value.lastName + '</td>';
    r += '<td data-id=' + value.id + '> <button type="button" class="btn btn-danger btn-delete">Elimina</button>' + '</td>';
    r += '<td data-id=' + value.id + '> <button type="button" class="btn btn-success btn-mod data-bs-toggle="modal" data-bs-target="#modal-modific ">Modifica</button>' + '</td>';
    r += '<tr>' + '</tr>';
  });
  $("tbody").html(r);
}





