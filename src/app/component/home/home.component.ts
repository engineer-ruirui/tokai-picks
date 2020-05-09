import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { IVideo } from '../../interface/video.model';
import { IChannel } from '../../interface/channel.model';
import { VideoService } from '../../service/video.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videoCollection: AngularFirestoreCollection<IVideo>;
  channelCollection: AngularFirestoreCollection<IChannel>;

  videos: IVideo[] = [];
  message: string = 'people data.';
  data: any;

  constructor(
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private videoService: VideoService,
  ) { }

  ngOnInit() {
    this.getVideoInfo();
  }

  getVideoInfo() {
    // this.data = this.videoService.getVideoInfo();
    // this.videoCollection = this.db.collection<IVideo>('videos');

    this.db.collection<{ value: IVideo[] }>('videos')
    .valueChanges()
    .subscribe(value => {
      this.data = value;
    },
    error => {
      this.message = "cant get data";
      this.data = null;
    });
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithRedirect(provider)
    .then((result) => {
      this.getVideoInfo();
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.getVideoInfo();
  }

  get currentUser() {
    return this.afAuth.auth != null ?
     this.afAuth.auth.currentUser != null ?
      this.afAuth.auth.currentUser.displayName : '(not logined)' :
       '(not logined)' ;
  }

}
