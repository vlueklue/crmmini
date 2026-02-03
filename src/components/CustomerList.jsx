import React from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

function CustomerList({ customers, setCustomers, prospects = [] }) {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filterStatus, setFilterStatus] = React.useState('all');
    const [showAddForm, setShowAddForm] = React.useState(false);

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleAddCustomer = (customerData) => {
        const newCustomer = {
            id: customers.length + 1,
            ...customerData,
            lastContact: new Date().toISOString().split('T')[0]
        };
        setCustomers([...customers, newCustomer]);
        setShowAddForm(false);
    };

    return (
        <div className="space-y-6" data-name="customer-list" data-file="components/CustomerList.jsx">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Clientes</h2>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="btn-primary flex items-center"
                >
                    <Plus className="text-lg mr-2 w-5 h-5" />
                    Agregar Cliente
                </button>
            </div>

            {/* Filters */}
            <div className="card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-secondary)] w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar clientes..."
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
                            <option value="Prospección">Prospección</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            <option value="Perdido">Perdido</option>
                        </select>
                    </div>

                    <div className="text-sm text-[var(--text-secondary)]">
                        Mostrando {filteredCustomers.length} de {customers.length} clientes
                    </div>
                </div>
            </div>

            {/* Customer Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Empresa</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Valor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Último Contacto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredCustomers.map(customer => (
                                <tr key={customer.id} className="table-hover">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center mr-3">
                                                <span className="text-white font-medium text-sm">
                                                    {customer.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-[var(--text-primary)]">{customer.name}</div>
                                                <div className="text-sm text-[var(--text-secondary)]">{customer.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                                        {customer.company}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`status-badge ${customer.status === 'Activo' ? 'status-active' :
                                            customer.status === 'Inactivo' ? 'status-inactive' :
                                                'status-pending'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[var(--text-primary)]">
                                        ${customer.value.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary)]">
                                        {new Date(customer.lastContact).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center space-x-2">
                                            <button className="text-[var(--primary-color)] icon-hover">
                                                <Edit className="text-lg w-5 h-5" />
                                            </button>
                                            <button className="text-[var(--danger-color)] icon-hover hover:text-red-700">
                                                <Trash2 className="text-lg w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Customer Modal */}
            {showAddForm && (
                <AddCustomerModal
                    onSave={handleAddCustomer}
                    onCancel={() => setShowAddForm(false)}
                    prospects={prospects}
                />
            )}
        </div>
    );
}

function AddCustomerModal({ onSave, onCancel, prospects }) {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        status: 'Activo',
        value: 0
    });

    const [selectedProspectId, setSelectedProspectId] = React.useState('');

    const handleProspectChange = (e) => {
        const prospectId = e.target.value;
        setSelectedProspectId(prospectId);

        if (prospectId) {
            const prospect = prospects.find(p => p.id === parseInt(prospectId));
            if (prospect) {
                setFormData({
                    ...formData,
                    name: prospect.name,
                    email: prospect.email,
                    company: prospect.company,
                    phone: prospect.phone,
                    value: prospect.value || 0
                });
            }
        } else {
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                status: 'Activo',
                value: 0
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'value' ? Number(value) : value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm" data-name="add-customer-modal" data-file="components/CustomerList.jsx">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-[var(--border-color)]">
                <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Cliente</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Seleccionar Prospecto
                        </label>
                        <select
                            value={selectedProspectId}
                            onChange={handleProspectChange}
                            className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                        >
                            <option value="">-- Seleccionar --</option>
                            {prospects.map(prospect => (
                                <option key={prospect.id} value={prospect.id}>
                                    {prospect.name} - {prospect.company}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Read-only preview fields */}
                    {selectedProspectId && (
                        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)]">Nombre</label>
                                <p className="text-sm font-medium">{formData.name}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)]">Empresa</label>
                                <p className="text-sm font-medium">{formData.company}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[var(--text-secondary)]">Correo</label>
                                <p className="text-sm font-medium">{formData.email}</p>
                            </div>
                        </div>
                    )}

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
                            <option value="Prospección">Prospección</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            <option value="Perdido">Perdido</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                            Valor ($)
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
                            disabled={!selectedProspectId}
                        >
                            Agregar Cliente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CustomerList;
