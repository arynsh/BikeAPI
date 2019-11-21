import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function()
{

  $("#inputform").submit(function(event)
  {
  event.preventDefault();

  let color = "Blue";
  let year = null;
  // let city = $("").val();
  let output = "";

  let request = new XMLHttpRequest();
  const url = `https://CORS-anywhere.herokuapp.com/bikeindex.org:443/api/v3/search?page=5&per_page=25&stolenness=stolen&access_token=fa68d0976430ee4f1dfef840895dc56d4c48f571f5eccb56e74077d23b9d0695`;

  request.onreadystatechange = function()
  {
    if (this.readyState === 4 && this.status === 200)
    {
      const response = JSON.parse(this.responseText);
      // console.log(response.bikes[24]);

      for(let i = 0; i< response.bikes.length; i++)
      {
        // console.log(response.bikes[i].frame_colors[]);
        for(let j = 0; j< response.bikes[i].frame_colors.length; j++)
        {

           //console.log(response.bikes[i].frame_colors[j]);
          // console.log(response.bikes[i].frame_colors);
           if (response.bikes[i].frame_colors[j] === color && response.bikes[i].year === year)
           {
              output += JSON.stringify("Date Stolen: "+response.bikes[i].date_stolen+
                                       "; Description: "+response.bikes[i].description +
                                       "; Color: "+response.bikes[i].frame_colors+
                                       "; Manufacturer: "+response.bikes[i].manufacturer_name+
                                       "; Year: " + response.bikes[i].year)+ "<br>";

           }

        }
      }
      console.log(output);

      getElements();
    }
  }

  request.open("GET", url, true);
  request.send();

  const getElements = function()
  {
   $("#solution").html(output);
  }
  });
});
