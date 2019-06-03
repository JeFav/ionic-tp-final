import {Component, OnInit} from '@angular/core';
import {ApiService} from '../service/api/api.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
    private users: any;
    private userById: object;
    private deletedUser: any;

    constructor(private api: ApiService) {
       this.getUsers();
    }

    ngOnInit() {
    }

    getUsers() {
        this.api.getUsers().subscribe((value) => {
            this.users = value;
            console.log('users : ' + this.users);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('Fin affichage de profile !');
        });
    }

    getUsersById(params: any) {
        this.api.getUserById(params).subscribe((value) => {
            this.userById = value.res;
            console.log('user : ' + this.userById);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('Fin getUsersById !');
        });
    }

    deleteUser(params: any) {
        this.api.deleteUser(params).subscribe((value) => {
            this.deletedUser = value;
            console.log('user : ' + this.deletedUser);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('Fin delete user !');
        });
    }
}
