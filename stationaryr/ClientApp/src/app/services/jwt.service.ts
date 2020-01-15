import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class JwtService {
    constructor(private httpClient: HttpClient) { }
}
