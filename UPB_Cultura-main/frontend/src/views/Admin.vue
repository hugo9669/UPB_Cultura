import React, { useState } from 'react';
import { Trash2, Plus, Edit2, Users, Calendar, Search } from 'lucide-react';

const AdminView = () => {
  const [grupos, setGrupos] = useState([
    {
      id: 1,
      nombre: 'Coro de la UPB',
      categoria: 'Música',
      coordinador: 'María González',
      miembros: 25,
      activo: true
    },
    {
      id: 2,
      nombre: 'Grupo de Teatro UPB',
      categoria: 'Teatro',
      coordinador: 'Carlos Ramírez',
      miembros: 18,
      activo: true
    },
    {
      id: 3,
      nombre: 'Grupo de Danza UPB',
      categoria: 'Danza',
      coordinador: 'Ana Martínez',
      miembros: 22,
      activo: true
    }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const [nuevoGrupo, setNuevoGrupo] = useState({
    nombre: '',
    categoria: '',
    coordinador: '',
    miembros: 0
  });

  const categorias = ['Música', 'Teatro', 'Danza', 'Artes Plásticas', 'Literatura', 'Cine'];

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setNuevoGrupo({ nombre: '', categoria: '', coordinador: '', miembros: 0 });
    setMostrarModal(true);
  };

  const abrirModalEditar = (grupo) => {
    setModoEdicion(true);
    setGrupoSeleccionado(grupo);
    setNuevoGrupo({
      nombre: grupo.nombre,
      categoria: grupo.categoria,
      coordinador: grupo.coordinador,
      miembros: grupo.miembros
    });
    setMostrarModal(true);
  };

  const crearGrupo = () => {
    if (nuevoGrupo.nombre && nuevoGrupo.categoria && nuevoGrupo.coordinador) {
      const grupo = {
        id: grupos.length + 1,
        ...nuevoGrupo,
        activo: true
      };
      setGrupos([...grupos, grupo]);
      setMostrarModal(false);
      setNuevoGrupo({ nombre: '', categoria: '', coordinador: '', miembros: 0 });
    }
  };

  const actualizarGrupo = () => {
    if (nuevoGrupo.nombre && nuevoGrupo.categoria && nuevoGrupo.coordinador) {
      setGrupos(grupos.map(g =>
        g.id === grupoSeleccionado.id
          ? { ...g, ...nuevoGrupo }
          : g
      ));
      setMostrarModal(false);
      setNuevoGrupo({ nombre: '', categoria: '', coordinador: '', miembros: 0 });
    }
  };

  const eliminarGrupo = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este grupo cultural?')) {
      setGrupos(grupos.filter(g => g.id !== id));
    }
  };

  const toggleEstado = (id) => {
    setGrupos(grupos.map(g =>
      g.id === id ? { ...g, activo: !g.activo } : g
    ));
  };

  const gruposFiltrados = grupos.filter(g =>
    g.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    g.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
    g.coordinador.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administrador</h1>
              <p className="text-gray-600 mt-2">Gestión de Grupos Culturales UPB</p>
            </div>
            <button
              onClick={abrirModalCrear}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center gap-2 shadow-lg"
            >
              <Plus size={20} />
              Crear Nuevo Grupo
            </button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-semibold">Grupos Totales</p>
                  <p className="text-3xl font-bold text-blue-700">{grupos.length}</p>
                </div>
                <Users className="text-blue-600" size={32} />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-semibold">Grupos Activos</p>
                  <p className="text-3xl font-bold text-green-700">
                    {grupos.filter(g => g.activo).length}
                  </p>
                </div>
                <Calendar className="text-green-600" size={32} />
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-semibold">Total Miembros</p>
                  <p className="text-3xl font-bold text-purple-700">
                    {grupos.reduce((sum, g) => sum + g.miembros, 0)}
                  </p>
                </div>
                <Users className="text-purple-600" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar grupos por nombre, categoría o coordinador..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Lista de Grupos */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nombre del Grupo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Categoría</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Coordinador</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Miembros</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {gruposFiltrados.map(grupo => (
                <tr key={grupo.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{grupo.nombre}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {grupo.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{grupo.coordinador}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users size={16} />
                      {grupo.miembros}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleEstado(grupo.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition duration-300 ${
                        grupo.activo
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {grupo.activo ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => abrirModalEditar(grupo)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300"
                        title="Editar grupo"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => eliminarGrupo(grupo.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-300"
                        title="Eliminar grupo"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {gruposFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron grupos culturales</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Crear/Editar */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {modoEdicion ? 'Editar Grupo Cultural' : 'Crear Nuevo Grupo Cultural'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre del Grupo *
                  </label>
                  <input
                    type="text"
                    value={nuevoGrupo.nombre}
                    onChange={(e) => setNuevoGrupo({...nuevoGrupo, nombre: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Coro de la UPB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    value={nuevoGrupo.categoria}
                    onChange={(e) => setNuevoGrupo({...nuevoGrupo, categoria: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Coordinador *
                  </label>
                  <input
                    type="text"
                    value={nuevoGrupo.coordinador}
                    onChange={(e) => setNuevoGrupo({...nuevoGrupo, coordinador: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre del coordinador"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Miembros
                  </label>
                  <input
                    type="number"
                    value={nuevoGrupo.miembros}
                    onChange={(e) => setNuevoGrupo({...nuevoGrupo, miembros: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={modoEdicion ? actualizarGrupo : crearGrupo}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  {modoEdicion ? 'Actualizar' : 'Crear Grupo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
