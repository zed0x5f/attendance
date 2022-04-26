import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvExporterService {
  constructor() {}

  
  //
  convertArrayToEncodedUri(data: string[][]) {
    let csvContent =
      'data:text/csv;charset=utf-8,' + data.map((e) => e.join(',')).join('\n');
    let encodedUri = encodeURI(csvContent);
    return encodedUri;
  }
}
