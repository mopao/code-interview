

/* this funtion display an employee's details on the employeeDetails page using an
  employee id
*/

/*
 * PURPOSE : create view for the crown image
 * RETURNS :  a div element
 *   NOTES :
 */
function createCrownView() {
  let div = document.createElement('div');
  //set id attribute
  div.setAttribute("id", "employee-crown-div");
  let crown_img = document.createElement('img');
  crown_img.setAttribute("src", "img/crown.png");
  crown_img.setAttribute("alt", "crown image");
  div.appendChild(crown_img);
  return div;
}

/*
 * PURPOSE : create view for employee picture
 *  PARAMS : id - employee id
 * RETURNS :  div element
 *   NOTES :
 */
function createEmployeePicView(id) {
  let div = document.createElement('div');
  //set id attribute
  div.setAttribute("id", "employee-pic-div");
  let pic = document.createElement('img');
  //get employee's picture using his id
  pic.setAttribute("src", "http://sandbox.bittsdevelopment.com/code1/employeepics/" + id + ".jpg");
  pic.setAttribute("alt", "picture");
  div.appendChild(pic);
  return div;
}

/*
 * PURPOSE : create view for employee bio
 *  PARAMS : bio - text representing a bio
 * RETURNS : paragraph element
 *   NOTES :
 */
function createEmployeeBioView(bio) {
  let p = document.createElement('p');
  //set id attribute
  p.setAttribute("id", "employee-bio");
  let bio_text = document.createTextNode(bio);
  p.appendChild(bio_text);
  return p;
}

/*
 * PURPOSE : create view for employee fullname
 *  PARAMS : employeeFullName -  employee fullname
 * RETURNS : h1 element
 *   NOTES :
 */
function createEmployeeNameView(employeeFullName) {
  let h1 = document.createElement('h1');
  //set id attribute
  h1.setAttribute("id", "employee-name");
  let name_text = document.createTextNode(employeeFullName);
  h1.appendChild(name_text);

  return h1;
}

/*
 * PURPOSE : create view for employee roles
 *  PARAMS : roles - array of employee roles
 * RETURNS : div element
 *   NOTES :
 */
function createEmployeeRolesView(roles) {
  let div = document.createElement('div');
  //set id attribute
  div.setAttribute("id", "employee-roles-div");
  //loop through employee's roles
  for (i = 0; i < roles.length ; i++) {
    //add role to roles div
    let role_elt = document.createElement('span');
    //get employee's role
    let role = roles[i].rolename;
    let role_text = document.createTextNode(role);
    role_elt.appendChild(role_text);
    //add style
    role_elt.style.backgroundColor = roles[i].rolecolor;

    //add role to roles view
    div.appendChild(role_elt);
  }
  return div ;
}

/*
 * PURPOSE : load employee details
 *  PARAMS : id - employee id
 * RETURNS : section element
 *   NOTES :
 */
function loadEmployee(id) {
  //create the employee's details view
  let details_view = document.createElement('section');
  //set id attribute
  details_view.setAttribute("id", "employee-details");
  //url to get all employee with  particular roles from the api
  let url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php?roles=" + roles;
  // create the request object
  let xhttp = new XMLHttpRequest();
  //return the response if the request was a success
  xhttp.onreadystatechange = function() {

    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      let employees = JSON.parse(this.responseText); //convert to json object
      //find the employee with the specified id
        if (employees.hasOwnProperty(id)) {
          let employee = employees[id];
          //console.log(employee);
          //create crown view and add it to the details view if the employee is featured
          if (employee.employeeisfeatured !== "0") {
            let crown_div = createCrownView();
            // add crown view to the employee's details view
            details_view.appendChild(crown_div);
          }

          // create  employee's picture view
          let pic_div = createEmployeePicView(id);
          // add picture view to details view
          details_view.appendChild(pic_div);

          //create div for employee information
          let info_div = document.createElement('div');
          //set id attribute
          info_div.setAttribute("id", "employee-info-div");

          //create employee's fullname view
          let employeeFullName = employee.employeefname + ' '+ employee.employeelname;
          //get employee's fullname
          let name_elt = createEmployeeNameView(employeeFullName);
          // add name view to info view
          info_div.appendChild(name_elt);

          //create employee's bio view
          let bio_elt = createEmployeeBioView(employee.employeebio);
          // add bio view to info view
          info_div.appendChild(bio_elt);

          //create employee's roles view
          let roles_elt = createEmployeeRolesView(employee.roles);
          // add roles view to info view
          info_div.appendChild(roles_elt);

          //add info view to details view
          details_view.appendChild(info_div);

          //add style to the details view
          details_view.className = "employee-details";
        }
        else{
          // display error message if user not found
          let error_text = document.createTextNode("Employee not found!");
          details_view.appendChild(error_text);
        }
        //add details view to the page
        document.getElementsByTagName('main')[0].appendChild(details_view);
    }
  };
  
  //prepare the request;
  xhttp.open("GET",url,true);

  //send the request;
  xhttp.send();

}

window.onload = function () {
  //retrieve the employee's id from the url
  let employeeid = getParam('id');
  //get role ids from the url
  roles =  getParam('roles');

  //set the href attribute of the return link
  let returnLink = document.getElementById('return-link');
  returnLink.setAttribute("href", "employeesList.html?roles=" + roles);

  //display the employee's details
  loadEmployee(employeeid, roles);
  //console.log(employeeid);

}
