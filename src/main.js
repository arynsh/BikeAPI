import { BikeIndex } from './../src/bike.js';
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
      else{
        year=null;
      }



    let output = "";
    let results=0;

      (async () => {
     let request = new BikeIndex();
     const response = await request.getBikeIndex();



        for(let i = 0; i< response.bikes.length; i++)   //loop goes through all bikes
        {
          for(let j = 0; j< response.bikes[i].frame_colors.length; j++)     //loop goes through each bike's color
          {
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

               if(!color && year!==' ' && city!==' ')
               {
                   if (response.bikes[i].stolen_location === city && response.bikes[i].year === year)
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
        getElements(response);
        })();
      //}
    //}

    // request.open("GET", url, true);
    // request.send();

    const getElements = function()
    {
     $("#solution").html(output);
     $(".results").text(results);
    }
  });
});
