const NullImage = ({category}) =>{
    console.log(category)
    return category;
    switch (category) {
        case "berlin":
            return "assets/berlin.jpg";
        break;
        case "bitcoin":
            return "assets/bitcoin.jpg";
        break;
        case "brazil":
            return "assets/brazil.jpeg";
        break;
        case "cars":
            return "assets/cars.jpg";
        break;
        case "covid":
            return "assets/covid.jpeg";
        break;
        case "election":
            return "assets/election.png";
        break;
        case "nba":
            return "assets/nba.jpg";
        break;
        case "soccer":
            return "assets/soccer.jpg";
        break;
        default:
            return "assets/nulllimage.png";            
    }
}
export default NullImage