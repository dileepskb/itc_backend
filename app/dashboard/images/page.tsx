"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryImage {
  name: string;
  url: string;
}


export default function GalleryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();

    setImages(data);
  };

useEffect(() => {
  const loadImages = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();

    setImages(data);
  };

  loadImages();
}, []);

  const handleUpload = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    const res = await fetch("/api/gallery", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setFile(null);
      fetchImages();
    }

    setLoading(false);
  };


console.log(images)

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-5">
        Gallery Upload
      </h1>

      <form
        onSubmit={handleUpload}
        className="flex gap-3 mb-8"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Preview</th>
            <th className="border p-2">File Name</th>
          </tr>
        </thead>

        <tbody>
          {images.map((img:any, index) => (
            <tr key={index}>
              <td className="border p-2">
                <Image
                  src={img.imageUrl}
                  alt={img.id}
                  width={80}
                  height={80}
                  className="rounded"
                />
              </td>

              <td className="border p-2">
                {img.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}