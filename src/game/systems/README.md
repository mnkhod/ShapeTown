# Portal System Documentation

## Overview
The Portal Manager provides consistent, bidirectional scene transitions with exact positioning. No more random teleportation - players always appear in the correct location!

## ✅ **Portal System Fixed**

### **Problem Solved:**
- **Before**: Inconsistent positioning using relative offsets (`y += 40`, `x -= 40`)
- **After**: Exact coordinates for every portal transition

### **Portal Configurations:**

#### **Farm ↔ Square Portal**
- **Farm → Square**: Player appears at `(304, 1988)` in Square
- **Square → Farm**: Player appears at `(1568, 1088)` in Farm

#### **Square ↔ Beach Portal**
- **Square → Beach**: Player appears at `(960, 1920)` in Beach
- **Beach → Square**: Player appears at `(1200, 400)` in Square

#### **Square ↔ Mine Portal** (if used)
- **Square → Mine**: Player appears at `(960, 1800)` in Mine
- **Mine → Square**: Player appears at `(800, 1200)` in Square

## Features

### **🎯 Consistent Positioning**
- Exact coordinates for every portal
- No more random teleportation
- Bidirectional portal relationships

### **🛡️ Safe Transitions**
- Duplicate transition prevention
- 1-second cooldown between portals
- Automatic inventory saving

### **🎨 Visual Effects**
- Smooth fade out/in transitions
- 1-second fade effects for immersion

### **💾 Data Management**
- Automatic inventory sync before transition
- Player position saved to localStorage
- Quest system integration

## Usage in Scenes

Replace old portal code:
```javascript
// OLD - Inconsistent positioning
this.scene.switch("ShapeTownSquareMapScene");
const targetScene = this.scene.get("ShapeTownSquareMapScene");
if (targetScene && targetScene.playerPrefab) {
    targetScene.playerPrefab.y += 40; // Random offset!
}

// NEW - Consistent positioning
portalManager.transition(this, "ShapeTownSquareMapScene");
```

## Debugging

Access portal manager in browser console:
```javascript
// List all available portals
window.portalManager.listPortals();

// Check specific portal config
window.portalManager.getPortalConfig("ShapeTownFarmingMapScene", "ShapeTownSquareMapScene");

// Add new portal
window.portalManager.addPortal("NewScene", "TargetScene", {
    targetPosition: { x: 500, y: 600 },
    fadeEffect: true
});
```

## Benefits

✅ **Consistent Experience**: Players always know where they'll appear
✅ **No Lost Players**: Exact positioning prevents getting stuck
✅ **Smooth Transitions**: Professional fade effects
✅ **Data Safety**: Inventory automatically saved
✅ **Easy Maintenance**: Centralized portal configuration

The portal system now works exactly as expected - players teleport to the same, logical positions every time!