import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Plus, UserPlus } from 'lucide-react';

function ProspectList({ prospects = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        status: 'Nuevo Prospecto',
        value: '',
        phone: ''
    });

    const filteredProspects = prospects.filter(prospect => {
        const matchesSearch = prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prospect.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prospect.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || prospect.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically add the prospect to the state/backend
        console.log('New prospect:', formData);
        setShowAddForm(false);
        setFormData({
            name: '',
            email: '',
            company: '',
            status: 'active',
            value: '',
            phone: ''
        });
    };

    const onCancel = () => {
        setShowAddForm(false);
        setFormData({
            name: '',
            email: '',
            company: '',
            status: 'active',
            value: '',
            phone: ''
        });
    }

    return (
        <div className="space-y-6" data-name="prospect-list" data-file="components/ProspectList.jsx">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Prospectos</h2>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="btn-primary flex items-center"
                >
                    <UserPlus className="text-lg mr-2 w-5 h-5" />
                    Agregar Prospecto
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-[var(--border-color)] shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar prospectos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10 pr-4"
                        />
                    </div>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="input-field px-4 py-2"
                    >
                        <option value="all">Todos los Estados</option>
                        <option value="Nuevo Prospecto">Nuevo Prospecto</option>
                        <option value="Calificado">Calificado</option>
                        <option value="Contactado">Contactado</option>
                        <option value="Propuesta">Propuesta</option>
                        <option value="En Negociación">En Negociación</option>
                        <option value="Ganado">Ganado</option>
                        <option value="Perdido">Perdido</option>
                    </select>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center">
                        <Filter className="w-4 h-4 mr-2" />
                        <span>Filtros Activos: {filterStatus === 'all' ? 'Ninguno' : filterStatus}</span>
                    </div>
                    <div className="text-sm text-[var(--text-secondary)]">
                        Mostrando {filteredProspects.length} de {prospects.length} prospectos
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-[var(--border-color)] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Prospecto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Empresa</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Valor Estimado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Último Contacto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProspects.map((prospect) => (
                                <tr key={prospect.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-[var(--primary-color)] font-bold">
                                                {prospect.name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-[var(--text-primary)]">{prospect.name}</div>
                                                <div className="text-sm text-[var(--text-secondary)]">{prospect.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-[var(--text-primary)]">{prospect.company}</div>
                                        <div className="text-sm text-[var(--text-secondary)]">{prospect.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`status-badge ${prospect.status === 'Ganado' || prospect.status === 'Calificado' ? 'status-active' :
                                            prospect.status === 'Perdido' ? 'status-inactive' :
                                                'status-pending'
                                            }`}>
                                            {prospect.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">
                                        ${prospect.value?.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                                        {prospect.lastContact}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Prospect Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm" data-name="add-prospect-modal" data-file="components/ProspectList.jsx">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-[var(--border-color)]">
                        <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Prospecto</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Empresa
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Estado
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                                >
                                    <option value="Nuevo Prospecto">Nuevo Prospecto</option>
                                    <option value="Calificado">Calificado</option>
                                    <option value="Contactado">Contactado</option>
                                    <option value="Propuesta">Propuesta</option>
                                    <option value="En Negociación">En Negociación</option>
                                    <option value="Ganado">Ganado</option>
                                    <option value="Perdido">Perdido</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                    Valor Estimado ($)
                                </label>
                                <input
                                    type="number"
                                    name="value"
                                    value={formData.value}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="btn-secondary"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary"
                                >
                                    Agregar Prospecto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProspectList;
