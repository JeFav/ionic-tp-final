import { Component, OnInit } from '@angular/core';
import {ApiService} from '../service/api/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private user: any;

  constructor(private api: ApiService) {
    this.postUser();
  }

  ngOnInit() {
  }

  postUser() {
    const data = {
      'id': 3,
      'gender': 'male',
      'name': {
        'title': 'monsieur',
        'first': 'White',
        'last': 'Erwann'
      },
      'location': {
        'street': '9125 avenue du château',
        'city': 'stein (ar)',
        'state': 'appenzell ausserrhoden',
        'postcode': 5129,
        'coordinates': {
          'latitude': '-53.3206',
          'longitude': '115.6396'
        },
        'timezone': {
          'offset': '+11:00',
          'description': 'Magadan, Solomon Islands, New Caledonia'
        }
      },
      'email': 'carol.joly@example.com',
      'login': {
        'uuid': '27ffe1d0-632b-4403-a704-e8e6897694d5',
        'username': 'admin',
        'password': 'admin',
        'salt': 'mhStdn3E',
        'md5': 'e6e860ac96fad5771477b4a6cffc3d0a',
        'sha1': '7da8af62a48735afbc6bdf510ee63c1bdf01f725',
        'sha256': '24cc8fb594ad23b5006dbab9c522d6453a58b254a45179e43588abbbf0a76de2'
      },
      'dob': {
        'date': '1992-02-15T10:09:24Z',
        'age': 27
      },
      'registered': {
        'date': '2008-05-30T01:03:51Z',
        'age': 10
      },
      'phone': '(462)-833-9930',
      'cell': '(404)-215-3367',
      'picture': {
        'large': 'https://randomuser.me/api/portraits/women/49.jpg',
        'medium': 'https://randomuser.me/api/portraits/med/women/49.jpg',
        'thumbnail': 'https://randomuser.me/api/portraits/thumb/women/49.jpg'
      },
      'nat': 'CH'
    };
    this.api.postUser(data).subscribe((value) => {
      this.user = value;
      console.log('users : ' + this.user);
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('Fin affichage de profile !');
    });
  }
}
