let btn_delete = document.querySelectorAll(".delete-movie");

btn_delete.forEach(function(item, index){
  item.addEventListener("click", function(evt){
    evt.preventDefault();
    var movie_id = evt.target.dataset.movieid;
    deleteMovie(movie_id)
  });
});

// deleteMovie
function deleteMovie(movie_id){
  let message_box = document.querySelector("#msg-box");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      message_box.innerHTML = this.responseText;
    }
  };
  xhttp.open("DELETE", "http://localhost:3000/movies/"+movie_id, true);
  xhttp.send();
}
