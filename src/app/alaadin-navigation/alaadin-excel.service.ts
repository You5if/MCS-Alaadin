import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() {

  }

  async generateExcel(loads: any[]) {


    // Excel Title, Header, Data
    // const title = 'Yearly Social Sharing Education For Betterment';
    console.log(loads);
    
    const header = ['ID', 'Photo', 'Date', 'Model', 'LOT', 'VIN number',  'Point of loading', 'Auction', 'Destination port', 'Container number - Booking', 'Promised to be picked up', 'Dekiverd to warehouse', 'Arrival Date', 'Unloading date', 'Dock receipt', 'Title status', 'Title received', 'Keys', 'Action', 'Notes', 'Invoice for auto', 'Auto price','Paid','Sold','Note for yourself', 'Terminal notes'];
    // const data = loads
    const data = loads

    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sharing Data');


// Add Row and formatting
    // const titleRow = worksheet.addRow([title]);
    // titleRow.font = { name: 'Calibri', family: 4, size: 10, underline: 'double', bold: true };
    // worksheet.addRow([]);
    // const subTitleRow = worksheet.addRow(['Date : 06-09-2020']);

    // worksheet.mergeCells('A1:D2');


// Blank Row
    // worksheet.addRow([]);

// Add Header Row
    const headerRow = worksheet.addRow(header);

// Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
        cell.font = {
            bold: true
        }
        
            cell.alignment = {
                horizontal: 'center'
            }
        
//   cell.fill = {
//     type: 'pattern',
//     pattern: 'solid',
//     // fgColor: { argb: 'FFFFFF00' },
//     // bgColor: { argb: 'FF0000FF' }
//   };
//   cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
});

// Add Data and Conditional Formatting
    data.forEach(d => {
  const row = worksheet.addRow(d);
  
//   const qty = row.getCell(5);
//   let color = 'FF99FF99';
//   if (+qty.value < 500) {
//     color = 'FF9999';
//   }

//   qty.fill = {
//     type: 'pattern',
//     pattern: 'solid',
//     fgColor: { argb: color }
//   };
}

);



worksheet.columns.forEach(c => {
    c.alignment = {
        horizontal: 'center'
    }
})
    // worksheet.getColumn(1).width = 30;
    // worksheet.getColumn(2).width = 30;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 30;
    worksheet.getColumn(6).width = 30;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(10).width = 40;
    worksheet.getColumn(11).width = 30;
    worksheet.getColumn(12).width = 30;
    worksheet.getColumn(13).width = 20;
    worksheet.getColumn(14).width = 20;
    worksheet.getColumn(15).width = 20;
    worksheet.getColumn(16).width = 20;
    worksheet.getColumn(17).width = 20;
    worksheet.getColumn(20).width = 40;
    worksheet.getColumn(21).width = 20;
    worksheet.getColumn(25).width = 20;
    worksheet.getColumn(26).width = 20;
    
    // worksheet.addRow([]);


// Footer Row
//     const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
//     footerRow.getCell(1).fill = {
//   type: 'pattern',
//   pattern: 'solid',
//   fgColor: { argb: 'FFCCFFE5' }
// };
//     footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

// Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

// Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, 'AlaadinExcel.xlsx');
});

  }
}