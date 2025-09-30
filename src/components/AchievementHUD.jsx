import PropTypes from "prop-types";
import { useState } from "react";

const ACHIEVEMENTS = [
    {
        name: "Gift from Nature",
        description:
            "Your first successful forage marks the beginning of understanding the forest's bounty. The wilderness has shared its secrets with you, teaching you that nature provides for those who respect and learn from it.",
        image: "https://raw.githubusercontent.com/mnkhod/shape-town-api/refs/heads/main/api/public/GiftFromNatureAchievement.png",
        minted: false,
    },
    {
        name: "First Fish",
        description:
            "A milestone every aspiring angler remembers - your first successful catch! Whether it's a tiny minnow or a surprising trophy fish, this achievement marks your entry into the world of fishing.",
        image: "https://raw.githubusercontent.com/mnkhod/shape-town-api/refs/heads/main/api/public/FirstFishAchievement.png",
        minted: false,
    },
    {
        name: "Natural Forager",
        description:
            "The wilderness holds countless treasures for those who know where to look. Master the art of foraging by collecting various wild plants and mushrooms from the forest. Be cautious - not everything that grows is safe to eat.",
        image: "https://raw.githubusercontent.com/mnkhod/shape-town-api/refs/heads/main/api/public/NaturalForagerAchievement.png",
        minted: false,
    },
    {
        name: "Taste of Gold",
        description:
            "Your first earned coins mark an important milestone in your journey. By completing honest work and trading with fellow villagers, you'll experience the satisfaction of earning your own money and learn the value of commerce in our community.",
        image: "https://raw.githubusercontent.com/mnkhod/shape-town-api/refs/heads/main/api/public/TasteOfGoldAchievement.png",
        minted: false,
    },
    {
        name: "Good Invitation",
        description:
            "Your first earned coins mark an important milestone in your journey. By completing honest work and trading with fellow villagers, you'll experience the satisfaction of earning your own money and learn the value of commerce in our community.",
        image: "https://raw.githubusercontent.com/mnkhod/shape-town-api/refs/heads/main/api/public/GoodInvitation.png",
        minted: false,
    },
    {
        name: "Master Of The Field",
        description:
            "Your first earned coins mark an important milestone in your journey. By completing honest work and trading with fellow villagers, you'll experience the satisfaction of earning your own money and learn the value of commerce in our community.",
        image: "https://raw.githubusercontent.com/mnkhod/shape-town-api/refs/heads/main/api/public/MasterOfTheField.png",
        minted: false,
    },
    {
        name: "First Harvest",
        description:
            "As a novice settler in these untamed lands, you must prove your worth by gathering your first crop. Visit your assigned plot of farmland, plant the provided seeds, and tend to them until they bear fruit. Learn the basics of cultivation and experience the satisfaction of reaping what you sow.",
        image: "https://raw.githubusercontent.com/mnkhod/shape-town-api/refs/heads/main/api/public/FirstHarvestAchievement.png",
        minted: false,
    },
];

const AchievementSlot = ({ achievement }) => {
    return (
        <div className="flex flex-col items-center text-center w-full px-4 py-4 border-b border-gray-300 last:border-none">
            <div
                className={`w-24 h-24 mb-3 transition-all ${
                    achievement.minted ? "" : "grayscale opacity-40"
                }`}
            >
                <img
                    src={achievement.image}
                    alt={achievement.name}
                    className="w-full h-full object-contain"
                />
            </div>
            <h3
                className={`text-base font-bold mb-2 ${
                    achievement.minted ? "text-yellow-900" : "text-gray-500"
                }`}
            >
                {achievement.name}
            </h3>
            <p
                className={`text-sm leading-snug ${
                    achievement.minted ? "text-gray-800" : "text-gray-500"
                }`}
                style={{
                    maxWidth: "280px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {achievement.description}
            </p>
        </div>
    );
};

const AchievementHUD = ({ onClose }) => {
    const [achievements] = useState(ACHIEVEMENTS);

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

                    <div className="pt-16 pb-3">
                        <h2 className="text-base font-malio text-center text-gray-800">
                            ACHIEVEMENTS
                        </h2>
                        <p className="text-xs font-malio text-center text-gray-600 mt-2">
                            Collect achievements and mint them as NFTs
                        </p>
                    </div>

                    {/* ✅ Vertical scroll list */}
                    <div className="px-8 pb-16 h-[calc(100%-16rem)] overflow-y-auto scrollbar-hidden">
                        <div className="flex flex-col items-center gap-8">
                            {achievements.map((achievement, index) => (
                                <AchievementSlot
                                    key={index}
                                    achievement={achievement}
                                />
                            ))}
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

AchievementSlot.propTypes = {
    achievement: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        minted: PropTypes.bool,
    }),
};

export default AchievementHUD;

