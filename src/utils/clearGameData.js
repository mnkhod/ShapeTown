/**
 * Utility function to clear all game data
 * Use this when switching accounts or resetting the game
 */

export const clearAllGameData = () => {
    console.log("🧹 Clearing all game data...");

    // List all keys to be cleared
    const keysToRemove = [
        "accessToken",
        "token",
        "playerInventory",
        "lastQuestDate",
        "jackDailyQuestCompleted",
        "achievements",
        "questProgress",
        "checkpointData",
        "sessionData",
    ];

    // Clear specific keys
    keysToRemove.forEach((key) => {
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            console.log(`  ✓ Removed: ${key}`);
        }
    });

    // Also clear any keys that start with specific prefixes
    const prefixes = ["jackLifeCycleStep_", "quest_", "npc_"];
    Object.keys(localStorage).forEach((key) => {
        if (prefixes.some((prefix) => key.startsWith(prefix))) {
            localStorage.removeItem(key);
            console.log(`  ✓ Removed: ${key}`);
        }
    });

    console.log("✅ Game data cleared successfully!");
};

/**
 * Clear everything in localStorage (nuclear option)
 */
export const clearAllLocalStorage = () => {
    console.log("💥 Nuclear clear: Removing ALL localStorage data...");
    localStorage.clear();
    console.log("✅ All localStorage cleared!");
};

/**
 * Export to window for easy console access
 */
if (typeof window !== "undefined") {
    window.clearGameData = clearAllGameData;
    window.clearAllStorage = clearAllLocalStorage;
    console.log(
        "💡 Tip: You can call window.clearGameData() or window.clearAllStorage() from the console"
    );
}
