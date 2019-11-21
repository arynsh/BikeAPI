import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function()
{

  $("#formID").submit(function(event)
  {
    event.preventDefault();

    let city = $("#cityID").val();
    let color = $("#colorID").val();
    let year = $("#yearID").val();
    let year2;


      if (year !== "null" && year!=='')
      {
        year2 = parseInt(year);
        year = year2;
      }
      else
      {
        year=null;
      }



    let output = "";
    let results=0;
    console.log("THIS IS " + year);
    let request = new XMLHttpRequest();
    const url = `https://CORS-anywhere.herokuapp.com/bikeindex.org:443/api/v3/search?page=1&per_page=25&stolenness=stolen`;

    request.onreadystatechange = function()
    {
      if (this.readyState === 4 && this.status === 200)
      {
        const response = JSON.parse(this.responseText);
        for(let i = 0; i< response.bikes.length; i++)
        {  //loop goes through all bikes

          for(let j = 0; j< response.bikes[i].frame_colors.length; j++)     //loop goes through each bike's color
          {



            //*---------------------------------*
            if(year!=''&& color!==''&& city!=='')
            {
             if (response.bikes[i].frame_colors[j] === color && response.bikes[i].year === year  && response.bikes[i].stolen_location === city)
             {
                output += JSON.stringify("Date Stolen: "+response.bikes[i].date_stolen+
                                         "; Description: "+response.bikes[i].description +
                                         "; Color: "+response.bikes[i].frame_colors+
                                         "; City Stolen: "+response.bikes[i].stolen_location+
                                         "; Manufacturer: "+response.bikes[i].manufacturer_name+
                                         "; Year: " + response.bikes[i].year)+ "<br>";
                results += 1;
             }
           }
             if(color!==' ' && !year && city!==' ')
             {
                 if (response.bikes[i].frame_colors[j] === color && response.bikes[i].stolen_location === city)
                 {
                   output += JSON.stringify("Date Stolen: "+response.bikes[i].date_stolen+
                                            "; Description: "+response.bikes[i].description +
                                            "; Color: "+response.bikes[i].frame_colors+
                                            "; City Stolen: "+response.bikes[i].stolen_location+
                                            "; Manufacturer: "+response.bikes[i].manufacturer_name+
                                            "; Year: " + response.bikes[i].year)+ "<br>";
                    results += 1;
                 }
               }


             if(color!==' ' && year!==' ' && !city)
             {
                 if (response.bikes[i].frame_colors[j] === color && response.bikes[i].year === year)
                 {
                   output += JSON.stringify("Date Stolen: "+response.bikes[i].date_stolen+
                                            "; Description: "+response.bikes[i].description +
                                            "; Color: "+response.bikes[i].frame_colors+
                                            "; City Stolen: "+response.bikes[i].stolen_location+
                                            "; Manufacturer: "+response.bikes[i].manufacturer_name+
                                            "; Year: " + response.bikes[i].year)+ "<br>";
                  results += 1;
                 }
               }




             if(color!==' ' && !year && !city)
             {
                   if (response.bikes[i].frame_colors[j] === color)
                   {
                     output += JSON.stringify("Date Stolen: "+response.bikes[i].date_stolen+
                                              "; Description: "+response.bikes[i].description +
                                              "; Color: "+response.bikes[i].frame_colors+
                                              "; City Stolen: "+response.bikes[i].stolen_location+
                                              "; Manufacturer: "+response.bikes[i].manufacturer_name+
                                              "; Year: " + response.bikes[i].year)+ "<br>"+"<br>";
                    results += 1;
                   }
            }





            if(!color && year!==' ' && !city)
            {
                  if (response.bikes[i].year === year)
                  {
                    output += JSON.stringify("Date Stolen: "+response.bikes[i].date_stolen+
                                             "; Description: "+response.bikes[i].description +
                                             "; Color: "+response.bikes[i].frame_colors+
                                             "; City Stolen: "+response.bikes[i].stolen_location+
                                             "; Manufacturer: "+response.bikes[i].manufacturer_name+
                                             "; Year: " + response.bikes[i].year)+ "<br>"+"<br>";
                    results += 1;
                  }
           }



           if(!color && !year && city!==' ')
           {
                 if (response.bikes[i].stolen_location === city)
                 {
                   output += JSON.stringify("Date Stolen: "+response.bikes[i].date_stolen+
                                            "; Description: "+response.bikes[i].description +
                                            "; Color: "+response.bikes[i].frame_colors+
                                            "; City Stolen: "+response.bikes[i].stolen_location+
                                            "; Manufacturer: "+response.bikes[i].manufacturer_name+
                                            "; Year: " + response.bikes[i].year)+ "<br>"+"<br>";
                  results += 1;
                 }
          }





          }
        }

        getElements();
      }
    }

    request.open("GET", url, true);
    request.send();

    const getElements = function()
    {
     $("#solution").html(output);
     $(".results").text(results);
    }
  });
});
