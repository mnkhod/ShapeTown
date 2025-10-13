import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
    useAllAchievements,
    useMyAchievements,
    useMintAchievement,
} from "../hooks/useAchievements";
import { EventBus } from "../game/EventBus";

// Achievement Card - Shows only image in grid
const AchievementCard = ({ achievement, onClick }) => {
    const isMintable = achievement.unlocked && !achievement.minted;

    return (
        <div
            className={`relative cursor-pointer rounded-md overflow-hidden transition-all hover:scale-110 ${
                isMintable
                    ? "rainbow-border" // RGB rainbow animation for mintable
                    : "" // No border class, use inline style
            }`}
            onClick={() => onClick(achievement)}
            style={{
                backgroundColor: "#8B7355", // Brownish background
                border: isMintable ? undefined : "5px solid #5D4E37", // Thick dark brown border for authentic look
            }}
        >
            {/* Achievement Image */}
            <div
                className={`w-full aspect-square p-2 flex items-center justify-center ${
                    achievement.unlocked ? "" : "grayscale opacity-40"
                }`}
            >
                <img
                    src={achievement.imageUrl || achievement.image}
                    alt={achievement.name}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            {/* Status Badge - Bottom Right */}
            <div className="absolute bottom-0.5 right-0.5">
                <img
                    src={
                        achievement.minted
                            ? "/assets/hud/Taskscheckon.png"
                            : achievement.unlocked
                            ? "/assets/hud/Taskscheckon.png"
                            : "/assets/hud/Taskscheckoff.png"
                    }
                    alt="Status"
                    className="w-4 h-4 object-contain drop-shadow-lg"
                />
            </div>

            {/* Mintable Badge */}
            {isMintable && (
                <div className="absolute top-0.5 left-0.5">
                    <span className="text-[8px] bg-green-500 text-white px-1 py-0.5 rounded-full font-bold shadow-lg">
                        READY
                    </span>
                </div>
            )}

            {/* Minted Badge */}
            {achievement.minted && (
                <div className="absolute top-0.5 left-0.5">
                    <span className="text-[8px] bg-purple-500 text-white px-1 py-0.5 rounded-full font-bold shadow-lg">
                        NFT
                    </span>
                </div>
            )}
        </div>
    );
};

// Achievement Detail Modal - Opens when clicking a card
const AchievementDetail = ({ achievement, onClose, onMint, isMinting }) => {
    if (!achievement) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 font-malio"
            onClick={onClose}
        >
            <div
                className="relative max-w-md w-full mx-4 rounded-lg overflow-hidden shadow-2xl"
                style={{
                    backgroundColor: "#8B7355", // Brownish background
                    border: "6px solid #5D4E37", // Dark brown border
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 z-10 w-8 h-8 hover:opacity-80 transition-opacity"
                >
                    <img
                        src="/assets/files/image%2035.png"
                        alt="Close"
                        className="w-full h-full object-contain"
                    />
                </button>

                {/* Content */}
                <div className="p-6">
                    {/* Achievement Image */}
                    <div className="flex justify-center mb-4">
                        <div
                            className={`w-40 h-40 p-4 rounded-lg flex items-center justify-center ${
                                achievement.unlocked
                                    ? "bg-amber-100"
                                    : "bg-gray-300 grayscale opacity-50"
                            }`}
                        >
                            <img
                                src={achievement.imageUrl || achievement.image}
                                alt={achievement.name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Achievement Name */}
                    <h3
                        className={`text-xl font-bold text-center mb-2 ${
                            achievement.minted
                                ? "text-purple-200"
                                : achievement.unlocked
                                ? "text-amber-100"
                                : "text-gray-400"
                        }`}
                    >
                        {achievement.name}
                    </h3>

                    {/* Status Badges */}
                    <div className="flex justify-center gap-2 mb-3">
                        {achievement.minted && (
                            <span className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full font-bold">
                                NFT Minted
                            </span>
                        )}
                        {achievement.unlocked && !achievement.minted && (
                            <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-bold">
                                Ready to Mint
                            </span>
                        )}
                        {!achievement.unlocked && (
                            <span className="text-xs bg-gray-500 text-white px-3 py-1 rounded-full font-bold">
                                Locked
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="bg-amber-100 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-800 text-center">
                            {achievement.description}
                        </p>
                    </div>

                    {/* Status Info */}
                    <div className="bg-amber-50 rounded-lg p-3 mb-4 text-xs text-gray-700">
                        <p className="text-center">
                            <span className="font-semibold">Status:</span>{" "}
                            {achievement.minted
                                ? "Minted as NFT"
                                : achievement.unlocked
                                ? "Unlocked - Ready to Mint!"
                                : "Locked - Complete quests to unlock"}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    {achievement.unlocked && !achievement.minted && (
                        <button
                            onClick={() => onMint(achievement)}
                            disabled={isMinting}
                            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white text-sm font-bold py-3 px-4 rounded-lg transition-colors shadow-lg"
                        >
                            {isMinting ? "Minting..." : "🎨 Mint as NFT"}
                        </button>
                    )}

                    {achievement.minted && (
                        <div className="bg-purple-100 text-purple-700 text-sm font-semibold text-center py-3 px-4 rounded-lg">
                            ✅ NFT Minted Successfully!
                        </div>
                    )}

                    {!achievement.unlocked && (
                        <div className="bg-gray-300 text-gray-700 text-sm font-semibold text-center py-3 px-4 rounded-lg">
                            🔒 Complete quests to unlock this achievement
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AchievementHUD = ({ onClose }) => {
    const [selectedAchievement, setSelectedAchievement] = useState(null);
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

    const handleCardClick = (achievement) => {
        setSelectedAchievement(achievement);
    };

    const handleCloseDetail = () => {
        setSelectedAchievement(null);
    };

    // Update selectedAchievement when achievements array updates (e.g., after minting)
    useEffect(() => {
        if (selectedAchievement) {
            const updatedAchievement = achievements.find(a => a.id === selectedAchievement.id);
            if (updatedAchievement) {
                setSelectedAchievement(updatedAchievement);
            }
        }
    }, [achievements, selectedAchievement]);

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
            {/* Book Container - Portrait Orientation */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative"
                style={{
                    width: '400px',
                    maxHeight: '85vh',
                }}
            >
                {/* Book Background */}
                <div
                    className="w-full rounded-lg shadow-2xl overflow-hidden"
                    style={{
                        backgroundColor: "#D4B896", // Brighter tan/beige
                        border: "8px solid #5D4E37", // Dark brown border
                        aspectRatio: "3/4" // Book-like ratio
                    }}
                >
                    {/* Close Button */}
                    <div
                        className="absolute top-1 right-1 cursor-pointer z-10"
                        onClick={onClose}
                    >
                        <img
                            src="/assets/files/image%2035.png"
                            alt="Close"
                            className="w-7 h-7 hover:opacity-80 transition-opacity"
                        />
                    </div>

                    {/* Content */}
                    <div className="h-full flex flex-col p-4">
                        {/* Header */}
                        <div className="pb-2">
                            <h2 className="text-sm font-malio text-center text-amber-900 font-bold">
                                ACHIEVEMENT JOURNAL
                            </h2>
                            <p className="text-[9px] font-malio text-center text-amber-800 mt-0.5">
                                Complete & Mint as NFTs
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full mb-1.5 bg-amber-200 rounded-full h-1.5 border border-amber-900">
                            <div
                                className="bg-green-600 h-full rounded-full"
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
                        <p className="text-[9px] text-center mb-2 text-amber-900 font-semibold">
                            {unlockedCount}/{achievements.length} unlocked • {mintedCount} minted
                        </p>

                        {/* Achievement Book - 3x3 Grid Layout */}
                        <div className="flex-1 overflow-y-auto scrollbar-hidden">
                            <div className="grid grid-cols-3 gap-2">
                                {achievements.length > 0 ? (
                                    achievements.map((achievement) => (
                                        <AchievementCard
                                            key={achievement.id}
                                            achievement={achievement}
                                            onClick={handleCardClick}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-8">
                                        <p className="text-amber-800 text-xs">
                                            No achievements available yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Achievement Detail Modal */}
                {selectedAchievement && (
                    <AchievementDetail
                        achievement={selectedAchievement}
                        onClose={handleCloseDetail}
                        onMint={handleMint}
                        isMinting={mintingAchievements.has(selectedAchievement.id)}
                    />
                )}
            </div>
        </div>
    );
};

AchievementHUD.propTypes = {
    onClose: PropTypes.func.isRequired,
};

AchievementCard.propTypes = {
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
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

AchievementDetail.propTypes = {
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
    onClose: PropTypes.func.isRequired,
    onMint: PropTypes.func.isRequired,
    isMinting: PropTypes.bool,
};

// Helper function to fetch metamask account
async function fetchMetamaskAccount() {
    if (!window.ethereum || !window.ethereum.selectedAddress)
        return "0x081901916FF0eBff4573533D1b34D54029B89B07";
    return window.ethereum.selectedAddress;
}

export default AchievementHUD;
