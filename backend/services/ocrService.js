const Tesseract = require('tesseract.js');
const pdf = require('pdf-parse');
const fs = require('fs').promises;

/**
 * OCR Service - Extract text from PDF/Image files
 */
class OCRService {
  /**
   * Extract text from PDF file
   * @param {string} filePath - Path to PDF file
   * @returns {Promise<string>} Extracted text
   */
  async extractTextFromPDF(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }

  /**
   * Extract text from image file using Tesseract OCR
   * @param {string} filePath - Path to image file
   * @returns {Promise<string>} Extracted text
   */
  async extractTextFromImage(filePath) {
    try {
      const { data: { text } } = await Tesseract.recognize(
        filePath,
        'eng',
        {
          logger: m => console.log(m)
        }
      );
      return text;
    } catch (error) {
      console.error('OCR error:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  /**
   * Auto-detect file type and extract text
   * @param {string} filePath - Path to file
   * @param {string} mimeType - MIME type of file
   * @returns {Promise<string>} Extracted text
   */
  async extractText(filePath, mimeType) {
    if (mimeType === 'application/pdf') {
      return await this.extractTextFromPDF(filePath);
    } else if (mimeType.startsWith('image/')) {
      return await this.extractTextFromImage(filePath);
    } else {
      throw new Error('Unsupported file type');
    }
  }
}

module.exports = new OCRService();
