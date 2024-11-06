import { useState, useRef } from 'react';
import { Building2, Copy, Globe, Linkedin, Camera } from 'lucide-react';
import { ClientActions } from './ClientActions';
import { ClientLabel } from './ClientLabel';
import { Client } from '../../../../store/recruitmentStore';

interface ClientHeaderProps {
  client: Client;
  onImageUpload: (file: File) => void;
  onUpdate: (updatedData: Partial<Client>) => void;
}

export function ClientHeader({ client, onImageUpload, onUpdate }: ClientHeaderProps) {
  const [clientImage, setClientImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopyProfileLink = () => {
    navigator.clipboard.writeText('9848r8hhjrcnfn.jmkmjhxhbch');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  return (
    <div className="flex justify-between">
      {/* Left Section - Company Info */}
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <div className="relative group">
            <div className="h-20 w-20 bg-gray-100 rounded-lg overflow-hidden">
              {clientImage ? (
                <img 
                  src={clientImage} 
                  alt="Client" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-gray-400" />
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Camera className="h-6 w-6 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
            <div className="flex items-center space-x-2">
              {client.linkedin && (
                <a
                  href={client.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-[#0A66C2] hover:text-[#0A66C2]/80 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {client.website && (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
              <ClientLabel client={client} onUpdate={onUpdate} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-500">{client.location}</div>
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-sm text-gray-500">Profile Link:</span>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">9848r8hhjrcnfn.jmkmjhxhbch</code>
              <button
                onClick={handleCopyProfileLink}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                title={copied ? 'Copied!' : 'Copy profile link'}
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Contact Info & Actions */}
      <div className="flex items-start space-x-4">
        <div>
          <div className="flex items-center justify-end space-x-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{client.owner.name} | CEO</h2>
            <span className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
              Primary Contact
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Email Address:</span>
              <a href={`mailto:${client.owner.email}`} className="text-sm text-indigo-600 hover:text-indigo-500">
                {client.owner.email}
              </a>
            </div>
          </div>
        </div>

        <ClientActions client={client} onUpdate={onUpdate} />
      </div>
    </div>
  );
}