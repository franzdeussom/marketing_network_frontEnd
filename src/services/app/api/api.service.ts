import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { EnvService } from 'src/services/environement/env.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: any;

  env : any = {
    server : environment.apiUrl
  };

  constructor(private api: HttpClient, envi: EnvService) {
        this.env.server = envi.server;
   }

  createHeaders(): Object{  
      let appToken: any;

      if(localStorage.getItem('appUserToken')){
          appToken = localStorage.getItem('appUserToken');
      }
      if(localStorage.getItem('appAdminToken')){
        appToken = localStorage.getItem('appAdminToken');
      }
      if(typeof appToken === 'undefined'){
          appToken = '';
      }
    return { 'Authorization': appToken };
  }

  post(endpoint: string, body: any){
      this.headers = this.createHeaders();
      return this.api.post(this.env.server+endpoint, body, { headers: this.headers });
  }

  get(endpoint: string, option?: any){
      this.headers = this.createHeaders();

      return this.api.get(this.env.server+endpoint, { headers: this.headers });
  }

  getWithRequestParam(endpoint: string, option?:any){
      this.headers = this.createHeaders();
      return this.api.get(this.env.server+endpoint, { headers: this.headers });
  }

  put(endpoint: string, body: any, option?:any){
      this.headers = this.createHeaders();
      return this.api.put(this.env.server+endpoint, body, { headers: this.headers });
  }

  delete(endpoint: string, id:any, option?: any){
      this.headers = this.createHeaders();
      return this.api.delete(this.env.server+endpoint+id, { headers: this.headers } );
  }

  patch(endpoint: string, option?: any){
      //return this.api.patch
  }

}
