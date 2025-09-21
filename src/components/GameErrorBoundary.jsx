import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const GameErrorFallback = (error, retry, errorId) => {
  const handleSaveProgress = async () => {
    try {
      // Try to save current progress before restarting
      if (window.autoSaveService) {
        await window.autoSaveService.requestCriticalSave();
      }
      console.log('Progress saved before restart');
    } catch (saveError) {
      console.error('Failed to save progress before restart:', saveError);
    }
    window.location.reload();
  };

  const handleReportBug = () => {
    const errorReport = {
      errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      error: error ? error.toString() : 'Unknown error',
      stack: error ? error.stack : 'No stack trace available'
    };

    // Copy to clipboard for easy reporting
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2)).then(() => {
      alert('Error report copied to clipboard! Please paste this in your bug report.');
    });
  };

  return (
    <div className="game-error-container min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="game-error-content bg-black/80 backdrop-blur-sm rounded-lg border border-purple-500/30 p-8 max-w-2xl w-full text-white">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-3xl font-bold text-purple-400 mb-2">
            Game Engine Error
          </h1>
          <p className="text-gray-300">
            ShapeTown encountered an unexpected error. Your progress will be saved before restarting.
          </p>
        </div>

        <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-400 mb-2">What happened?</h3>
          <p className="text-sm text-gray-300 mb-2">
            The game engine crashed, which can happen due to:
          </p>
          <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
            <li>Memory issues with large game scenes</li>
            <li>Graphics driver problems</li>
            <li>Network connectivity issues</li>
            <li>Browser compatibility problems</li>
          </ul>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-200 mb-2">Error Information:</h3>
          <p className="text-sm text-gray-400 mb-2">
            <strong>Error ID:</strong> {errorId}
          </p>
          <p className="text-sm text-gray-400 mb-2">
            <strong>Time:</strong> {new Date().toLocaleString()}
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
              Technical Details
            </summary>
            <pre className="mt-2 text-xs bg-black/50 p-2 rounded overflow-auto max-h-32 text-green-400">
              {error ? error.toString() : 'Unknown error occurred'}
            </pre>
          </details>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleSaveProgress}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            💾 Save & Restart Game
          </button>
          <button
            onClick={handleReportBug}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            📋 Copy Error Report
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Your game progress is automatically saved every few minutes.</p>
          <p>Restarting should restore your recent progress.</p>
        </div>
      </div>
    </div>
  );
};

const GameErrorBoundary = ({ children }) => {
  const handleGameError = (error, errorInfo, errorId) => {
    // Game-specific error handling
    console.error('Game Error Boundary triggered:', {
      errorId,
      error,
      errorInfo,
      gameState: {
        currentScene: window.debugGame?.getCurrentScene()?.scene?.key,
        isAuthenticated: !!localStorage.getItem('accessToken'),
        hasInventory: !!window.inventoryService,
        hasQuestSystem: !!window.questSystem
      }
    });

    // Try to save current state before crash
    if (window.autoSaveService) {
      window.autoSaveService.requestCriticalSave().catch(saveError => {
        console.error('Failed to save on game error:', saveError);
      });
    }

    // Track game errors differently
    if (window.analytics) {
      window.analytics.track('Game Engine Error', {
        errorId,
        errorMessage: error ? (error.message || error.toString()) : 'Unknown error',
        currentScene: window.debugGame?.getCurrentScene()?.scene?.key,
        errorStack: error ? error.stack : 'No stack trace available',
        componentStack: errorInfo ? errorInfo.componentStack : 'No component stack available'
      });
    }
  };

  return (
    <ErrorBoundary
      name="GameEngine"
      critical={true}
      fallback={GameErrorFallback}
      onError={handleGameError}
      supportInfo={{
        email: 'support@shapetown.game'
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default GameErrorBoundary;