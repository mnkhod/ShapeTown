# 🚪 Portal Positioning Guide

## How to Find Perfect Portal Positions

The portal system now has **debugging tools** to help you find the exact coordinates where players should appear on pavements, roads, and logical entry points.

## 🔧 **Debugging Tools Available:**

### **1. Get Current Player Position**
```javascript
// In browser console
window.portalManager.getCurrentPlayerPosition()
```
**Returns**: Your exact X,Y coordinates and scene name

### **2. List All Current Portal Positions**
```javascript
window.portalManager.listPortals()
```
**Shows**: All portal destinations currently configured

### **3. Update Portal Position (Live)**
```javascript
// Update where players appear when going Farm → Square
window.portalManager.updatePortalPosition(
  "ShapeTownFarmingMapScene",
  "ShapeTownSquareMapScene",
  { x: 350, y: 1550 }
)
```

## 📋 **Step-by-Step Process:**

### **Step 1: Test Current Portals**
1. **Load the game** and try the portals
2. **Check if positions feel natural** - are you on roads/pavements?
3. **Note which portals need adjustment**

### **Step 2: Find Perfect Positions**
1. **Walk to where you want players to appear** (middle of road, pavement, etc.)
2. **Open browser console** (F12)
3. **Run**: `window.portalManager.getCurrentPlayerPosition()`
4. **Copy the coordinates** shown

### **Step 3: Update Portal Positions**
1. **Use the coordinates** from Step 2
2. **Update the portal**:
```javascript
window.portalManager.updatePortalPosition("FromScene", "ToScene", { x: YOUR_X, y: YOUR_Y })
```

### **Step 4: Test Immediately**
1. **Use the portal** to test the new position
2. **Repeat** until it feels perfect
3. **Document the final coordinates**

## 🎯 **Current Portal Trigger Locations:**

| Portal Trigger | Scene | Coordinates | Purpose |
|-------|-------|-------------|---------|
| Beach Portal | Square | (2400, 2860) | To Beach |
| Farm Portal | Square | (240, 1552) | To Farm |
| Square Portal | Farm | (2520, 1112) | To Square |
| Square Portal | Beach | (1600, 0) | To Square |

## 🎯 **Current Destination Coordinates:**

| From → To | Current Position | Status |
|-----------|------------------|--------|
| Farm → Square | (300, 1500) | ⚠️ **Needs Testing** |
| Square → Farm | (2450, 1112) | ⚠️ **Needs Testing** |
| Square → Beach | (1600, 100) | ⚠️ **Needs Testing** |
| Beach → Square | (2400, 2750) | ⚠️ **Needs Testing** |

## 🛠️ **To Get Perfect Positions:**

### **For Farm → Square Portal:**
1. Go to **Square map**
2. **Walk to the middle of the road/pavement** near the farm portal (left side of Square)
3. Find the **most logical entry point**
4. Get coordinates and update:
```javascript
window.portalManager.updatePortalPosition("ShapeTownFarmingMapScene", "ShapeTownSquareMapScene", { x: NEW_X, y: NEW_Y })
```

### **For Square → Farm Portal:**
1. Go to **Farm map**
2. **Walk to the middle of the road** near where portal should exit (right side of Farm)
3. Find **logical entry point**
4. Update coordinates

### **For Beach Portals:**
1. **Same process** for Beach ↔ Square
2. Focus on **walkable areas** and **logical paths**

## 📝 **When You Find Perfect Coordinates:**

Please update the permanent configuration in:
`src/game/systems/PortalManager.js`

Replace the current coordinates with your tested perfect positions!

## 🎮 **Expected Player Experience:**
- ✅ Always appear in **middle of roads/pavements**
- ✅ **Logical entry points** that make sense
- ✅ **Never stuck** in walls or objects
- ✅ **Consistent** every time

## 🔧 **Fix Spawn Position Issues:**

If you're spawning in wrong places on refresh:

### **Clear Bad Saved Position:**
```javascript
// Clear all saved position data
window.portalManager.clearSavedPosition()
```

### **Set to Default Spawn:**
```javascript
// Set default spawn for Farm scene
window.portalManager.setDefaultSpawnPosition("ShapeTownFarmingMapScene")

// Set default spawn for Square scene
window.portalManager.setDefaultSpawnPosition("ShapeTownSquareMapScene")
```

### **Check Current Saved Data:**
```javascript
// See what's saved in localStorage
console.log("Saved X:", localStorage.getItem('currentPlayerX'))
console.log("Saved Y:", localStorage.getItem('currentPlayerY'))
console.log("Last Map:", localStorage.getItem('lastMapId'))
```

## 🎯 **Default Spawn Positions:**
- **Farm Scene**: (600, 620) - Near Old Man Jack
- **Square Scene**: (1200, 1500) - Center of square
- **Beach Scene**: (1000, 1000) - Beach center

**Test the portals and use the debugging tools to find the perfect positions!** 🎯