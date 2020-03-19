import loadGoogleMapsApi from 'load-google-maps-api'


class Map {
  static loadGoogleMapsApi() {
    return loadGoogleMapsApi({
      key: 'AIzaSyB7Zkwv8ZHein66BAALTpWsJAQorKjiTlw'
    });
  }

  static createMap(googleMaps, mapElement, position) {
    return new googleMaps.Map(mapElement, {
      center: position,
      zoom: 14
    });
  }
}
export default Map;
