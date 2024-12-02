function supports_history_api() {
  return !!(window.history && history.pushState);
}

function swapText(href) {
  var req = new XMLHttpRequest();
  req.open("GET",
           "http://hola.org/examples/html5/booklet/" +
             href.split("/").pop(),
           false);
  req.send(null);
  if (req.status == 200) {
    document.getElementById("libro").innerHTML = req.responseText;
    setupHistoryClicks();
    return true;
  }
  return false;
}

function addClicker(link) {
  link.addEventListener("click", function(e) {
    if (swapText(link.href)) {
      history.pushState(null, null, link.href);
      e.preventDefault();
    }
  }, true);
}

function setupHistoryClicks() {
  addClicker(document.getElementById("textfw"));
  addClicker(document.getElementById("textbw"));
}

window.onload = function() {
  if (!supports_history_api()) { return; }
  setupHistoryClicks();
  window.setTimeout(function() {
    window.addEventListener("popstate", function(e) {
      swapText(location.pathname);
    }, false);
  }, 1);
}
