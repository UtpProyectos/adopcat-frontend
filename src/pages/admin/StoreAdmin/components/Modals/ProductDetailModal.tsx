import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Image,
} from "@heroui/react"
import { Product } from "../../../../../models/product"

interface Props {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export default function ProductDetailModal({ isOpen, onClose, product }: Props) {
  if (!product) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Detalle del Producto</ModalHeader>
        <ModalBody className="space-y-6 text-gray-800">
          <div className="flex flex-col md:flex-row gap-6">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              className="rounded-xl border shadow"
            />
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p><strong>Precio:</strong> S/. {product.price.toFixed(2)}</p>
              <p><strong>Descuento:</strong> {product.discountPct}%</p>
              <p><strong>Categoría:</strong> {product.categoryName}</p>
              <p><strong>Proveedor:</strong> {product.supplierName}</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
