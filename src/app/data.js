import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {store} from './store';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

export class Data{

    constructor(apiService : ApiService){}
    
}