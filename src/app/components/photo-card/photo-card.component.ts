import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoInfo } from '../../core/models';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(500, style({ opacity: 0 }))]),
    ]),
  ],
})
export class PhotoCardComponent implements OnInit {
  @Input() info?: PhotoInfo;
  @Input() photoNumber?: number;

  constructor(private router: Router) {}

  ngOnInit() {}

  displayPhoto(id: string) {
    this.router.navigate([`/photo/${id}`]);
  }
}
