import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../core/services';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('on', style({ opacity: 0, boxShadow: 0 })),
      state(
        'off',
        style({
          opacity: 1,
          boxShadow:
            '0 4px 8px 0 rgb(0 0 0 / 80%), 0 6px 20px 0 rgb(0 0 0 / 70%)',
        })
      ),
      transition('on=>off', animate('1000ms')),
      transition('off=>on', animate('300ms')),
    ]),
  ],
})
export class PhotoComponent implements OnInit {
  previewSignsrc: any;
  paramSub: any;
  isLoading = false;
  photoId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.paramSub = this.route.params.subscribe((params) => {
      this.photoId = +params['id'];
      this.loadPhoto(this.photoId, 400, 300, false);
    });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

  toExit() {
    this.router.navigate(['home']);
  }

  onGrayscaleChange(e: any) {
    this.isLoading = true;
    this.photoService
      .getPhoto(this.photoId, 400, 300, e.target.checked)
      .subscribe((base64Image) => {
        this.previewSignsrc = base64Image;
        this.isLoading = false;
      });
  }

  loadPhoto(id: number, width: number, height: number, grayscale: boolean) {
    this.photoService
      .getPhoto(id, width, height, grayscale)
      .subscribe((base64Image) => {
        this.previewSignsrc = base64Image;
        this.isLoading = false;
      });
  }
}
