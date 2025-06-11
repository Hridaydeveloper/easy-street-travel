
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => google.maps.Map;
        Marker: new (options: any) => google.maps.Marker;
        DirectionsService: new () => google.maps.DirectionsService;
        DirectionsRenderer: new (options?: any) => google.maps.DirectionsRenderer;
        TravelMode: {
          DRIVING: string;
        };
        Size: new (width: number, height: number) => google.maps.Size;
        places: {
          AutocompleteService: new () => google.maps.places.AutocompleteService;
          PlacesService: new (element: HTMLElement) => google.maps.places.PlacesService;
          PlacesServiceStatus: {
            OK: string;
          };
        };
      };
    };
  }

  namespace google.maps {
    class Map {
      constructor(element: HTMLElement, options: any);
    }
    
    class Marker {
      constructor(options: any);
    }
    
    class DirectionsService {
      route(request: any, callback: (result: any, status: string) => void): void;
    }
    
    class DirectionsRenderer {
      constructor(options?: any);
      setMap(map: Map | null): void;
      setDirections(directions: any): void;
    }
    
    class Size {
      constructor(width: number, height: number);
    }

    namespace places {
      class AutocompleteService {
        getPlacePredictions(request: any, callback: (predictions: any[], status: string) => void): void;
      }
      
      class PlacesService {
        constructor(element: HTMLElement);
        getDetails(request: any, callback: (place: any, status: string) => void): void;
      }
      
      enum PlacesServiceStatus {
        OK = 'OK'
      }
    }
  }
}

export {};
