import { Injectable } from '@angular/core';
import { URL } from '../../constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LearnFromSanatanaService {

  constructor(private httpClient: HttpClient) { 
    
  }



  learnfromsanatanadharama():Observable<any>{
    return this.httpClient.get(URL+"questionanswers/")

  }}
