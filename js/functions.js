/* this function return the value of a parameter from the URL */
function getParam(param) {
   return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" +
   escape(param).replace(/[\.\+\*]/g, "\\$&")
   + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
