import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../shared/services/spotify.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ISpotifyTrack} from '../../shared/model/spotify-track.model';

@Component({
  selector: 'app-suggested-playlist',
  templateUrl: './suggested-playlist.component.html',
  styleUrls: ['./suggested-playlist.component.scss']
})
export class SuggestedPlaylistComponent implements OnInit {

  suggestedTracks: Array<ISpotifyTrack> = [];

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.getSuggestedTracks();
  }

  goTrack(url: string) {
    window.open(url, '_blank');
  }

  getSuggestedTracks() {
    this.spotifyService.getSuggestedPlaylist().subscribe((res: HttpResponse<Array<ISpotifyTrack>>) => {
      if (res.body.length !== 0) {
        if (res.body.length > 40) {
          this.suggestedTracks = res.body.slice(0, 40);
        } else {
          this.suggestedTracks = res.body;
        }
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}
