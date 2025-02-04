import { useState } from 'react';
import PropTypes from 'prop-types';

const SettingsComponent = ({ onClose }) => {
  const [audioVolume, setAudioVolume] = useState(50);
  const [musicVolume, setMusicVolume] = useState(50);
  const [isEditingAudio, setIsEditingAudio] = useState(false);
  const [isEditingMusic, setIsEditingMusic] = useState(false);
  const [tempAudioValue, setTempAudioValue] = useState('50');
  const [tempMusicValue, setTempMusicValue] = useState('50');

  const handleVolumeChange = (value, setVolume) => {
    const numberValue = parseInt(value);
    if (!isNaN(numberValue)) {
      // Clamp value between 0 and 100
      const clampedValue = Math.min(Math.max(numberValue, 0), 100);
      setVolume(clampedValue);
      return clampedValue.toString();
    }
    return value;
  };

  const handleAudioBlur = () => {
    setIsEditingAudio(false);
    const newValue = handleVolumeChange(tempAudioValue, setAudioVolume);
    setTempAudioValue(newValue);
  };

  const handleMusicBlur = () => {
    setIsEditingMusic(false);
    const newValue = handleVolumeChange(tempMusicValue, setMusicVolume);
    setTempMusicValue(newValue);
  };

  const handleKeyDown = (e, onBlur) => {
    if (e.key === 'Enter') {
      onBlur();
    }
  };

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
          src="/assets/hud/Options/settingsBackground.png" 
          alt="Settings Frame"
          className="w-auto h-auto"
        />
        
        <div className="absolute inset-0 flex flex-col -ml-12 items-center">
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

          <div className="pt-16 pb-8">
            <img 
              src="/assets/hud/Options/settingsTitle.png"
              alt="Settings"
              className="mx-auto w-48 ml-12"
            />
          </div>

          <div className="w-64 space-y-4">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-32">
                <img
                  src="/assets/hud/Options/soundText.png"
                  alt="Sound"
                  className="w-full"
                />
              </div>
              <div className="w-32 relative h-4 ml-4">
                <img 
                  src="/assets/hud/Options/audioCustomize.png"
                  alt="Sound Slider Background"
                  className="w-64 mt-0.5 h-auto object-cover"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioVolume}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    setAudioVolume(newValue);
                    setTempAudioValue(newValue.toString());
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <img 
                  src="/assets/hud/Options/audioIndicator.png"
                  alt="Sound Indicator"
                  style={{
                    left: `${audioVolume}%`,
                    transform: 'translateX(-50%)'
                  }}
                  className="absolute -top-1 h-6 pointer-events-none"
                />
                <div 
                  className="absolute -right-16 -top-1 text-sm"
                >
                  {isEditingAudio ? (
                    <input
                      type="text"
                      value={tempAudioValue}
                      onChange={(e) => setTempAudioValue(e.target.value)}
                      onBlur={handleAudioBlur}
                      onKeyDown={(e) => handleKeyDown(e, handleAudioBlur)}
                      className="w-12 bg-black/50 text-yellow-400 font-pixel border border-yellow-400/50 px-1 py-0.5 text-center focus:outline-none"
                      style={{
                        textShadow: '1px 1px 0px #000',
                        imageRendering: 'pixelated'
                      }}
                      autoFocus
                    />
                  ) : (
                    <div 
                      onClick={() => {
                        setIsEditingAudio(true);
                        setTempAudioValue(audioVolume.toString());
                      }}
                      className="w-12 cursor-pointer text-yellow-400 font-pixel text-center"
                      style={{
                        textShadow: '1px 1px 0px #000',
                        imageRendering: 'pixelated'
                      }}
                    >
                      {audioVolume}%
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <div className="w-32">
                <img 
                  src="/assets/hud/Options/musicText.png"
                  alt="Music"
                  className="w-full"
                />
              </div>
              <div className="w-32 relative h-4 ml-4">
                <img 
                  src="/assets/hud/Options/audioCustomize.png"
                  alt="Music Slider Background"
                  className="w-64 mt-0.5 h-auto object-cover"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={musicVolume}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    setMusicVolume(newValue);
                    setTempMusicValue(newValue.toString());
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <img 
                  src="/assets/hud/Options/audioIndicator.png"
                  alt="Music Indicator"
                  style={{
                    left: `${musicVolume}%`,
                    transform: 'translateX(-50%)'
                  }}
                  className="absolute -top-1 h-6 pointer-events-none"
                />
                <div 
                  className="absolute -right-16 -top-1 text-sm"
                >
                  {isEditingMusic ? (
                    <input
                      type="text"
                      value={tempMusicValue}
                      onChange={(e) => setTempMusicValue(e.target.value)}
                      onBlur={handleMusicBlur}
                      onKeyDown={(e) => handleKeyDown(e, handleMusicBlur)}
                      className="w-12 bg-black/50 text-yellow-400 font-pixel border border-yellow-400/50 px-1 py-0.5 text-center focus:outline-none"
                      style={{
                        textShadow: '1px 1px 0px #000',
                        imageRendering: 'pixelated'
                      }}
                      autoFocus
                    />
                  ) : (
                    <div 
                      onClick={() => {
                        setIsEditingMusic(true);
                        setTempMusicValue(musicVolume.toString());
                      }}
                      className="w-12 cursor-pointer text-yellow-400 font-pixel text-center"
                      style={{
                        textShadow: '1px 1px 0px #000',
                        imageRendering: 'pixelated'
                      }}
                    >
                      {musicVolume}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SettingsComponent.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default SettingsComponent;