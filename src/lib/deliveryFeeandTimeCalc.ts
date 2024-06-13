// Function to calculate distance between two coordinates in km
export function getDistanceFromLatLonInKm(lat1:number, lon1:number, lat2:number, lon2:number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg:number) {
  return deg * (Math.PI / 180);
}

// Function to calculate delivery fee and time
export function calculateDelivery(distance:number) {
  const baseFee = 5; // Base delivery fee in dollars
  const feePerKm = 1; // Additional fee per km
  const baseTime = 10; // Base delivery time in minutes
  const timePerKm = 2; // Additional time per km

  const deliveryFee = baseFee + feePerKm * distance;
  const deliveryTime = baseTime + timePerKm * distance;

  return { deliveryFee, deliveryTime };
}
