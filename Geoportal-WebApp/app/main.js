import './_src/styles/style.css';
import './_src/styles/textstyle.css'

function MapNavigationVChange() {
  var x = document.getElementById("MapNavigation");
  // console.log(x)
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }

  x = document.getElementById("LayerControlBox");
  x.style.display = "none";
}
document.getElementById("menuButton").addEventListener("click", MapNavigationVChange);