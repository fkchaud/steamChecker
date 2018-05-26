import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  steamApps: Array<SteamApp>;
  steamAppsFiltered: Array<SteamApp>;
  steamApp: SteamAppStore;
  steamAppFailure = false;

  constructor( private http: HttpClient ) {
  }

  showImage(): string {
    if (this.steamApp == null || this.steamApp.header_image == null) {
      return '';
    } else {
      return this.steamApp.header_image;
    }
  }

  showName(): string {
    if (this.steamApp == null || this.steamApp.name == null) {
      return '';
    } else {
      return this.steamApp.name;
    }
  }

  showType(): string {
    let c: string;
    if (this.steamApp == null || this.steamApp.type == null) {
      c = '';
    } else {
      switch (this.steamApp.type) {
        case'game':
          c = 'Juego';
          break;
        case'dlc':
          c = 'DLC';
          break;
        case'demo':
          c = 'Demo';
          break;
        case'movie':
          c = 'Película / Video';
          break;
        case'series':
          c = 'Serie';
          break;
        case'episode':
          c = 'Episodio';
          break;
        default:
          c = 'Otro';
      }
    }
    return c;
  }

  showScore(): string {
    if (this.steamApp == null || this.steamApp.metacritic == null || this.steamApp.metacritic.score == null) {
      return '';
    } else {
      return '' + this.steamApp.metacritic.score;
    }
  }

  listGenres(): string {
    let c = '';
    if (this.steamApp == null || this.steamApp.genres == null || this.steamApp.genres.length === 0) {
      c = '';
    } else {
      for (const g of this.steamApp.genres) {
        c += g.description + ', ';
      }
      c = c.substring(0, c.lastIndexOf(','));
    }
    return c;
  }

  showPrice(): string {
    if (this.steamApp == null ||
        this.steamApp.is_free == null) {
      return '';
    } else {
      if (this.steamApp.is_free) {
        return 'Gratis';
      } else if (this.steamApp.price_overview == null ||
                 this.steamApp.price_overview.final == null) {
          return '';
      } else {
        return '$' + (this.steamApp.price_overview.final) / 100;
      }
    }
  }

  showDescription(): string {
    if (this.steamApp == null || this.steamApp.detailed_description == null) {
      return '';
    } else {
      return this.steamApp.detailed_description;
    }
  }

  showShortDescription(): string {
    if (this.steamApp == null || this.steamApp.short_description == null) {
      return '';
    } else {
      return this.steamApp.short_description;
    }
  }

  onNameKeyUp(event: any) {
    if (event.target.value.length >= 3) {
      this.steamAppsFiltered = this.steamApps.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  }

  showMore(appid: number) {
    this.http.get<SteamAppStoreInterface>('https://store.steampowered.com/api/appdetails?appids=' + appid).subscribe(app => {
      this.steamApp = app[appid].data;
      this.steamAppFailure = !app[appid].success;
    });
  }

  ngOnInit() {
    this.http.get<SteamAppList>('http://api.steampowered.com/ISteamApps/GetAppList/v0002/').subscribe(applist => {
      this.steamApps = applist.applist.apps;
    });
  }
}
