import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Events } from '../api/event.service';
import { Internationalization } from '../model/Internationalization';

@Component({
  selector: 'app-weight-loss-img',
  templateUrl: './weight-loss-img.component.html',
  styleUrls: ['./weight-loss-img.component.css']
})
export class WeightLossImgComponent implements OnInit {

  @Input('kg') kg: Array<number>;
  translations: Internationalization;

  constructor( 
    private storage: Storage,
    private events: Events
  ) { 
    this.translations = new Internationalization();
    this.storage.get('translations').then((data) => {
      this.translations = data;
    });
  }
     
  ngOnInit() {
    this.events.subscribe('translations', (data) => {
      this.translations = data;
    }); 
  }

}
