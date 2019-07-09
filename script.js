const app = document.getElementById('tbody');


//request to access JSON file from API
var request = new XMLHttpRequest();
request.open('GET', 'https://api.spacexdata.com/v3/launches/past', true);

//accessing JSON file
request.onload = function () {
  //JSON -> JS array of objects
  var data = JSON.parse(this.response);

  //get latest instances
  var count = data.length - 1;

  //set index to latest instance
  var index = count;

  //if there is data
  if (request.status > 0) {
    //while max (3) is not reached
    while(index > count - 3){
        //variable that stores the current instance
        var obj = data[index];

        //(html) row for each instance
        const row = document.createElement('tr');
        app.appendChild(row);

        //(html) selected details for each instance
        const name = document.createElement('td');
        name.textContent = obj.mission_name;

        const year = document.createElement('td');
        year.textContent = obj.launch_year;

        const date = document.createElement('td');
        date.textContent = obj.launch_date_local.substring(0,10);

        const rocket_name_type = document.createElement('td');
        rocket_name_type.textContent = obj.rocket.rocket_name + " " + obj.rocket.rocket_type; 

        const launch_site = document.createElement('td');
        launch_site.textContent = obj.launch_site.site_name_long;

        row.appendChild(name);
        row.appendChild(year);
        row.appendChild(date);
        row.appendChild(rocket_name_type);
        row.appendChild(launch_site);

        index--;
    }
  } else {
    //catch
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Not working`;
    app.appendChild(errorMessage);
  }
}

request.send();