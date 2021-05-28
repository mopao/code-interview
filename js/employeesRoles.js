/*
 * PURPOSE : add  employee roles to page
 *  PARAMS : roles - list of roles
 *   NOTES :
 */
function addEmployeeRoles(roles) {
  //retrieve the selct element form the view
  let dropdown = document.getElementById('roles');
  //loop through the list of employee roles and add their name as option
  for (i = 0; i < roles.length ; i++) {

      let option = document.createElement("option");
      //set role id as value
      option.setAttribute("value", roles[i].roleid);
      let option_text = document.createTextNode(roles[i].rolename);
      option.appendChild(option_text);
      //add option to the menu
      dropdown.appendChild(option);
  }
}

/* this retrieve all the employee roles in system
   and display them  as a list in the index.html page
*/
function loadEmployeeRoles() {
  //url to get all employee roles from the api
  let url = "http://sandbox.bittsdevelopment.com/code1/fetchroles.php";
  // create the request object
  let xhttp = new XMLHttpRequest();
  //return the response if the request was a success
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let roles = JSON.parse(this.responseText); //convert to json object
      //console.log(employees);
      //add employee roles to the page
      addEmployeeRoles(roles);
    }
  };
  //specify the response type
//  xhttp.responseType = "json";
  //prepare the request;
  xhttp.open("GET",url,true);

  //send the request;
  xhttp.send();
}

window.onload = function () {
  loadEmployeeRoles();

}
