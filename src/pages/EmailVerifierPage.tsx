import { useState } from 'react';
import { Upload, X, AlertCircle, CheckCircle2, Mail, Search, Building2, Linkedin, Plus, UserPlus } from 'lucide-react';
import { isValidEmail } from '../utils/validation';
import { mockCompanies } from '../data/mockCompanies';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import { ErrorDialog } from '../components/common/ErrorDialog';
import { AddToCompanyPanel } from '../components/leads/AddToCompanyPanel';

interface PersonResult {
  name: string;
  email: string[];
  phone: string[];
  company: string;
  designation: string;
  location: string;
  about: string;
  linkedin?: string;
}

interface BusinessResult {
  name: string;
  industry: string;
  size: string;
  location: string;
  website?: string;
  linkedin?: string;
  people?: Array<{
    name: string;
    email: string[];
    phone: string[];
    designation: string;
    linkedin?: string;
  }>;
}

interface EmailVerificationResult {
  email: string;
  status: 'safe' | 'unsafe' | 'catchall' | 'unsure';
}

export function EmailVerifierPage() {
  // Lead Finder States
  const [activeTab, setActiveTab] = useState<'people' | 'business'>('people');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [personResult, setPersonResult] = useState<PersonResult | null>(null);
  const [businessResult, setBusinessResult] = useState<BusinessResult | null>(null);
  const [showAddToCompany, setShowAddToCompany] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showError, setShowError] = useState(false);
  const [verificationResults, setVerificationResults] = useState<Record<string, EmailVerificationResult>>({});

  // Email Verifier States
  const [manualEmails, setManualEmails] = useState('');
  const [bulkVerificationResults, setbulkVerificationResults] = useState<Array<{
    email: string;
    status: 'valid' | 'invalid';
    message?: string;
  }>>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFindPerson = () => {
    // Mock person search result
    setPersonResult({
      name: "John Doe",
      email: ["john.doe@example.com", "john.d@personal.com"],
      phone: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      company: "Example Corp",
      designation: "Senior Software Engineer",
      location: "San Francisco, CA",
      about: "Experienced software engineer with 10+ years in full-stack development. Previously worked at Google and Microsoft.",
      linkedin: "https://linkedin.com/in/johndoe"
    });
  };

  const handleFindBusiness = () => {
    // Mock business search result
    setBusinessResult({
      name: "Example Corp",
      industry: "Technology",
      size: "1000+",
      location: "San Francisco, CA",
      website: "https://example.com",
      linkedin: "https://linkedin.com/company/example",
      people: [
        {
          name: "Jane Smith",
          email: ["jane.smith@example.com"],
          phone: ["+1 (555) 234-5678"],
          designation: "CEO",
          linkedin: "https://linkedin.com/in/janesmith"
        },
        {
          name: "Mike Johnson",
          email: ["mike.j@example.com"],
          phone: ["+1 (555) 345-6789"],
          designation: "CTO",
          linkedin: "https://linkedin.com/in/mikej"
        }
      ]
    });
  };

  const handleVerifyEmail = async (email: string) => {
    // Mock email verification
    const statuses: Array<'safe' | 'unsafe' | 'catchall' | 'unsure'> = ['safe', 'unsafe', 'catchall', 'unsure'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    setVerificationResults(prev => ({
      ...prev,
      [email]: {
        email,
        status: randomStatus
      }
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'unsafe':
        return <X className="h-4 w-4 text-red-500" />;
      case 'catchall':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'unsure':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const handleManualVerify = () => {
    const emails = manualEmails
      .split(/[\s,;]+/)
      .map(email => email.trim())
      .filter(Boolean);

    const results = emails.map(email => ({
      email,
      status: isValidEmail(email) ? 'valid' : 'invalid' as 'valid' | 'invalid',
      message: isValidEmail(email) 
        ? 'Email format is valid' 
        : 'Invalid email format'
    }));

    setbulkVerificationResults(results);
  };

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Find & Verify</h1>
        <p className="mt-1 text-sm text-gray-500">Find leads and verify email addresses</p>
      </div>

      {/* Lead Finder Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Lead Finder</h2>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('people')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'people'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Find People
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'business'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Find Business
              </button>
            </nav>
          </div>

          {/* Search Inputs */}
          <div className="space-y-6">
            {activeTab === 'people' && (
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn Profile URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="linkedin"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <button
                    onClick={handleFindPerson}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Find Person
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'business' && (
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Business Website URL
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="website"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="https://example.com"
                    />
                  </div>
                  <button
                    onClick={handleFindBusiness}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Find Business
                  </button>
                </div>
              </div>
            )}

            {/* Results Section */}
            {personResult && activeTab === 'people' && (
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{personResult.name}</h3>
                    <p className="text-gray-600">{personResult.designation} at {personResult.company}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowAddToCompany(true)}
                      className="inline-flex items-center px-3 py-1.5 text-sm text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                    >
                      <UserPlus className="h-4 w-4 mr-1.5" />
                      Add to Company
                    </button>
                    {personResult.linkedin && (
                      <a
                        href={personResult.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Email Addresses</h4>
                    <div className="mt-2 space-y-2">
                      {personResult.email.map((email, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-900">{email}</span>
                          <div className="flex items-center space-x-2">
                            {verificationResults[email] && (
                              <span className="flex items-center">
                                {getStatusIcon(verificationResults[email].status)}
                              </span>
                            )}
                            <button
                              onClick={() => handleVerifyEmail(email)}
                              className="text-xs text-indigo-600 hover:text-indigo-500"
                            >
                              Verify
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Phone Numbers</h4>
                    <div className="mt-2 space-y-2">
                      {personResult.phone.map((phone, index) => (
                        <div key={index} className="text-sm text-gray-900">{phone}</div>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-700">Location</h4>
                    <p className="mt-2 text-sm text-gray-900">{personResult.location}</p>
                  </div>

                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-700">About</h4>
                    <p className="mt-2 text-sm text-gray-900">{personResult.about}</p>
                  </div>
                </div>
              </div>
            )}

            {businessResult && activeTab === 'business' && (
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{businessResult.name}</h3>
                    <p className="text-gray-600">{businessResult.industry} · {businessResult.size} employees</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const exists = mockCompanies.some(c => 
                          c.name.toLowerCase() === businessResult.name.toLowerCase()
                        );
                        
                        if (exists) {
                          setShowError(true);
                        } else {
                          setShowConfirmation(true);
                        }
                      }}
                      className="inline-flex items-center px-3 py-1.5 text-sm text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      Create Company
                    </button>
                    {businessResult.website && (
                      <a
                        href={businessResult.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        <Building2 className="h-5 w-5" />
                      </a>
                    )}
                    {businessResult.linkedin && (
                      <a
                        href={businessResult.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Key People</h4>
                  <div className="space-y-4">
                    {businessResult.people?.map((person, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900">{person.name}</h5>
                            <p className="text-sm text-gray-600">{person.designation}</p>
                          </div>
                          {person.linkedin && (
                            <a
                              href={person.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-500"
                            >
                              <Linkedin className="h-5 w-5" />
                            </a>
                          )}
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-xs font-medium text-gray-500">Email Addresses</h6>
                            <div className="mt-1 space-y-1">
                              {person.email.map((email, emailIndex) => (
                                <div key={emailIndex} className="flex items-center justify-between">
                                  <span className="text-sm text-gray-900">{email}</span>
                                  <div className="flex items-center space-x-2">
                                    {verificationResults[email] && (
                                      <span className="flex items-center">
                                        {getStatusIcon(verificationResults[email].status)}
                                      </span>
                                    )}
                                    <button
                                      onClick={() => handleVerifyEmail(email)}
                                      className="text-xs text-indigo-600 hover:text-indigo-500"
                                    >
                                      Verify
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h6 className="text-xs font-medium text-gray-500">Phone Numbers</h6>
                            <div className="mt-1 space-y-1">
                              {person.phone.map((phone, phoneIndex) => (
                                <div key={phoneIndex} className="text-sm text-gray-900">{phone}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email Verifier Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Email Verifier</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Manual Verification */}
            <div className="space-y-4">
              <div>
                <label htmlFor="emails" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Email Addresses
                </label>
                <div className="relative">
                  <textarea
                    id="emails"
                    rows={6}
                    value={manualEmails}
                    onChange={(e) => setManualEmails(e.target.value)}
                    placeholder="Enter emails separated by commas, spaces, or new lines"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                  {manualEmails && (
                    <button
                      onClick={() => setManualEmails('')}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-gray-500">
                  Example: email@example.com, another@example.com
                </p>
              </div>

              <button
                onClick={handleManualVerify}
                disabled={!manualEmails.trim()}
                className="w-full flex justify-center items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="h-4 w-4 mr-2" />
                Verify Emails
              </button>

              {bulkVerificationResults.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-medium text-gray-900">Results</h3>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {bulkVerificationResults.map((result, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-lg ${
                          result.status === 'valid' ? 'bg-green-50' : 'bg-red-50'
                        }`}
                      >
                        {result.status === 'valid' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <div>
                          <p className={`text-sm font-medium ${
                            result.status === 'valid' ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {result.email}
                          </p>
                          <p className={`text-xs ${
                            result.status === 'valid' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {result.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bulk Verification */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file && (file.type === 'text/csv' || file.type.includes('spreadsheet'))) {
                  handleFileUpload(file);
                }
              }}
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-500'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Upload className={`h-10 w-10 ${
                    isDragging ? 'text-indigo-500' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedFile ? selectedFile.name : 'Drop your file here'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports CSV and Excel files
                  </p>
                </div>
                <div className="flex justify-center">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Browse Files
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <AddToCompanyPanel
        isOpen={showAddToCompany}
        onClose={() => setShowAddToCompany(false)}
        person={personResult}
      />

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Add to Companies"
        message="Do you want to add this business to your companies?"
        onConfirm={() => {
          const newCompany = {
            id: crypto.randomUUID(),
            name: businessResult!.name,
            location: businessResult!.location || '',
            website: businessResult!.website,
            linkedin: businessResult!.linkedin,
            industry: businessResult!.industry,
            size: businessResult!.size,
            people: businessResult!.people?.map(person => ({
              id: crypto.randomUUID(),
              name: person.name,
              email: person.email,
              designation: person.designation,
              phoneNumbers: person.phone,
              linkedin: person.linkedin
            })) || []
          };
          mockCompanies.push(newCompany);
          setShowConfirmation(false);
        }}
      />

      <ErrorDialog
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Company Already Exists"
        message="This company already exists in your companies list."
      />
    </div>
  );
}