# Auto-Save Service

The Auto-Save Service provides intelligent, event-driven game state persistence to replace the old interval-based auto-save system.

## Features

### 🎯 Smart Save Triggers
- **Debounced saves**: Triggers after 5 seconds of inactivity (most common)
- **Throttled saves**: Maximum once per 30 seconds for frequent events
- **Critical saves**: Immediate saves for important events
- **Fallback saves**: Every 5 minutes as backup

### 📡 Event-Driven Architecture
The service automatically responds to game events:
- `global-inventory-changed` → Debounced save
- `inventory-synced` → Debounced save
- `scene-changed` → Critical save
- `quest-started/completed/progress` → Context-appropriate save

### 🔄 Resilient Operation
- **Queue system**: Failed saves are queued for retry
- **Network error handling**: Automatically retries network failures
- **Page visibility**: Saves when tab becomes hidden
- **Graceful shutdown**: Cleanup on logout/page unload

## Usage

The service is automatically initialized in `PhaserGame.jsx` when a user authenticates:

```javascript
import { autoSaveService } from '../services/auto-save-service';

// Automatic initialization
useEffect(() => {
  if (isAuthenticated && user?.data?.user?.id) {
    autoSaveService.initialize(user, sceneManager);
  } else {
    autoSaveService.shutdown();
  }
}, [isAuthenticated, user]);
```

## Manual Controls

For debugging and testing:

```javascript
// Access via global object
window.autoSaveService.getStatus()  // Check service status
window.autoSaveService.requestSave()  // Force save
window.autoSaveService.requestCriticalSave()  // Force immediate save
```

## Performance Benefits

- **Reduced server load**: Saves only when needed, not on fixed intervals
- **Better game performance**: No periodic interruptions every 2 minutes
- **Smarter saves**: Different save strategies for different event types
- **Network resilience**: Retry failed saves automatically

## Migration from Old System

The new system replaces the old 2-minute interval auto-save with:
- Event-driven saves that respond to actual game changes
- Fallback 5-minute timer for safety
- Much more efficient resource usage
- Better user experience with no periodic lag spikes