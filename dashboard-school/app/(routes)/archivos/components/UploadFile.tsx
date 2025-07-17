"use client";

import React, { useState } from "react";
import axios from "axios";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      // Add a null check here
      formData.append("file", file);
    }

    try {
      const res = await axios.post("/api/archivos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Subir archivo</button>
    </form>
  );
}
