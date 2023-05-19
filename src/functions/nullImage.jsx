const nullImage = function(category){
    switch (category) {
        case "berlin":
            return "/src/assets/berlin.jpg";
        break;
        case "bitcoin":
            return "/src/assets/bitcoin.jpg";
        break;
        case "brazil":
            return "/src/assets/brazil.jpeg";
        break;
        case "cars":
            return "/src/assets/cars.jpg";
        break;
        case "covid":
            return "/src/assets/covid.jpeg";
        break;
        case "election":
            return "/src/assets/election.png";
        break;
        case "nba":
            return "/src/assets/nba.jpg";
        break;
        case "soccer":
            return "/src/assets/soccer.jpg";
        break;
        default:
            return "/src/assets/nulllimage.png";            
    }
}
export default nullImage