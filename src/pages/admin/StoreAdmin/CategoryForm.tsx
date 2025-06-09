import { useEffect, useState } from 'react';
import axios from 'axios';
import ContainerHeader from '../../../components/Containers/ContainerHeader';
import CatHeader from '../../../assets/cats/cat-catalogo.png';
import { useNavigate } from 'react-router-dom';

type Category = {
  categoryId: string;
  name: string;
};

const CategoryForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error al cargar categorías', err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (editingId) {
        await axios.put(`/api/categories/${editingId}`, { name });
      } else {
        await axios.post('/api/categories', { name });
      }
      setName('');
      setEditingId(null);
      setShowForm(false);
      await loadCategories();
    } catch (err) {
      console.error('Error al guardar categoría', err);
    }
  };

  const handleEdit = (cat: Category) => {
    setName(cat.name);
    setEditingId(cat.categoryId);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('¿Deseas eliminar esta categoría?');
    if (!confirm) return;
    try {
      await axios.delete(`/api/categories/${id}`);
      await loadCategories();
    } catch (err) {
      console.error('Error al eliminar categoría', err);
    }
  };

  const resetForm = () => {
    setName('');
    setEditingId(null);
    setShowForm(false);
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ContainerHeader
        classP="h-[500px] md:h-[480px] xl:h-[440px] items-center"
        childrenLeft={
          <div className="pt-20">
            <h1 className="text-4xl font-bold text-orange-600 mb-4">
              Administración de Categorías
            </h1>
            <p className="text-gray-600 text-lg">
              Busca, gestiona o crea nuevas categorías para la tienda.
            </p>
          </div>
        }
        childrenRight={
          <img
            src={CatHeader}
            alt="Categoría gato"
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
            placeholder="🔍 Buscar categoría"
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
            ➕ Nueva Categoría
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="border border-gray-200 p-4 rounded space-y-3"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre de la categoría"
              className="border border-gray-300 px-4 py-2 w-full rounded focus:ring-2 focus:ring-orange-500"
              required
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
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-4 text-center text-gray-500">
                  No hay categorías registradas.
                </td>
              </tr>
            ) : (
              filteredCategories.map((cat) => (
                <tr key={cat.categoryId} className="border-t">
                  <td className="px-4 py-2">{cat.name}</td>
                  <td className="px-4 py-2 space-x-3">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cat.categoryId)}
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

export default CategoryForm;
