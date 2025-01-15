import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const CustomScrollbar = ({ children, height = 'h-64', width = 'w-full' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const contentRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);

  const PADDING_TOP = 16;
  const PADDING_BOTTOM = 16;
  const MIN_THUMB_HEIGHT = 48;

  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      const ratio = clientHeight / scrollHeight;
      const trackHeight = scrollbarRef.current?.clientHeight || 0;
      const availableHeight = trackHeight - PADDING_TOP - PADDING_BOTTOM;
      const calculatedHeight = Math.max(MIN_THUMB_HEIGHT, availableHeight * ratio);
      setScrollbarHeight(calculatedHeight);
    }
  }, [children]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
    const trackHeight = scrollbarRef.current?.clientHeight || 0;
    const availableSpace = trackHeight - scrollbarHeight - PADDING_TOP - PADDING_BOTTOM - 8;
    setScrollTop(Math.max(0, scrollPercentage * availableSpace));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollbarRef.current) return;

    const { top: trackTop } = scrollbarRef.current.getBoundingClientRect();
    const availableHeight = scrollbarRef.current.clientHeight - scrollbarHeight - PADDING_TOP - PADDING_BOTTOM;
    const dragPosition = e.clientY - trackTop - PADDING_TOP;
    const percentage = Math.max(0, Math.min(1, dragPosition / availableHeight));
    
    const { scrollHeight, clientHeight } = contentRef.current;
    contentRef.current.scrollTop = percentage * (scrollHeight - clientHeight);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`relative ${width} ${height} flex`}>
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="overflow-y-scroll pr-4 scrollbar-hide w-full"
      >
        {children}
      </div>

      <div
        ref={scrollbarRef}
        className="absolute right-0 top-0 w-6 h-full cursor-pointer flex flex-col"
        onClick={(e) => handleMouseMove(e)}
        style={{
          backgroundImage: 'url(assets/hud/ScrollBackground.png)',
          backgroundSize: '24px auto',
          backgroundRepeat: 'repeat-y',
          imageRendering: 'pixelated'
        }}
      >
        <div 
          className="w-full"
          style={{
            height: `${PADDING_TOP}px`,
            backgroundImage: 'url(assets/hud/ScrollBackground.png)',
            backgroundPosition: 'top',
            backgroundSize: '100%',
            imageRendering: 'pixelated'
          }}
        />

        <div
          onMouseDown={handleMouseDown}
          style={{
            height: `${scrollbarHeight}px`,
            transform: `translateY(${scrollTop}px)`,
            backgroundImage: 'url(assets/hud/scroller.png)',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'pixelated',
            width: '120%',
            left: '-3px',
            minHeight: `${MIN_THUMB_HEIGHT}px`,
            position: 'absolute',
            top: `${PADDING_TOP}px`
          }}
          className={`transition-transform cursor-pointer
            ${isDragging ? 'opacity-90' : 'hover:opacity-80'}`}
        />

        <div 
          className="w-full mt-auto"
          style={{
            height: `${PADDING_BOTTOM}px`,
            backgroundImage: 'url(assets/hud/ScrollBackground.png)',
            backgroundPosition: 'bottom',
            backgroundSize: '100%',
            imageRendering: 'pixelated'
          }}
        />
      </div>
    </div>
  );
};

CustomScrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
};

CustomScrollbar.defaultProps = {
  height: 'h-64',
  width: 'w-full',
};

export default CustomScrollbar;