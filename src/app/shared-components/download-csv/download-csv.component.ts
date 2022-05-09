import { Component, Input, OnInit } from '@angular/core';
import { Util } from 'src/app/service/util';

@Component({
  selector: 'download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.scss']
})
export class DownloadCsvComponent implements OnInit {
  @Input() data:string[][]=[];
  @Input() fileName:string|undefined=undefined;
  constructor() { }

  ngOnInit(): void {
  }

  exportClick(){
    
    this.downloadFile(this.data,this.fileName)  
  }

  downloadFile(data: string[][], fileName?: string) {
    if(fileName == undefined){
      fileName = `${Util.getYYYY_MM_DD(new Date())}.csv`;
    }
    else if (!fileName.endsWith('.csv')) {
      //doesnt end with csv
      fileName += '.csv';
    }

    const replacer = (value: any) => (value === null ? '' : value); 
    // specify how you want to handle null values here

    const header = (data[0]);
    const csv = data.map((row: any) =>
     row.map((e:string)=>replacer(e))
    );
    // csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
