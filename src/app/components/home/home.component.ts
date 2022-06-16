import { Component, OnInit } from '@angular/core';
import { PhotoInfo } from '../../core/models';
import { PhotoService } from '../../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  photosInfo: Array<PhotoInfo> = [];
  displayPhotosCount = 5;
  pageNumber = 1;
  photoInfoSub: any;

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.loadPhotos(this.pageNumber, this.displayPhotosCount);
  }

  ngOnDestroy() {
    this.photoInfoSub.unsubscribe();
  }

  loadPhotos(page: number = 1, count: number = 5) {
    this.photoInfoSub = this.photoService
      .getRandomPhotosInfo(page, count)
      .subscribe((infoList) => {
        this.photosInfo = [...infoList];
      });
  }

  onloadNewPhotos(type: string, e: any) {
    if (type === 'page') {
      this.pageNumber = e.target.value;
    } else {
      this.displayPhotosCount = e.target.value;
    }
    this.loadPhotos(this.pageNumber, this.displayPhotosCount);
  }

  onNextPage() {
    this.pageNumber += 1;
    this.setPageDropdown(this.pageNumber.toString());
    this.loadPhotos(this.pageNumber, this.displayPhotosCount);
  }

  onPreviousPage() {
    this.pageNumber -= 1;
    this.setPageDropdown(this.pageNumber.toString());
    this.loadPhotos(this.pageNumber, this.displayPhotosCount);
  }

  setPageDropdown(newValue: string) {
    let options = document.getElementById('pages')?.children;
    if (options && options.length > 0) {
      for (let i = 0; i < options.length; i++) {
        (options.item(i) as any).selected =
          (options.item(i) as any).value === newValue ? true : false;
      }
    }
  }
}
