  import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
  } from "@heroui/react"
  import { useEffect, useState } from "react"
  import { Product } from "../../../../../models/product"
  import { productService, ProductRequest } from "../../../../../services/productService"
  import { addToast } from "@heroui/react"

  interface Props {
    isOpen: boolean
    onClose: () => void
    product: Product | null
    onSaved: () => void
  }

  export default function ProductFormModal({ isOpen, onClose, product, onSaved }: Props) {
    const [form, setForm] = useState<ProductRequest>({
      name: "",
      description: "",
      price: 0,
      discountPct: 0,
      imageUrl: "",
      categoryId: "",
      supplierId: "",
    })

    useEffect(() => {
      if (product) {
        setForm({
          name: product.name,
          description: product.description,
          price: product.price,
          discountPct: product.discountPct,
          imageUrl: product.imageUrl,
          categoryId: "", // Esto debería venir desde el backend
          supplierId: "", // Igual
        })
      } else {
        setForm({
          name: "",
          description: "",
          price: 0,
          discountPct: 0,
          imageUrl: "",
          categoryId: "",
          supplierId: "",
        })
      }
    }, [product])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setForm((prev) => ({
        ...prev,
        [name]: name === "price" || name === "discountPct" ? parseFloat(value) : value,
      }))
    }

    const handleSubmit = async () => {
      try {
        if (product) {
          await productService.update(product.productId, form)
          addToast({ title: "Producto actualizado", color: "success" })
        } else {
          await productService.create(form)
          addToast({ title: "Producto creado", color: "success" })
        }
        onSaved()
        onClose()
      } catch (err: any) {
        addToast({
          title: "Error",
          description: err?.message || "Ocurrió un error",
          color: "danger",
        })
      }
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{product ? "Editar producto" : "Nuevo producto"}</ModalHeader>
          <ModalBody className="space-y-4">
            <Input label="Nombre" name="name" value={form.name} onChange={handleChange} required />
            <Input label="Descripción" name="description" value={form.description} onChange={handleChange} />
            <Input
              label="Precio"
              name="price"
              type="number"
            value={String(form.price)} // o form.price.toString()
              onChange={handleChange}
              required
            />
            <Input
              label="Descuento (%)"
              name="discountPct"
              type="number"
              value={String(form.discountPct)} // o form.discountPct.toString()
              onChange={handleChange}
            />
            <Input label="URL Imagen" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
            <Input label="ID Categoría" name="categoryId" value={form.categoryId} onChange={handleChange} />
            <Input label="ID Proveedor" name="supplierId" value={form.supplierId} onChange={handleChange} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} color="default">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {product ? "Actualizar" : "Guardar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
