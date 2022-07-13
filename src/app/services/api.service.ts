import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {}

    public getUsers(pageNum: number | string = 1, pageSize: number | string = 20) {
        return this.http.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNum}/${pageSize}`);
    }

    public getUser(userId: number | string) {
        return this.http.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`);
    }

    public getUserFriends(userId: number | string, pageNum: number | string = 1, pageSize: number | string = 20) {
        return this.http.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${pageNum}/${pageSize}`);
    }
}