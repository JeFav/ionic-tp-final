import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private users: any;
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(public api: ApiService, public loadingController: LoadingController) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

    getUsers() {
        // const loading = await this.loadingController.create({
        //     content: 'Loading'
        // });
        // await loading.present();
        this.api.getUsers()
            .subscribe(res => {
                console.log(res);
                this.users = res;
                // loading.dismiss();
            }, err => {
                console.log(err);
                // loading.dismiss();
            });
    }

  ngOnInit() {
      this.getUsers();
  }

     delete(id) {
        // const loading = await this.loadingController.create({
        //     content: 'Deleting'
        // });
        // await loading.present();
        /* this.api.deleteUser(id)
            .subscribe(res => {
                // loading.dismiss();
                // this.location.back();
                console.log(res);
            }, err => {
                console.log(err);
                // loading.dismiss();
            });*/
    }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
