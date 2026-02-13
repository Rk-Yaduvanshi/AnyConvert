const fileInput = document.getElementById('file-input');
const uploadStage = document.getElementById('upload-stage');
const batchStage = document.getElementById('batch-stage');
const fileList = document.getElementById('file-list');
const convertAllBtn = document.getElementById('convert-all-btn');
const globalFormat = document.getElementById('global-format');
const dropZone = document.getElementById('drop-zone');

let selectedFiles = [];
let currentTaskIds = [];

// Drag and Drop
if (dropZone) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('drag-active'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-active'), false);
    });

    dropZone.addEventListener('drop', handleDrop, false);
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
        addFilesToList(Array.from(files));
    }
}

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        addFilesToList(Array.from(e.target.files));
    }
});

function addFilesToList(files) {
    selectedFiles = [...selectedFiles, ...files];
    uploadStage.style.display = 'none';
    batchStage.style.display = 'block';
    renderFileList();
}

function renderFileList() {
    fileList.innerHTML = '';
    selectedFiles.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'file-item';
        item.innerHTML = `
            <div class="file-name">
                <i class="far fa-file-alt"></i>
                <span>${file.name}</span>
            </div>
            <div class="file-size">${(file.size / 1024 / 1024).toFixed(2)} MB</div>
            <div class="file-actions" id="status-${index}">
                <span class="badge bg-light text-dark border p-2 px-3 rounded-pill fw-bold">Ready</span>
            </div>
        `;
        fileList.appendChild(item);
    });
}

convertAllBtn.addEventListener('click', async () => {
    const format = globalFormat.value;
    const formData = new FormData();

    selectedFiles.forEach(file => {
        formData.append('files[]', file);
    });
    formData.append('target_format', format);

    convertAllBtn.disabled = true;
    convertAllBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Processing...';

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const tasks = await response.json();
        currentTaskIds = tasks.map(t => t.task_id);

        // Start tracking each task
        tasks.forEach((task, index) => {
            trackTask(task.task_id, index);
        });

    } catch (error) {
        alert('Error starting conversion');
        convertAllBtn.disabled = false;
        convertAllBtn.textContent = 'Convert All';
    }
});

async function trackTask(taskId, index) {
    const statusEl = document.getElementById(`status-${index}`);

    const poll = setInterval(async () => {
        try {
            const response = await fetch(`/status/${taskId}`);
            const data = await response.json();

            if (data.status === 'processing') {
                statusEl.innerHTML = `
                    <div class="d-flex align-items-center gap-2">
                        <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
                        <span class="small fw-bold text-primary">Converting...</span>
                    </div>
                `;
            } else if (data.status === 'completed') {
                clearInterval(poll);
                statusEl.innerHTML = `
                    <a href="/download/${taskId}" class="status-completed text-decoration-none shadow-sm">
                        <i class="fas fa-download me-1"></i> Download
                    </a>
                `;
                checkAllTasksDone();
            } else if (data.status === 'error') {
                clearInterval(poll);
                statusEl.innerHTML = `<span class="status-error">Error: ${data.message || 'Failed'}</span>`;
                checkAllTasksDone();
            }
        } catch (e) {
            console.error(e);
        }
    }, 2000);
}

function checkAllTasksDone() {
    const statuses = document.querySelectorAll('.file-actions');
    const allCompletedCount = Array.from(statuses).filter(el => el.querySelector('.status-completed')).length;
    const allSettled = Array.from(statuses).every(el =>
        el.querySelector('.status-completed') || el.querySelector('.status-error')
    );

    if (allSettled) {
        convertAllBtn.disabled = false;
        convertAllBtn.innerHTML = 'Converted! <i class="fas fa-check ms-2"></i>';

        if (allCompletedCount > 1) {
            if (downloadAllBtn) {
                downloadAllBtn.style.display = 'inline-block';
            }
        }
    }
}

const downloadAllBtn = document.getElementById('download-all-btn');
if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', async () => {
        const response = await fetch('/download-all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_ids: currentTaskIds
            })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `PDFFlow_All_Files.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        } else {
            alert('Failed to generate ZIP file.');
        }
    });
}

function resetToUpload() {
    uploadStage.style.display = 'flex';
    batchStage.style.display = 'none';
    selectedFiles = [];
    fileInput.value = '';
}

// Mobile Menu Logic
const mobileToggle = document.getElementById('mobile-toggle');
const closeBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileToggle && closeBtn && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    document.querySelectorAll('.mobile-menu-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}