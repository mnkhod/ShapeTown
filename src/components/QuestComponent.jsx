import PropTypes from 'prop-types';

const QuestComponent = ({ onClose }) => {
  const tasks = [
    {
      text: "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
      completed: false
    },
    {
      text: "Water the nearest potato field and come back to me to get payed",
      completed: false
    },
    {
      text: "Water the nearest potato field and come back to me to get payed",
      completed: false
    },
    {
      text: "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
      subtasks: [
        "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
        "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
        "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
        "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
        "Collecte these crops and comeback to me with a bag full of crops by the end of the week"
      ]
    },
    {
      text: "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
      subtasks: [
        "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
        "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
        "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
        "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
        "Collecte these crops and comeback to me with a bag full of crops by the end of the week"
      ]
    },
    {
      text: "Collecte these crops and comeback to me with a bag full of crops by the end of the week",
      completed: false
    }
  ];

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
              className="w-16 h-16 hover:opacity-80 transition-opacity"
            />
          </div>

          <div className="pt-16 pb-6">
            <h2 className="text-base font-malio text-center text-gray-800">TASKS</h2>
            <p className="text-xs font-malio text-center text-gray-600 mt-2">
              Complete these tasks to improve your equipment<br />
              and earn achievements
            </p>
          </div>

          <div className="px-16 pb-16 h-[calc(100%-14rem)] overflow-y-auto overflow-hidden scrollbar-hidden">
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="group">
                  <div className="flex gap-4 items-start">
                    <img 
                      src="/assets/hud/Taskscheckon.png"
                      alt="Task checkbox"
                      className="w-4 h-4 mt-1 flex-shrink-0 object-contain" 
                    />
                    <div className="flex-1">
                      <p className={`text-xs font-malio ${task.completed ? 'text-green-600' : 'text-gray-900/90'}`}>
                        {task.text}
                      </p>
                      {task.subtasks && (
                        <ul className="mt-3 space-y-3">
                          {task.subtasks.map((subtask, subIndex) => (
                            <li 
                              key={subIndex} 
                              className="text-xs font-malio text-gray-600 ml-2"
                            >
                              • {subtask}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  {index !== tasks.length - 1 && (
                    <div className="h-px bg-gray-900/10 mt-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

QuestComponent.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default QuestComponent;