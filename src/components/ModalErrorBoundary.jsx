import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const ModalErrorFallback = (error, retry, errorId) => {
  return (
    <div className="modal-error-container fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="modal-error-content bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">⚠️</div>
          <h2 className="text-xl font-bold text-orange-600 mb-2">
            Modal Error
          </h2>
          <p className="text-gray-600 text-sm">
            This dialog encountered an error and couldn't load properly.
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-orange-800">
            <strong>Error ID:</strong> {errorId}
          </p>
          <p className="text-xs text-orange-700 mt-1">
            You can continue playing - only this dialog is affected.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={retry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ModalErrorBoundary = ({ children, modalName }) => {
  const handleModalError = (error, errorInfo, errorId) => {
    console.error(`Modal Error (${modalName}):`, {
      errorId,
      modalName,
      error,
      errorInfo
    });

    // Don't crash the whole game for modal errors
    if (window.analytics) {
      window.analytics.track('Modal Component Error', {
        errorId,
        modalName,
        errorMessage: error.message,
        errorStack: error.stack
      });
    }
  };

  return (
    <ErrorBoundary
      name={`Modal-${modalName}`}
      fallback={ModalErrorFallback}
      onError={handleModalError}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ModalErrorBoundary;