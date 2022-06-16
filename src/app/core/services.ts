import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { toBase64 } from './helpers';
import { PhotoInfo } from './models';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  baseUrl = 'https://picsum.photos';

  constructor(private http: HttpClient) {}

  getRandomPhotosInfo(page: number, limit: number): Observable<PhotoInfo[]> {
    return this.http.get<PhotoInfo[]>(
      `${this.baseUrl}/v2/list?page=${page}&limit=${limit}`
    );
  }

  getPhoto(
    id: number,
    widthSize: number = 200,
    heightSize: number = 300,
    grayscale: boolean = false
  ): Observable<string> {
    return this.http
      .get<any>(
        `${this.baseUrl}/id/${id}/${widthSize}/${heightSize}?${
          grayscale ? 'grayscale' : ''
        }`,
        {
          headers: { 'Content-Type': 'application/octet-stream' },
          responseType: 'blob' as 'json',
        }
      )
      .pipe(switchMap((blobResponse) => toBase64(blobResponse)));
  }
}
