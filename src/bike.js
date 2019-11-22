export class BikeIndex
{
     async getBikeIndex() {
     let response = await fetch(`https://CORS-anywhere.herokuapp.com/bikeindex.org:443/api/v3/search?page=1&per_page=25&stolenness=stolen`);
     let jsonifiedResponse = await response.json();
     return jsonifiedResponse;
   }

}
