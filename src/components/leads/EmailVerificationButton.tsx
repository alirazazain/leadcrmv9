import { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, AlertCircle } from 'lucide-react';

type VerificationStatus = 'safe' | 'unsafe' | 'catchall' | 'unsure';

interface EmailVerificationButtonProps {
  email: string;
}

export function EmailVerificationButton({ email }: EmailVerificationButtonProps) {
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      // Simulate API call with random result
      await new Promise(resolve => setTimeout(resolve, 1500));
      const statuses: VerificationStatus[] = ['safe', 'unsafe', 'catchall', 'unsure'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setStatus(randomStatus);
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'safe':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'unsafe':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'catchall':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'unsure':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'safe':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'unsafe':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'catchall':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'unsure':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="inline-flex items-center">
      {status ? (
        <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="ml-1 capitalize">{status}</span>
        </div>
      ) : (
        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className="text-xs text-indigo-600 hover:text-indigo-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>
      )}
    </div>
  );
}