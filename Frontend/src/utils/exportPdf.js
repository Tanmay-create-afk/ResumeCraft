import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Exports an HTML DOM element to a high-resolution PDF document
 * @param {HTMLElement} element - The resume DOM container to render
 * @param {string} fileName - Output file name
 * @param {'a4' | 'letter'} format - Page format
 */
export async function exportToPdf(element, fileName = 'Resume.pdf', format = 'a4') {
  if (!element) {
    throw new Error('Element to export is not provided');
  }

  const canvas = await html2canvas(element, {
    scale: 2, // High resolution retina scale
    useCORS: true,
    logging: false,
    windowWidth: element.scrollWidth,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', format);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
}

/**
 * Triggers native browser print dialog optimized for vector print
 */
export function triggerNativePrint() {
  window.print();
}
