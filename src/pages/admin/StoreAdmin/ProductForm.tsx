import { useEffect, useState } from 'react';
import axios from 'axios';

type Category = {
  categoryId: string;
  name: string;
};

type Supplier = {
  supplierId: string;
  name: string;
};

const ProductForm = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    discountPct: '',
    imageUrl: '',
    categoryId: '',
    supplierId: '',
    isActive: true
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    axios.get('/api/categories')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setCategories(data);
      })
      .catch(err => {
        console.error("Error al cargar categorías:", err);
        setCategories([]);
      });

    axios.get('/api/suppliers')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setSuppliers(data);
      })
      .catch(err => {
        console.error("Error al cargar proveedores:", err);
        setSuppliers([]);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/api/products', {
        ...form,
        price: parseFloat(form.price),
        discountPct: parseFloat(form.discountPct),
        isActive: true
      });

      alert('✅ Producto registrado correctamente');
      setForm({
        name: '',
        description: '',
        price: '',
        discountPct: '',
        imageUrl: '',
        categoryId: '',
        supplierId: '',
        isActive: true
      });
    } catch (err) {
      console.error(err);
      alert('❌ Error al registrar el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre del producto"
        className="border border-gray-300 px-4 py-2 w-full rounded focus:ring-2 focus:ring-orange-500"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        rows={3}
        className="border border-gray-300 px-4 py-2 w-full rounded focus:ring-2 focus:ring-orange-500"
      />
      <input
        name="price"
        type="number"
        step="0.01"
        value={form.price}
        onChange={handleChange}
        placeholder="Precio"
        className="border border-gray-300 px-4 py-2 w-full rounded focus:ring-2 focus:ring-orange-500"
        required
      />
      <input
        name="discountPct"
        type="number"
        step="0.01"
        value={form.discountPct}
        onChange={handleChange}
        placeholder="Descuento (%)"
        className="border border-gray-300 px-4 py-2 w-full rounded focus:ring-2 focus:ring-orange-500"
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="URL de imagen"
        className="border border-gray-300 px-4 py-2 w-full rounded focus:ring-2 focus:ring-orange-500"
      />

      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        className="border border-gray-300 px-4 py-2 w-full rounded focus:ring-2 focus:ring-orange-500"
        required
      >
        <option value="">
          {categories.length === 0
            ? 'No hay categorías registradas'
            : 'Selecciona una categoría'}
        </option>
        {categories.map((cat) => (
          <option key={cat.categoryId} value={cat.categoryId}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        name="supplierId"
        value={form.supplierId}
        onChange={handleChange}
        className="border border-gray-300 px-4 py-2 w-full rounded focus:ring-2 focus:ring-orange-500"
        required
      >
        <option value="">
          {suppliers.length === 0
            ? 'No hay proveedores registrados'
            : 'Selecciona un proveedor'}
        </option>
        {suppliers.map((sup) => (
          <option key={sup.supplierId} value={sup.supplierId}>
            {sup.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-orange-600 text-white font-medium px-6 py-2 rounded hover:bg-orange-700 transition"
      >
        Guardar producto
      </button>
    </form>
  );
};

export default ProductForm;
