
import React from 'react';
import { Button } from './ui/button';

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Có',
  cancelText = 'Không',
  showCancel = true
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-sm w-full animate-fadeIn">
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
          <p className="text-gray-600 text-center mb-6">{message}</p>
          
          <div className={`flex space-x-3 ${showCancel ? '' : 'justify-center'}`}>
            {showCancel && onCancel && (
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                {cancelText}
              </Button>
            )}
            <Button
              onClick={onConfirm}
              className={`bg-ushi-red-600 hover:bg-ushi-red-700 text-white ${showCancel ? 'flex-1' : 'px-8'}`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
