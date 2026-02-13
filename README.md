# PDFtoWord - Professional File Converter

![PDFtoWord Logo](https://img.shields.io/badge/PDFtoWord-File%20Converter-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-green?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0+-red?style=for-the-badge&logo=flask)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**PDFtoWord** is a powerful, secure, and lightning-fast file conversion web application. Built with Flask and modern web technologies, it provides a premium user experience for converting documents, images, audio, and video files—all processed locally for maximum privacy.

## ✨ Features

### 🔄 Multi-Format Support
- **Documents**: PDF ↔ DOCX, PDF → JPG/PNG
- **Images**: JPG/PNG/WEBP/HEIC → PDF, WEBP → JPG, and more
- **OCR**: Image to Text, Scanned PDF to DOCX (powered by Tesseract)
- **Audio**: MP3, WAV, FLAC, OGG conversion (coming soon)
- **Video**: MP4, AVI, MOV, MKV conversion (coming soon)

### 🛡️ Privacy & Security
- **Local Processing**: Files never leave your computer
- **Auto-Cleanup**: Files automatically deleted after 30 minutes
- **No Tracking**: Zero data collection or analytics
- **Open Source**: Fully transparent codebase

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Modern, elegant interface
- **Batch Processing**: Convert multiple files at once
- **Download All**: Zip multiple converted files in one click
- **Drag & Drop**: Intuitive file upload
- **Real-time Progress**: Live conversion status updates
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Tesseract OCR (for OCR features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/pdftoword.git
cd pdftoword
```

2. **Create a virtual environment**
```bash
python -m venv .venv
```

3. **Activate the virtual environment**
- Windows:
  ```bash
  .venv\Scripts\activate
  ```
- macOS/Linux:
  ```bash
  source .venv/bin/activate
  ```

4. **Install dependencies**
```bash
pip install -r requirements.txt
```

5. **Install Tesseract OCR (Optional, for OCR features)**
- **Windows**: Download from [Tesseract GitHub](https://github.com/UB-Mannheim/tesseract/wiki)
- **macOS**: `brew install tesseract`
- **Linux**: `sudo apt-get install tesseract-ocr`

6. **Run the application**
```bash
python app.py
```

7. **Open your browser**
Navigate to `http://127.0.0.1:5000`

## 📦 Project Structure

```
pdftoword/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── static/
│   ├── style.css         # Custom styles
│   └── script.js         # Frontend logic
├── templates/
│   ├── index.html        # Home page
│   ├── converter_page.html  # Dynamic converter pages
│   ├── about.html        # About page
│   ├── pricing.html      # Pricing page
│   ├── contact.html      # Contact page
│   └── ...               # Other pages
├── uploads/              # Temporary upload folder (auto-created)
└── converted/            # Temporary conversion folder (auto-created)
```

## 🔧 Configuration

### Tesseract Path (Windows)
If Tesseract is not in your system PATH, update the path in `app.py`:
```python
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```

### Auto-Cleanup Timer
Files are automatically deleted after 30 minutes. To change this, modify the `cleanup_old_files()` function in `app.py`:
```python
cutoff = now - 1800  # 1800 seconds = 30 minutes
```

## 🌟 Key Technologies

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **UI Framework**: Bootstrap 5
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Outfit)
- **Conversion Libraries**:
  - `pdf2docx` - PDF to Word conversion
  - `PyMuPDF` - PDF manipulation
  - `Pillow` - Image processing
  - `pytesseract` - OCR text extraction
  - `docx2pdf` - Word to PDF conversion

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Home page |
| `/convert/<slug>` | GET | Dynamic converter pages |
| `/ocr/<slug>` | GET | OCR pages |
| `/upload` | POST | Upload and convert files |
| `/status/<task_id>` | GET | Check conversion status |
| `/download/<task_id>` | GET | Download converted file |
| `/download-all` | POST | Download all files as ZIP |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [pdf2docx](https://github.com/dothinking/pdf2docx) - PDF to DOCX conversion
- [PyMuPDF](https://pymupdf.readthedocs.io/) - PDF processing
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) - OCR engine
- [Bootstrap](https://getbootstrap.com/) - UI framework
- [Font Awesome](https://fontawesome.com/) - Icons

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ by the PDFtoWord Team**
