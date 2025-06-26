import { useEffect, useState } from "react";
import GenericTable, { Column } from "../../../components/Tables/GenericTable";
import { productService } from "../../../services/productService";
import { Product } from "../../../models/product";
import { Button, Switch, addToast } from "@heroui/react";
import ProductDetailModal from "./components/Modals/ProductDetailModal";
import ProductFormModal from "./components/Modals/ProductFormModal";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const products = await productService.getAll();
      setProducts(products);
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleVisibility = async (productId: string, isVisible: boolean) => {
    try {
      await productService.updateVisibility(productId, isVisible);
      fetchProducts();
      addToast({
        title: "Visibilidad actualizada",
        description: `El producto ahora está ${isVisible ? "visible" : "oculto"} en el catálogo.`,
        color: "success",
      });
    } catch (err) {
      addToast({
        title: "Error",
        description: "No se pudo actualizar la visibilidad.",
        color: "danger",
      });
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
    try {
      await productService.delete(productId);
      fetchProducts();
      addToast({
        title: "Producto eliminado",
        description: "El producto fue eliminado correctamente.",
        color: "success",
      });
    } catch (err) {
      addToast({
        title: "Error",
        description: "No se pudo eliminar el producto.",
        color: "danger",
      });
    }
  };

  const openDetailModal = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setShowFormModal(true);
  };

  const openCreateModal = () => {
    setSelectedProduct(null);
    setShowFormModal(true);
  };

  const closeModals = () => {
    setSelectedProduct(null);
    setShowDetailModal(false);
    setShowFormModal(false);
  };

  const columns: Column<Product>[] = [
    { name: "Nombre", uid: "name" },
    { name: "Precio", uid: "price" },
    { name: "Descuento", uid: "discountPct" },
    { name: "Categoría", uid: "categoryName" },
    { name: "Proveedor", uid: "supplierName" },
    {
      name: "Visible",
      uid: "isActive",
      render: (product) => (
        <Switch
          isSelected={product.isActive}
          onChange={() => handleToggleVisibility(product.productId, !product.isActive)}
          size="sm"
        />
      ),
    },
    {
      name: "Acciones",
      uid: "actions",
      render: (product) => (
        <div className="flex gap-2">
          <Button size="sm" onPress={() => openDetailModal(product)}>Ver</Button>
          <Button size="sm" color="primary" onPress={() => openEditModal(product)}>Editar</Button>
          <Button size="sm" color="danger" onPress={() => handleDelete(product.productId)}>Eliminar</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Gestión de Productos</h1>
      <Button color="success" onPress={openCreateModal} className="mb-4">
        + Nuevo producto
      </Button>

      <GenericTable<Product>
        columns={columns}
        data={products}
        filterKeys={["name", "categoryName", "supplierName"]}
        initialVisibleColumns={[
          "name",
          "price",
          "discountPct",
          "categoryName",
          "supplierName",
          "isActive",
          "actions",
        ]}
      />

      <ProductDetailModal
        isOpen={showDetailModal}
        onClose={closeModals}
        product={selectedProduct}
      />

      <ProductFormModal
        isOpen={showFormModal}
        onClose={closeModals}
        product={selectedProduct}
        onSaved={fetchProducts}
      />
    </div>
  );
}