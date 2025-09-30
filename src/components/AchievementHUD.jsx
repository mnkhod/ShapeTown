import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
    useAllAchievements,
    useMyAchievements,
    useMintAchievement,
} from "../hooks/useAchievements";
import { EventBus } from "../game/EventBus";

const AchievementRow = ({
    achievement,
    onMint,
    isExpanded,
    onToggle,
    isMinting,
}) => {
    const isMintable = achievement.unlocked && !achievement.minted;

    return (
        <div className={`group ${isMintable ? "rainbow-border rounded-md p-2" : ""}`}>
            <div
                className="flex gap-4 items-start cursor-pointer"
                onClick={onToggle}
            >
                {/* Status Icon */}
                <img
                    src={
                        achievement.minted
                            ? "/assets/hud/Taskscheckon.png"
                            : achievement.unlocked
                            ? "/assets/hud/Taskscheckon.png"
                            : "/assets/hud/Taskscheckoff.png"
                    }
                    alt="Achievement status"
                    className="w-4 h-4 mt-1 flex-shrink-0 object-contain"
                />

                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <p
                                    className={`text-sm font-bold font-malio ${
                                        achievement.minted
                                            ? "text-purple-600"
                                            : achievement.unlocked
                                            ? "text-green-600"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {achievement.name}
                                </p>
                                {achievement.minted && (
                                    <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                                        NFT
                                    </span>
                                )}
                                {achievement.unlocked && !achievement.minted && (
                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                                        MINTABLE
                                    </span>
                                )}
                            </div>
                            <p className="text-xs font-malio text-gray-600 mt-1">
                                {achievement.description}
                            </p>
                        </div>
                        <img
                            src={
                                isExpanded
                                    ? "/assets/hud/accordionUp.png"
                                    : "/assets/hud/accordionDown.png"
                            }
                            alt={isExpanded ? "Collapse" : "Expand"}
                            className="w-4 h-4 ml-2 transition-transform duration-200"
                        />
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                        <div className="mt-3 ml-2 transition-all duration-200">
                            {/* Achievement Image */}
                            <div className="flex justify-center mb-3">
                                <div
                                    className={`w-32 h-32 p-2 bg-gray-50 rounded-lg transition-all duration-300 ${
                                        achievement.unlocked
                                            ? ""
                                            : "grayscale opacity-50"
                                    }`}
                                >
                                    <img
                                        src={
                                            achievement.imageUrl ||
                                            achievement.image
                                        }
                                        alt={achievement.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Achievement Info */}
                            <div className="bg-gray-100 p-2 rounded-md text-xs font-malio mb-2">
                                <p>
                                    <span className="font-semibold">
                                        Status:
                                    </span>{" "}
                                    {achievement.minted
                                        ? "Minted as NFT"
                                        : achievement.unlocked
                                        ? "Unlocked - Ready to Mint!"
                                        : "Locked - Complete quests to unlock"}
                                </p>
                                {achievement.nftId && (
                                    <p>
                                        <span className="font-semibold">
                                            NFT ID:
                                        </span>{" "}
                                        {achievement.nftId}
                                    </p>
                                )}
                            </div>

                            {/* Mint Button */}
                            {achievement.unlocked && !achievement.minted && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMint(achievement);
                                    }}
                                    disabled={isMinting}
                                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white text-xs font-bold py-2 px-4 rounded-md transition-colors"
                                >
                                    {isMinting ? "Minting..." : "Mint as NFT"}
                                </button>
                            )}

                            {achievement.minted && (
                                <div className="bg-purple-100 text-purple-700 text-xs font-semibold text-center py-2 px-4 rounded-md">
                                    NFT Minted Successfully!
                                </div>
                            )}

                            {!achievement.unlocked && (
                                <div className="bg-gray-200 text-gray-600 text-xs font-semibold text-center py-2 px-4 rounded-md">
                                    Complete quests to unlock
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AchievementHUD = ({ onClose }) => {
    const [expandedAchievements, setExpandedAchievements] = useState(new Set());
    const [mintingAchievements, setMintingAchievements] = useState(new Set());

    // Fetch data from backend
    const { data: allAchievementsData, isLoading: allLoading } =
        useAllAchievements();
    const { data: myAchievementsData, isLoading: myLoading, refetch: refetchMyAchievements } =
        useMyAchievements();
    const mintMutation = useMintAchievement();

    // Force refetch when component mounts to ensure fresh data
    useEffect(() => {
        console.log("🔄 AchievementHUD opened - forcing data refresh");
        refetchMyAchievements();
    }, [refetchMyAchievements]);

    // Combine backend data with local state
    const achievements = useMemo(() => {
        if (!allAchievementsData?.data) return [];

        const allAchievements = allAchievementsData.data;
        const myAchievements = myAchievementsData?.data || [];

        console.log("🎯 AchievementHUD - All achievements from backend:", allAchievements);
        console.log("🎯 AchievementHUD - My unlocked achievements:", myAchievements);

        // Create a map of unlocked achievements
        const unlockedMap = new Map();
        myAchievements.forEach((ua) => {
            unlockedMap.set(ua.achievementId, {
                unlocked: true,
                minted: !!ua.mintedAt,
                userAchievementId: ua.id,
                unlockedAt: ua.unlockedAt,
            });
        });

        // Merge data
        const merged = allAchievements.map((achievement) => {
            const userStatus = unlockedMap.get(achievement.id) || {
                unlocked: false,
                minted: false,
            };

            return {
                ...achievement,
                ...userStatus,
                isMintable: userStatus.unlocked && !userStatus.minted,
            };
        });

        console.log("🎯 AchievementHUD - Merged achievements:", merged);

        // Sort: Mintable (unlocked but not minted) at top, then by NFT ID
        return merged.sort((a, b) => {
            // Mintable achievements first
            if (a.isMintable && !b.isMintable) return -1;
            if (!a.isMintable && b.isMintable) return 1;

            // Then minted achievements
            if (a.minted && !b.minted) return -1;
            if (!a.minted && b.minted) return 1;

            // Then by NFT ID
            return (a.nftId || 999) - (b.nftId || 999);
        });
    }, [allAchievementsData, myAchievementsData]);

    const handleMint = async (achievement) => {
        console.log("🎨 Attempting to mint achievement:", achievement);

        // Check if achievement is unlocked
        if (!achievement.userAchievementId) {
            console.error("❌ No userAchievementId - achievement not unlocked yet!");
            alert("Achievement not unlocked yet!");
            return;
        }

        // Add to minting set
        setMintingAchievements(prev => new Set(prev).add(achievement.id));

        try {
            console.log("🎨 Minting via backend API...");
            console.log("📋 Achievement details:", {
                name: achievement.name,
                nftId: achievement.nftId,
                userAchievementId: achievement.userAchievementId,
            });

            const recipientAddress = await fetchMetamaskAccount();
            console.log("👛 Recipient address:", recipientAddress);

            await mintMutation.mutateAsync({
                userAchievementId: achievement.userAchievementId,
                options: {
                    chain: "Shape",
                    recipientAddress: recipientAddress,
                },
            });

            console.log("✅ NFT minted successfully!");

            // Wait for cache to refresh
            console.log("🔄 Waiting for cache refresh...");
            await new Promise(resolve => setTimeout(resolve, 500));

            // Force refetch to get updated data
            await refetchMyAchievements();
            console.log("✅ Achievement data refreshed");

            // Show in-game alert message
            EventBus.emit("show-game-alert", `${achievement.name} NFT Minted Successfully!`);

        } catch (error) {
            console.error("❌ Failed to mint NFT:", error);
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            alert(`Failed to mint NFT: ${error.response?.data?.message || error.message}`);
        } finally {
            // Remove from minting set
            setMintingAchievements(prev => {
                const newSet = new Set(prev);
                newSet.delete(achievement.id);
                return newSet;
            });
        }
    };

    const toggleExpansion = (achievementId) => {
        const newExpanded = new Set(expandedAchievements);
        if (newExpanded.has(achievementId)) {
            newExpanded.delete(achievementId);
        } else {
            newExpanded.add(achievementId);
        }
        setExpandedAchievements(newExpanded);
    };

    const unlockedCount = achievements.filter((a) => a.unlocked).length;
    const mintedCount = achievements.filter((a) => a.minted).length;

    // Only show loading spinner if we have NO data at all
    if ((allLoading || myLoading) && achievements.length === 0) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 font-malio">
                <div className="bg-white rounded-lg p-8">
                    <p className="text-gray-700">Loading achievements...</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 font-malio"
            onClick={onClose}
        >
            <div onClick={(e) => e.stopPropagation()} className="relative">
                <img
                    src="/assets/hud/Tasksframe.png"
                    alt="Frame"
                    className="w-auto h-auto"
                />

                <div className="absolute inset-0">
                    {/* Close Button */}
                    <div
                        className="absolute top-0 -right-2 cursor-pointer"
                        onClick={onClose}
                    >
                        <img
                            src="/assets/files/image%2035.png"
                            alt="Close"
                            className="w-10 h-10 mr-4 mt-2 hover:opacity-80 transition-opacity"
                        />
                    </div>

                    {/* Header */}
                    <div className="pt-16 pb-3">
                        <h2 className="text-base font-malio text-center text-gray-800">
                            ACHIEVEMENTS
                        </h2>
                        <p className="text-xs font-malio text-center text-gray-600 mt-2">
                            Complete achievements and mint them as NFTs
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-2/3 mx-auto mb-3 bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                                width: `${
                                    achievements.length > 0
                                        ? Math.round(
                                              (unlockedCount /
                                                  achievements.length) *
                                                  100
                                          )
                                        : 0
                                }%`,
                            }}
                        ></div>
                    </div>
                    <p className="text-xs text-center mb-3 text-gray-700">
                        {unlockedCount}/{achievements.length} unlocked •{" "}
                        {mintedCount} minted
                    </p>

                    {/* Achievement List */}
                    <div className="px-16 pb-16 h-[calc(100%-16rem)] overflow-y-auto scrollbar-hidden">
                        <div className="space-y-4">
                            {achievements.length > 0 ? (
                                achievements.map((achievement, index) => (
                                    <React.Fragment key={achievement.id}>
                                        <AchievementRow
                                            achievement={achievement}
                                            onMint={handleMint}
                                            isExpanded={expandedAchievements.has(
                                                achievement.id
                                            )}
                                            onToggle={() =>
                                                toggleExpansion(achievement.id)
                                            }
                                            isMinting={mintingAchievements.has(achievement.id)}
                                        />
                                        {index !== achievements.length - 1 && (
                                            <div className="h-px bg-gray-900/10" />
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 text-sm">
                                        No achievements available yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AchievementHUD.propTypes = {
    onClose: PropTypes.func.isRequired,
};

AchievementRow.propTypes = {
    achievement: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
        image: PropTypes.string,
        unlocked: PropTypes.bool,
        minted: PropTypes.bool,
        points: PropTypes.number,
        nftId: PropTypes.number,
        userAchievementId: PropTypes.string,
    }),
    onMint: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    isMinting: PropTypes.bool,
};

// Helper function to fetch metamask account
async function fetchMetamaskAccount() {
    if (!window.ethereum || !window.ethereum.selectedAddress)
        return "0x081901916FF0eBff4573533D1b34D54029B89B07";
    return window.ethereum.selectedAddress;
}

export default AchievementHUD;
