import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export type ExportColumn<T> = {
  label: string;
  key: keyof T;
};

export async function exportToCSV<T>(
  getData: () => Promise<T[]>,
  columns: ExportColumn<T>[],
  fileName = 'export'
) {
  const rows = await getData();
  if (!rows.length) return;

  const csvHeader = columns.map((col) => col.label).join(',');
  const csvRows = rows.map((row) =>
    columns.map((col) => JSON.stringify(row[col.key] ?? '')).join(',')
  );

  const csvContent = [csvHeader, ...csvRows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${fileName}.csv`);
}

export async function exportToPDF<T>(
  getData: () => Promise<T[]>,
  columns: ExportColumn<T>[],
  fileName = 'export',
  title: string = 'Exported Data'
) {
  const rows = await getData();
  if (!rows.length) return;

  const doc = new jsPDF();
  const headers = [columns.map((col) => col.label)];
  const tableRows = rows.map((row) =>
    columns.map((col) => String(row[col.key] ?? ''))
  );

  doc.text(title, 14, 10);
  doc.text(`Total rows: ${rows.length}`, 14, 18);

  autoTable(doc, {
    startY: 26,
    head: headers,
    body: tableRows,
  });

  doc.save(`${fileName}.pdf`);
}

export async function handlePrint<T>(
  getData: () => Promise<T[]>,
  columns: ExportColumn<T>[],
  title: string = 'Exported Data'
) {
  const rows = await getData();
  if (!rows.length) return;

  const headers = columns.map((col) => col.label);

  let printArea = document.getElementById('printArea');
  if (!printArea) {
    printArea = document.createElement('div');
    printArea.id = 'printArea';
    document.body.appendChild(printArea);
  }

  printArea.innerHTML = `
    <style>
      #printArea { display: none; }
      @media print {
        body * { visibility: hidden; }
        #printArea, #printArea * { visibility: visible; }
        #printArea {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          margin: 0;
          padding: 20px;
          font-size: 14px;
          line-height: 1.5;
        }
        #printArea h1 {
          font-size: 18px;
          text-align: center;
          margin: 10px 0;
        }
        #printArea h2 {
          font-size: 14px;
          text-align: center;
          margin: 2px 0 10px 0;
          font-weight: normal;
        }
        #printArea table {
          width: 100%;
          border-collapse: collapse;
        }
        #printArea th, #printArea td {
          border: 1px solid #ddd;
          padding: 8px 10px;
          text-align: left;
        }
        #printArea th {
          background-color: #f2f2f2;
          font-weight: bold;
          -webkit-print-color-adjust: exact;
          font-size: 14px;
        }
      }
    </style>
    <h1>${title}</h1>
    <h2>Total number of rows: ${rows.length}</h2>
    <table>
      <thead>
        <tr>${headers.map((header) => `<th>${header}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
          <tr>
            ${columns
              .map((col) => `<td>${row[col.key] ?? ''}</td>`)
              .join('')}
          </tr>`
          )
          .join('')}
      </tbody>
    </table>
  `;

  window.print();
}
