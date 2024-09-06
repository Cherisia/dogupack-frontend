'use client'

import {useEffect, useRef, useState} from "react";

export default function imageConverter() {

    const dropzone = useRef();
    const fileInput = useRef();
    const fileList = useRef();
    const [items, setItems] = useState([]);

    const dropzoneClick = () => {
        fileInput.current.click();
    };

    const handleFiles = (files) => {
        for (const file of files) {
            let copy = [...items];

        }
    }

    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    useEffect(() => {

        dropzone.current.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.current.classList.add('border-blue-500', 'border-2');
        })
        dropzone.current.addEventListener('dragleave', () => {
            dropzone.current.classList.remove('border-blue-500', 'border-2');
        });

        dropzone.current.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.current.classList.remove('border-blue-500', 'border-2');

            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        fileInput.current.addEventListener('change', (e) => {
            const files = e.target.files;
            handleFiles(files);
        });

    }, []);

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center p-3">
            <div className="w-full max-w-md p-9 bg-white rounded-lg shadow-lg">
                <h1 className="text-center text-2xl sm:text-2xl font-semibold mb-4 text-gray-800">File Drop and
                    Upload</h1>
                <div
                    className="bg-gray-100 p-8 text-center rounded-lg border-dashed border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                    ref={dropzone}>
                    <label onClick={dropzoneClick} className="cursor-pointer flex flex-col items-center space-y-2">
                        <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span className="text-gray-600">Drag and drop your files here</span>
                        <span className="text-gray-500 text-sm">(or click to select)</span>
                    </label>
                    <input type="file" className="hidden" ref={fileInput} multiple/>
                </div>
                <div className="mt-6 text-center" ref={fileList}></div>
                {
                    items.map((item, index) => {
                        return (
                            <div>{item} : {formatBytes(item.size)}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}
