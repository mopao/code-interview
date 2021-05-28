
/*
 * PURPOSE : create view for a list of employees in the system
 *  PARAMS : employees - list of employes
 * RETURNS : ul element
 *   NOTES :
 */
function createEmployeesView(employees,roles) {
  let ul = document.createElement('ul');
  //set id attribute
  ul.setAttribute("id", "list-employees");
  //loop through the list of employees and add their fullname to the view
  for (var id in employees) {
    if (employees.hasOwnProperty(id)) {
      let list_item = document.createElement("li");
      let item_anchor = document.createElement("a");
      //set href attribute
      item_anchor.setAttribute("href", "employeeDetails.html?roles=" + roles + "&id=" + employees[id].employeeid);
      //item_anchor.href = "employeesDetails?id=" + employees[id].employeeid;
      //get employee's fullname
      let employeeFullName = employees[id].employeefname + ' '+ employees[id].employeelname;
      let item_text = document.createTextNode(employeeFullName);

      item_anchor.appendChild(item_text);
      list_item.appendChild(item_anchor);
      ul.appendChild(list_item);

    }
  }

  return ul;
}

/* this retrieve all the employees in system
   and display them  as a list in the page
*/
function loadEmployees(roles) {
  //url to get all employee from the api
  let url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php?roles=" + roles;
  // create the request object
  let xhttp = new XMLHttpRequest();
  //return the response if the request was a success
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let employees = JSON.parse(this.responseText); //convert to json object
      //console.log(employees);
      //create view for  the list of employees
      let employeesView = createEmployeesView(employees, roles);

      // add view to the page
      //add details view to the page
      document.getElementsByTagName('main')[0].appendChild(employeesView);

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
  //get role ids from the url
  roles =  getParam('roles');
  loadEmployees(roles);

}
