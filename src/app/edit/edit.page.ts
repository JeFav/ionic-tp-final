import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {ApiService} from '../service/api/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray} from '@angular/forms';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

    userForm: FormGroup;
    users: FormArray;

    constructor(public api: ApiService,
                public loadingController: LoadingController,
                private route: ActivatedRoute,
                public router: Router,
                private formBuilder: FormBuilder
    ) {
        this.getUsers(this.route.snapshot.paramMap.get('id'));
        this.userForm = this.formBuilder.group({
            'user_name': [null, Validators.required],
            'users': this.formBuilder.array([])
        });
    }

    async getUsers(id) {
        // const loading = await this.loadingController.create({
        //     content: "Loading"
        // });
        // await loading.present();
        await this.api.getUserById(id).subscribe(res => {
            this.userForm.controls['user_name'].setValue(res.user_name);
            let controlArray = <FormArray>this.userForm.controls['users'];
            res.users.forEach(std => {
                controlArray.push(this.formBuilder.group({
                    user_name: ''
                }));
            });
            for (let i = 0; i < res.users.length; i++) {
                controlArray.controls[i].get('user_name').setValue(res.users[i].user_name);
            }
            console.log(this.userForm);
            // loading.dismiss();
        }, err => {
            console.log(err);
            // loading.dismiss();
        });
    }

    createUserForm(): FormGroup {
        return this.formBuilder.group({
            user_name: ''
        });
    }

    addBlankUser(): void {
        this.users = this.userForm.get('users') as FormArray;
        this.users.push(this.createUserForm());
    }

    deleteUser(control, index) {
        control.removeAt(index);
    }

    async updateUser() {
        await this.api.updateUser(this.route.snapshot.paramMap.get('id'), this.userForm.value)
            .subscribe(res => {
                let id = res['id'];
                this.router.navigate(['/detail', JSON.stringify(id)]);
            }, (err) => {
                console.log(err);
            });
    }

    ngOnInit() {
    }

}
