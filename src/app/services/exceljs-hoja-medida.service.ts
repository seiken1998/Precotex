import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import * as logo from './mylogo.js';

@Injectable({
  providedIn: 'root'
})
export class ExceljsHojaMedidaService {

  
  public exportExcel(excelData) {

    //Title, Header & Data




     const title  = excelData.title;
     const header = excelData.headers
     const data   = excelData.data;

     var abc = 64
     //var abc2 = 64
     var abcIni = ''
     var abcFin = ''
     //var abcIni2 = ''
     for (let i = 0; i < header.length; i++) {
       abc = abc + 1
       //abc2 = abc2 + 1
       if(i == 0){
         abcIni = String.fromCharCode(Number(abc))
         //abcIni2 = String.fromCharCode(Number(abc2))
       }
       /*if(abc == 90){
         abc2 = 64 
       }*/
     }
     abcFin = String.fromCharCode(Number(abc))
    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(title);

 
    //Add Row and formatting
    worksheet.mergeCells('F1', 'O4');
    let titleRow = worksheet.getCell('H1');
    titleRow.value = title
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: '000000' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    // Date
    worksheet.mergeCells('P1:V2');
    let d = new Date();
    let date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    let dateCell = worksheet.getCell('Q1');
    dateCell.value =  'OP: '+excelData.Cod_OrdPro;
    dateCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    dateCell.alignment = { vertical: 'middle', horizontal: 'center' }


    worksheet.mergeCells('P3:V4');
    let totalCell = worksheet.getCell('Q3');
    totalCell.value = 'Estilo Propio/Version: '+excelData.Cod_EstPro +'/'+excelData.Cod_Verion;
    totalCell.font = {
      name: 'Calibri',
      size: 12,
      bold: true
    }
    totalCell.alignment = { vertical: 'middle', horizontal: 'center' }

    //Add Image
    worksheet.mergeCells('C1:E4');
    let myLogoImage = workbook.addImage({
      base64: logo.imgBase64,
      extension: 'jpeg',
    });
    worksheet.addImage(myLogoImage, 'C1:D3');
    //let imageRow = worksheet.getCell('A1');
    //imageRow.alignment = { vertical: 'middle', horizontal: 'center' }
    
    //Blank Row 
    //worksheet.addRow([]);

    //agregar filtros

  
  


  
    worksheet.autoFilter = abcIni+'5:'+abcFin+'5'; 
    
    //worksheet.autoFilter = 'A5:L5';


    //Adding Header Row
    let headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
      
    })

    // Adding Data with Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);

      /*let sales = row.getCell(6);
      let color = 'FF99FF99';
      if (+sales.value < 200000) {
        color = 'FF9999'
      }

      sales.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      }*/
      /*const rows = worksheet.getRow(d);
      rows.height = 20*/
      
    }
    );
    
    worksheet.getColumn(1).width = 0;
    worksheet.getColumn(2).width = 0;
    worksheet.getColumn(3).width = 10;
    worksheet.getColumn(4).width = 40;
    worksheet.getColumn(5).width = 13;
     

    
    //worksheet.addRow([]);

  
    //Footer Row
    let footerRow = worksheet.addRow([title + ' - Fecha: ' + date]);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '4167B8' }
    };

    footerRow.getCell(1).font = {
      bold: true,
      color: { argb: 'FFFFFF' },
      size: 12
    }
    var r = data.length + 6;
    console.log(r);
    //Merge Cells
    worksheet.mergeCells(``+abcIni+`${footerRow.number}:`+abcFin+`${footerRow.number}`);
    worksheet.pageSetup.orientation = 'landscape'
    worksheet.pageSetup.printArea = ('A1:AI'+r);
    worksheet.pageSetup.scale.toPrecision(85);
    worksheet.pageSetup.fitToHeight = 1
    worksheet.pageSetup.fitToWidth = 1
    worksheet.pageSetup.scale = 1
    worksheet.pageSetup.fitToPage = true
    worksheet.pageSetup.paperSize = 9; // B5 (JIS)
    worksheet.pageSetup.horizontalCentered = true;

    worksheet.pageSetup.margins = {
    left: 0, right: 0,
    top: 0, bottom: 0,
    header: 0, footer: 0
};
    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, title + '.xlsx');
    })


    
  }

}
