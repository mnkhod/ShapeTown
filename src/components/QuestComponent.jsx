import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const QuestComponent = ({ onClose, playerProgress = {}, onQuestUpdate }) => {
  const [expandedQuests, setExpandedQuests] = useState(new Set());
  const [quests, setQuests] = useState([]);
  const [activeTab, setActiveTab] = useState('Main');
  const [lastProcessedProgress, setLastProcessedProgress] = useState({});

  useEffect(() => {
    if (JSON.stringify(playerProgress) === JSON.stringify(lastProcessedProgress)) {
      return;
    }
    
    const questsData = [
      {
        id: "001",
        title: "The First Harvest",
        description: "Learn the basics of farming",
        category: "Main Quest",
        location: "Farm area",
        prerequisites: "none",
        questGiver: "NPC Jack",
        completed: playerProgress["001"]?.completed || false,
        subtasks: [
          {
            id: "001-1",
            text: "Clean up the highlighted area. Use a Pickaxe to remove rocks.",
            completed: playerProgress["001"]?.subtasks?.["001-1"] || false
          },
          {
            id: "001-2",
            text: "Prepare the ground to plant seeds. Use a Hoe tool to get Soil.",
            completed: playerProgress["001"]?.subtasks?.["001-2"] || false
          },
          {
            id: "001-3",
            text: "Plant carrot seeds. Select a bag of seeds, click on already prepared soil.",
            completed: playerProgress["001"]?.subtasks?.["001-3"] || false
          },
          {
            id: "001-4",
            text: "Water the planted seed. Select the watering can to water, click on soil planted with seed.",
            completed: playerProgress["001"]?.subtasks?.["001-4"] || false
          },
          {
            id: "001-5",
            text: "Harvest the goods. Click on already grown carrot.",
            completed: playerProgress["001"]?.subtasks?.["001-5"] || false
          },
          {
            id: "001-6",
            text: "Go back to meet Jack.",
            completed: playerProgress["001"]?.subtasks?.["001-6"] || false
          }
        ],
        reward: "Pickaxe, Hoe, Watering Can, Carrot seeds x5"
      },
      {
        id: "002",
        title: "Taste of Gold",
        description: "Learn about trading in Shape Town",
        category: "Main Quest",
        location: "Farm and Town area",
        prerequisites: "#001",
        questGiver: "NPC Jack",
        completed: playerProgress["002"]?.completed || false,
        subtasks: [
          {
            id: "002-1",
            text: "Go meet NPC Jack",
            completed: playerProgress["002"]?.subtasks?.["002-1"] || false
          },
          {
            id: "002-2",
            text: "Go to Shape Town",
            completed: playerProgress["002"]?.subtasks?.["002-2"] || false
          },
          {
            id: "002-3",
            text: "Find and meet NPC Lady Lydia",
            completed: playerProgress["002"]?.subtasks?.["002-3"] || false
          },
          {
            id: "002-4",
            text: "Sell items from NPC Jack",
            completed: playerProgress["002"]?.subtasks?.["002-4"] || false
          }
        ],
        reward: "Taste of gold achievement + 1000 gold"
      },
      {
        id: "003",
        title: "Good Invitation",
        description: "Get to know the townspeople",
        category: "Main Quest",
        location: "Farm, Town, Beach",
        prerequisites: "#002",
        questGiver: "Game System",
        completed: playerProgress["003"]?.completed || false,
        subtasks: [
          {
            id: "003-1",
            text: "Go greeting with everyone in town NPCs",
            completed: playerProgress["003"]?.subtasks?.["003-1"] || false
          }
        ],
        reward: "Good Invitation achievement"
      },
      {
        id: "004",
        title: "Master of the Fields",
        description: "Become a farming expert",
        category: "Main Quest",
        location: "Farm area",
        prerequisites: "#002 Have to meet NPC Lily",
        questGiver: "Game System",
        completed: playerProgress["004"]?.completed || false,
        subtasks: [
          {
            id: "004-1",
            text: "Successfully grow one of each crop type",
            completed: playerProgress["004"]?.subtasks?.["004-1"] || false
          }
        ],
        reward: "Open next tier item on Farming"
      },
      // {
      //   id: "005",
      //   title: "Adventure Quest",
      //   description: "Help Victoria with a monster problem",
      //   category: "Daily Quest",
      //   location: "Beach area",
      //   prerequisites: "#002 Have to meet NPC Victoria",
      //   questGiver: "NPC Victoria",
      //   completed: playerProgress["005"]?.completed || false,
      //   subtasks: [
      //     {
      //       id: "005-1",
      //       text: "Meet the NPC Victoria",
      //       completed: playerProgress["005"]?.subtasks?.["005-1"] || false
      //     },
      //     {
      //       id: "005-2",
      //       text: "Go to the beach",
      //       completed: playerProgress["005"]?.subtasks?.["005-2"] || false
      //     },
      //     {
      //       id: "005-3",
      //       text: "Kill all of the Monsters",
      //       completed: playerProgress["005"]?.subtasks?.["005-3"] || false
      //     },
      //     {
      //       id: "005-4",
      //       text: "Report Back to NPC Victoria",
      //       completed: playerProgress["005"]?.subtasks?.["005-4"] || false
      //     }
      //   ],
      //   reward: "Everyday 50g"
      // },
      // {
      //   id: "006",
      //   title: "Goblin Slayer",
      //   description: "Clear the South Hill of goblins",
      //   category: "Daily Quest",
      //   location: "South Hill",
      //   prerequisites: "#002 Have to meet NPC Commander Rowan",
      //   questGiver: "NPC Rowan",
      //   completed: playerProgress["006"]?.completed || false,
      //   subtasks: [
      //     {
      //       id: "006-1",
      //       text: "Meet the NPC Commander Rowan",
      //       completed: playerProgress["006"]?.subtasks?.["006-1"] || false
      //     },
      //     {
      //       id: "006-2",
      //       text: "Go to the South Hill",
      //       completed: playerProgress["006"]?.subtasks?.["006-2"] || false
      //     },
      //     {
      //       id: "006-3",
      //       text: "Kill all of the Goblins",
      //       completed: playerProgress["006"]?.subtasks?.["006-3"] || false
      //     },
      //     {
      //       id: "006-4",
      //       text: "Report Back to NPC Commander Rowan",
      //       completed: playerProgress["006"]?.subtasks?.["006-4"] || false
      //     }
      //   ],
      //   reward: "15g each Goblin ear"
      // },
      {
        id: "007",
        title: "Treasure From Sea",
        description: "Collect seashells for Lydia",
        category: "Daily Quest",
        location: "Beach area",
        prerequisites: "#002 Have to meet NPC Lydia",
        questGiver: "NPC Lydia",
        completed: playerProgress["007"]?.completed || false,
        subtasks: [
          {
            id: "007-1",
            text: "Meet the NPC Lydia",
            completed: playerProgress["007"]?.subtasks?.["007-1"] || false
          },
          {
            id: "007-2",
            text: "Go to the beach",
            completed: playerProgress["007"]?.subtasks?.["007-2"] || false
          },
          {
            id: "007-3",
            text: "Collect the seashells from the beach",
            completed: playerProgress["007"]?.subtasks?.["007-3"] || false
          },
          {
            id: "007-4",
            text: "Back to meet NPC Lydia",
            completed: playerProgress["007"]?.subtasks?.["007-4"] || false
          }
        ],
        reward: "15g each seashell"
      },
      {
        id: "008",
        title: "Yam, Yam",
        description: "Learn to cook with carrots",
        category: "Side Quest",
        location: "Town area",
        prerequisites: "#002",
        questGiver: "NPC Lily",
        completed: playerProgress["008"]?.completed || false,
        subtasks: [
          {
            id: "008-1",
            text: "Cook \"Carrot Soup\" using a recipe from NPC Lily",
            completed: playerProgress["008"]?.subtasks?.["008-1"] || false
          }
        ],
        reward: "Yam, Yam achievement, Recipe: Steamed Carrot"
      },
      {
        id: "012",
        title: "Every Day!",
        description: "Give 5 carrots to NPC Jack",
        category: "Daily Quest",
        location: "Farm area",
        prerequisites: "none",
        questGiver: "NPC Jack",
        completed: playerProgress["012"]?.completed || false,
        subtasks: [
          {
            id: "012-1",
            text: "Give 5 carrots to NPC Jack",
            completed: playerProgress["012"]?.subtasks?.["012-1"] || false
          }
        ],
        reward: "5 carrot seeds"
      }
    ];

    setQuests(questsData);
    setLastProcessedProgress(playerProgress);
  }, [playerProgress, lastProcessedProgress]);

useEffect(() => {
  console.log("QuestComponent mounted");
  
  console.log("window.getQuestProgress exists:", !!window.getQuestProgress);
  console.log("window.updateQuestProgress exists:", !!window.updateQuestProgress);
  
  if (window.getQuestProgress) {
    const progress = window.getQuestProgress();
    console.log("Direct quest progress check:", progress);
  }
  
  const checkInterval = setInterval(() => {
    if (window.getQuestProgress) {
      const progress = window.getQuestProgress();
      if (Object.keys(progress).length > 0) {
        console.log("Found quest progress:", progress);
      }
    }
  }, 2000);
  
  return () => clearInterval(checkInterval);
}, []);

useEffect(() => {
  console.log("QuestComponent received playerProgress:", playerProgress);
}, [playerProgress]);

  const toggleQuest = useCallback((questId) => {
    setExpandedQuests(prev => {
      const newExpandedQuests = new Set(prev);
      if (newExpandedQuests.has(questId)) {
        newExpandedQuests.delete(questId);
      } else {
        newExpandedQuests.add(questId);
      }
      return newExpandedQuests;
    });
  }, []);

  const toggleSubtask = useCallback((questId, subtaskId) => {
    if (!onQuestUpdate) return;

    const questToUpdate = quests.find(q => q.id === questId);
    if (!questToUpdate) return;

    const subtaskToToggle = questToUpdate.subtasks.find(st => st.id === subtaskId);
    if (!subtaskToToggle) return;

    const newCompletionState = !subtaskToToggle.completed;
    
    const subtasksUpdate = {};
    questToUpdate.subtasks.forEach(st => {
      subtasksUpdate[st.id] = st.id === subtaskId ? newCompletionState : st.completed;
    });
    
    const wouldAllBeCompleted = questToUpdate.subtasks.every(st => 
      st.id === subtaskId ? newCompletionState : st.completed
    );
    
    const progressUpdate = {
      [questId]: {
        completed: wouldAllBeCompleted,
        subtasks: subtasksUpdate
      }
    };
    
    onQuestUpdate(progressUpdate);
  }, [quests, onQuestUpdate]);

  const getFilteredQuests = useCallback(() => {
    const categoryMap = {
      'Main': 'Main Quest',
      'Daily': 'Daily Quest',
      'Side': 'Side Quest'
    };
    
    return quests.filter(quest => quest.category === categoryMap[activeTab]);
  }, [quests, activeTab]);

  const filteredQuests = useMemo(() => getFilteredQuests(), [getFilteredQuests]);
  
  const completedQuests = useMemo(() => 
    filteredQuests.filter(q => q.completed).length, 
    [filteredQuests]
  );
  
  const totalQuests = useMemo(() => 
    filteredQuests.length, 
    [filteredQuests]
  );
  
  const progressPercentage = useMemo(() => 
    totalQuests > 0 ? Math.round((completedQuests / totalQuests) * 100) : 0,
    [completedQuests, totalQuests]
  );

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 font-malio"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative"
      >
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
            <h2 className="text-base font-malio text-center text-gray-800">QUESTS</h2>
            <p className="text-xs font-malio text-center text-gray-600 mt-2">
              Complete quests to improve your equipment<br />
              and earn achievements
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center gap-2 px-16 mb-3">
            {['Main', 'Daily', 'Side'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-malio rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab} Quests
              </button>
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="w-2/3 mx-auto mb-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-center mb-3 text-gray-700">{completedQuests}/{totalQuests} completed</p>

          <div className="px-16 pb-16 h-[calc(100%-16rem)] overflow-y-auto overflow-hidden scrollbar-hidden">
            <div className="space-y-4">
              {filteredQuests.length > 0 ? (
                filteredQuests.map((quest) => (
                  <div key={quest.id} className="group">
                    <div 
                      className="flex gap-4 items-start cursor-pointer"
                      onClick={() => toggleQuest(quest.id)}
                    >
                      <img 
                        src={quest.completed ? "/assets/hud/Taskscheckon.png" : "/assets/hud/Taskscheckoff.png"}
                        alt="Task checkbox"
                        className="w-4 h-4 mt-1 flex-shrink-0 object-contain" 
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`text-sm font-bold font-malio ${quest.completed ? 'text-green-600' : 'text-gray-900/90'}`}>
                              #{quest.id} {quest.title}
                            </p>
                            <p className="text-xs font-malio text-gray-600 mt-1">
                              {quest.description}
                            </p>
                          </div>
                          <img 
                            src={expandedQuests.has(quest.id) ? '/assets/hud/accordionUp.png' : '/assets/hud/accordionDown.png'}
                            alt={expandedQuests.has(quest.id) ? 'Collapse' : 'Expand'}
                            className="w-4 h-4 ml-2 transition-transform duration-200"
                          />
                        </div>
                        {expandedQuests.has(quest.id) && (
                          <div className="mt-3 space-y-3 ml-2 transition-all duration-200">
                            <div className="bg-gray-100 p-2 rounded-md text-xs font-malio">
                              <p><span className="font-semibold">Location:</span> {quest.location}</p>
                              <p><span className="font-semibold">Prerequisites:</span> {quest.prerequisites}</p>
                              <p><span className="font-semibold">Quest Giver:</span> {quest.questGiver}</p>
                            </div>
                            
                            <div className="mt-2">
                              <p className="text-xs font-semibold mb-2">Tasks:</p>
                              {quest.subtasks.map((subtask) => (
                                <div 
                                  key={subtask.id} 
                                  className="flex items-start gap-2 cursor-pointer mb-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSubtask(quest.id, subtask.id);
                                  }}
                                >
                                  <img 
                                    src={subtask.completed ? "/assets/hud/Taskscheckon.png" : "/assets/hud/Taskscheckoff.png"}
                                    alt="Subtask checkbox"
                                    className="w-3 h-3 mt-1 flex-shrink-0 object-contain" 
                                  />
                                  <p 
                                    className={`text-xs font-malio ${subtask.completed ? 'text-green-600' : 'text-gray-700'}`}
                                  >
                                    {subtask.text}
                                  </p>
                                </div>
                              ))}
                            </div>
                            
                            <div className="bg-gray-100 p-2 rounded-md mt-2">
                              <p className="text-xs font-malio text-gray-700">
                                <span className="font-bold">Reward:</span> {quest.reward}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {quest.id !== filteredQuests[filteredQuests.length - 1].id && (
                      <div className="h-px bg-gray-900/10 mt-4" />
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No {activeTab.toLowerCase()} quests available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

QuestComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  playerProgress: PropTypes.object,
  onQuestUpdate: PropTypes.func
};

export default QuestComponent;