document.cookie = "username=me@tamhoangweb.com";
document.cookie = "password=super_safe_pass";

function ready() {
  let query = new URL(window.location).searchParams.get("query");
  document.getElementById("query-input").value = query;
  // document.getElementById("query-output").innerHTML = query;
  document.getElementById("query-output").innerText = query;
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
