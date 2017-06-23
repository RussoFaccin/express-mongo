// Capture message bo
let message_box = document.getElementById("message-box");
// Capture delete button
let btn_delete = document.querySelectorAll(".delete-movie");

// Capture the form
let form_object = document.querySelector("form");

// Capture form fields
let fld_title = document.querySelector('input[name="fld_title"]');

// Submit form
form_object.addEventListener("submit", function submitForm(evt){
  evt.preventDefault();
  var data = {
    fld_title: evt.target.elements.fld_title.value,
    fld_poster: evt.target.elements.fld_poster.value,
    fld_trailer: evt.target.elements.fld_trailer.value,
  };
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      message_box.innerHTML = JSON.parse(this.responseText).message;
    }
  };
  xhttp.open(evt.target.method, evt.target.action, true);
  xhttp.setRequestHeader("Authorization", "eyJ1c2VyIjogIlJ1c3NvRmFjY2luIn0=.78989eeca4102ccc2b21b4ab1d8d56dcc211eb108da941a5c962468230d1be9f");
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(data));
})


btn_delete.forEach(function(item, index){
  item.addEventListener("click", function(evt){
    evt.preventDefault();
    var movie_id = evt.target.dataset.movieid;
    deleteMovie(movie_id)
  });
});

// deleteMovie
function deleteMovie(movie_id){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      message_box.innerHTML = JSON.parse(this.responseText).message;
    }
  };
  xhttp.open("DELETE", "http://localhost:3000/movies/"+movie_id, true);

  xhttp.send();
}
