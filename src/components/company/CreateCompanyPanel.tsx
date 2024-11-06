import { X } from 'lucide-react';
import { useState } from 'react';

interface CreateCompanyPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CompanyData) => void;
}

interface CompanyData {
  id: string;
  name: string;
  website: string;
  linkedin: string;
  country: string;
  city: string;
  industry: string;
  size: string;
}

const companySizeOptions = [
  { value: '1-10', label: '1-10 employees' },
  { value: '10-25', label: '10-25 employees' },
  { value: '25-50', label: '25-50 employees' },
  { value: '50-100', label: '50-100 employees' },
  { value: '100-500', label: '100-500 employees' },
  { value: '500-1000', label: '500-1000 employees' },
  { value: '1000+', label: '1000+ employees' }
];

export function CreateCompanyPanel({ isOpen, onClose, onSubmit }: CreateCompanyPanelProps) {
  const [formData, setFormData] = useState<CompanyData>({
    id: crypto.randomUUID(),
    name: '',
    website: '',
    linkedin: '',
    country: '',
    city: '',
    industry: '',
    size: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CompanyData, string>>>({});

  const handleChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CompanyData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }
    
    if (formData.website && !formData.website.startsWith('https://')) {
      newErrors.website = 'Website URL must start with https://';
    }
    
    if (formData.linkedin && !formData.linkedin.startsWith('https://')) {
      newErrors.linkedin = 'LinkedIn URL must start with https://';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.size) {
      newErrors.size = 'Company size is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        id: crypto.randomUUID(),
        name: '',
        website: '',
        linkedin: '',
        country: '',
        city: '',
        industry: '',
        size: ''
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl animate-slide-left">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Create a new company</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
                    ${errors.name ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
                  required
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  placeholder="e.g., Technology"
                />
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size<span className="text-red-500">*</span>
                </label>
                <select
                  id="size"
                  value={formData.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                  className={`block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
                    ${errors.size ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
                  required
                >
                  <option value="">Select company size</option>
                  {companySizeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.size && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.size}</p>
                )}
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Website
                </label>
                <input
                  type="url"
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className={`block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
                    ${errors.website ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
                  placeholder="https://example.com"
                />
                {errors.website && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.website}</p>
                )}
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  className={`block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
                    ${errors.linkedin ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
                  placeholder="https://linkedin.com/company/example"
                />
                {errors.linkedin && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.linkedin}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className={`block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
                      ${errors.country ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
                    required
                  />
                  {errors.country && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.country}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className={`block w-full px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200
                      ${errors.city ? 'border-red-300 bg-red-50' : 'border border-gray-300'}`}
                    required
                  />
                  {errors.city && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Create Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}