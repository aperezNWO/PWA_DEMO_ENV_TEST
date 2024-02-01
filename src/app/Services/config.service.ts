import { Injectable  } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http.get('./assets/config.json').toPromise()
      .then((data: any) => {
         //
         environment.externalConfig = data; // Assign loaded data to environment variable
      })
      .catch(error => {
        console.error('Error loading configuration:', error);
      });
  }
  //
  getConfigValue(key: string) {
    //
    let jsonData : string = JSON.parse(JSON.stringify(environment.externalConfig))[key];
    //
    console.log(jsonData);
    //
    console.log('Reading config : ' + key + ', value :' + jsonData)
    //
    return jsonData;
  }
}
