import { useEffect, useState } from 'react';
import axios from 'axios';
import ContainerHeader from '../../../components/Containers/ContainerHeader';
import CatHeader from '../../../assets/cats/cat-catalogo.png';
import { useNavigate } from 'react-router-dom';

type Supplier = {
  supplierId: string;
  name: string;
  contactInfo: string;
};

const SupplierForm = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', contactInfo: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadSuppliers = async () => {
    try {
      const res = await axios.get('/api/suppliers');
      setSuppliers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error al cargar proveedores', err);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      if (editingId) {
        await axios.put(`/api/suppliers/${editingId}`, form);
      } else {
        await axios.post('/api/suppliers', form);
      }

      setForm({ name: '', contactInfo: '' });
      setEditingId(null);
      setShowForm(false);
      await loadSuppliers();
    } catch (err) {
      console.error('Error al guardar proveedor', err);
    }
  };

  const handleEdit = (s: Supplier) => {
    setForm({ name: s.name, contactInfo: s.contactInfo });
    setEditingId(s.supplierId);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('¿Eliminar este proveedor?');
    if (!confirm) return;
    try {
      await axios.delete(`/api/suppliers/${id}`);
      await loadSuppliers();
    } catch (err) {
      console.error('Error al eliminar proveedor', err);
    }
  };

  const resetForm = () => {
    setForm({ name: '', contactInfo: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <>
      <ContainerHeader
        classP="h-[500px] md:h-[480px] xl:h-[440px] items-center"
        childrenLeft={
          <div className="pt-20">
            <h1 className="text-4xl font-bold text-orange-600 mb-4">
              Administración de Proveedores
            </h1>
            <p className="text-gray-600 text-lg">
              Registra, edita o elimina proveedores de productos.
            </p>
          </div>
        }
        childrenRight={
          <img
            src={CatHeader}
            alt="Gato proveedor"
            className="w-[300px] h-auto object-contain drop-shadow-md"
          />
        }
      />

      <section className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <button
          onClick={() => navigate('/admin')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          ⬅️ Volver al Panel Principal
        </button>

        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="🔍 Buscar proveedor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 flex-1 rounded focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            ➕ Nuevo Proveedor
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="border border-gray-200 p-4 rounded space-y-3"
          >
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nombre del proveedor"
              className="border border-gray-300 px-4 py-2 w-full rounded focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              value={form.contactInfo}
              onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
              placeholder="Información de contacto"
              className="border border-gray-300 px-4 py-2 w-full rounded focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editingId ? 'Actualizar' : 'Guardar'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <table className="w-full border border-gray-200 mt-4">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Contacto</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                  No hay proveedores registrados.
                </td>
              </tr>
            ) : (
              filteredSuppliers.map((s) => (
                <tr key={s.supplierId} className="border-t">
                  <td className="px-4 py-2">{s.name}</td>
                  <td className="px-4 py-2">{s.contactInfo}</td>
                  <td className="px-4 py-2 space-x-3">
                    <button
                      onClick={() => handleEdit(s)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(s.supplierId)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default SupplierForm;
