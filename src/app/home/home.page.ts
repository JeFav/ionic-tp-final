import {Component} from '@angular/core';
import {DiscogsApiService} from '../service/discogsApi/discogs-api.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    research: {
        'artist_id': object,
        'sort': string,
        'sort_order': string,
    };

    constructor(private discogsApi: DiscogsApiService) {
        this.research = this.research;
    }

    searchInput(research: any) {
        const val = research.target.value;
        if (val && val.trim() !== '') {
            this.research.artist_id = val;
            this.research.sort = 'title';
            this.research.sort_order = 'asc';
            this.search(this.research);
        }
    }

    search(research: object) {
        this.discogsApi.searchByArtist(research).subscribe((value) => {
            console.log(value);
        }, (error) => {
            console.log(error);
        }, () => {
            console.log('Fini !');
        });
    }
}
