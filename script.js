const app = document.getElementById('launches_root');


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
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        app.appendChild(card);

        //(html) selected details for each instance
        const name = document.createElement('p');
        name.setAttribute('class', 'details');
        name.textContent = "Mission name: " + obj.mission_name;

        const year = document.createElement('p');
        year.setAttribute('class', 'details');
        year.textContent = "Launch year: " + obj.launch_year;

        const date = document.createElement('p');
        date.setAttribute('class', 'details');
        date.textContent = "Launch date: " + obj.launch_date_local.substring(0,10);

        const rocket_name_type = document.createElement('p');
        rocket_name_type.setAttribute('class', 'details');
        rocket_name_type.textContent = "Rocket name: " + obj.rocket.rocket_name + " " + obj.rocket.rocket_type; 

        const launch_site = document.createElement('p');
        launch_site.setAttribute('class', 'details');
        launch_site.textContent = "Launch site: " + obj.launch_site.site_name_long;

        card.appendChild(name);
        card.appendChild(year);
        card.appendChild(date);
        card.appendChild(rocket_name_type);
        card.appendChild(launch_site);

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