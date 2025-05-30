import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  addToast,
  Progress,
} from "@heroui/react";
import { UploadCloud, Trash2 } from "lucide-react";
import { catService } from "../../../../../services/cats";

interface UploadImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  catId: string;
  onUploadSuccess: () => void;
}

export default function UploadImageModal({
  isOpen,
  onClose,
  catId,
  onUploadSuccess,
}: UploadImageModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      // Agrega los archivos sin borrar los existentes
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
      setUploadProgress(prev => ({ ...prev })); // No reseteamos progreso para conservar barras ya existentes
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(prev => {
      const copy = { ...prev };
      const fileToRemove = files[index];
      if (fileToRemove) delete copy[fileToRemove.name];
      return copy;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      addToast({ title: "Error", description: "Selecciona al menos una imagen", color: "danger" });
      return;
    }
    setLoading(true);
    try {
      for (const file of files) {
        await catService.uploadCatPhoto(catId, file, (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress((prev) => ({ ...prev, [file.name]: percentCompleted }));
        });
      }
      addToast({ title: "Éxito", description: "Imágenes subidas correctamente", color: "success" });
      onUploadSuccess();
      onClose();
      setFiles([]);
      setUploadProgress({});
    } catch (error: any) {
      addToast({
        title: "Error",
        description: error?.message || "Error subiendo las imágenes",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { setFiles([]); setUploadProgress({}); onClose(); }}>
      <ModalContent className="max-w-md">
        <ModalHeader>Subir imágenes del gato</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <Input
            type="file"
            label="Selecciona imágenes"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            isDisabled={loading}
            startContent={<UploadCloud className="text-2xl text-default-400" />}
          />

          {files.length > 0 && (
            <div className="flex flex-col gap-4 max-h-60 overflow-auto mt-2">
              {files.map((file, i) => (
                <div key={file.name} className="flex items-center gap-4">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${i}`}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <Progress
                      value={uploadProgress[file.name] || 0}
                      color="primary"
                      size="sm"
                      aria-label={`Progreso subida ${file.name}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(i)}
                    aria-label="Eliminar imagen"
                    className="p-1 rounded hover:bg-gray-200 cursor-pointer"
                  >
                    <Trash2 className="text-red-400" size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onClick={() => { setFiles([]); setUploadProgress({}); onClose(); }} isDisabled={loading}>
            Cancelar
          </Button>
          <Button color="primary" onClick={handleUpload} isDisabled={loading}>
            Subir imágenes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
