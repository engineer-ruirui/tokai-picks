import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IVideo } from '../interface/video.model';
import { IChannel } from '../interface/channel.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoCollection: AngularFirestoreCollection<IVideo>;
  channelCollection: AngularFirestoreCollection<IChannel>;

  constructor(
    private db: AngularFirestore,
  ) { }

  getVideoInfo() {
    this.db.collection<{ value: IVideo[] }>('videos')
    .valueChanges()
    .subscribe(value => {
      // this.data = value;
      console.log('test');
      return value;
    },
    error => {
      // this.data = null;
      return null;
    });
  }


}
