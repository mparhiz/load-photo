import { fromEvent, map, Observable } from "rxjs";

export const toBase64 = (blob: Blob): Observable<string> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return fromEvent(reader, 'load').pipe(map(() => (reader.result as string)))
}
