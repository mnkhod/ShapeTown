import { useState } from 'react';
import PropTypes from 'prop-types';
import TokenSelect from './TokenSelect';

export default function TokenTrader({ onTrade, balance = 0, onClose }) {
  const [fromAmount, setFromAmount] = useState('0.0');
  const [toAmount, setToAmount] = useState('0.0');
  const [fromToken, setFromToken] = useState({ 
    symbol: 'GOLD', 
    image: 'assets/TradeIcons/Merchant/IconGold.png',
    name: 'Shape Token'
  });
  const [toToken, setToToken] = useState(null);
  const [showTokenSelect, setShowTokenSelect] = useState(false);
  const [selectingFor, setSelectingFor] = useState(null);
  const [showTooltip, setShowTooltip] = useState('');

  const formatFloat = (value) => {
    if (!value) return '0.0';
    return value.includes('.') ? value : value + '.0';
  };

  const handleFromAmountChange = (value) => {
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      const formattedValue = formatFloat(value);
      setFromAmount(formattedValue);
      setToAmount(formatFloat((parseFloat(value || 0) / 1000).toString()));
    }
  };

  const handleToAmountChange = (value) => {
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      const formattedValue = formatFloat(value);
      setToAmount(formattedValue);
      setFromAmount(formatFloat((parseFloat(value || 0) * 1000).toString()));
    }
  };

  const openTokenSelect = (section) => {
    setSelectingFor(section);
    setShowTokenSelect(true);
  };

  const handleTokenSelect = (token) => {
    if (selectingFor === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    setShowTokenSelect(false);
    setSelectingFor(null);
  };

  const getButtonText = () => {
    if (!fromAmount || fromAmount === '0.0') return 'Enter an amount';
    if (!toToken) return 'Select a token';
    return `Buy ${toToken.symbol}`;
  };

  const getTooltipText = (type) => {
    switch (type) {
      case 'minimum':
        return 'The minimum amount you will receive after slippage';
      case 'price':
        return 'The difference between the market price and estimated price due to trade size';
      case 'fee':
        return 'A portion of each trade (0.30%) goes to liquidity providers as a protocol incentive';
      case 'route':
        return 'Route path your trade will take through different tokens';
      default:
        return '';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative"
      >
        <div className="bg-yellow-50 border-4 border-yellow-900 rounded-lg p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-yellow-500 rounded-full text-white hover:bg-yellow-600"
          >
            X
          </button>

          <div className="text-3xl font-extrabold text-center mb-6 text-yellow-900">Trader</div>
          
          <div className="mb-4 bg-yellow-200 rounded-xl border-yellow-900 border-4 p-4">
            <div className="flex justify-between mb-2 text-yellow-900">
              <span className='flex justify-between items-center w-full'>
                <p>From</p>
                <p>Balance: {balance}</p>
              </span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="border-2 border-yellow-900 rounded px-2 py-1 w-32 bg-yellow-100 focus:outline-none"
              />
              <button
                onClick={() => handleFromAmountChange((balance / 2).toString())}
                className="px-2 py-1 bg-orange-300 border-2 border-yellow-900 rounded hover:bg-orange-400 transition text-yellow-900"
              >
                50%
              </button>
              <button
                onClick={() => handleFromAmountChange(balance.toString())}
                className="px-2 py-1 bg-orange-300 border-2 border-yellow-900 rounded hover:bg-orange-400 transition text-yellow-900"
              >
                MAX
              </button>
              <button 
                onClick={() => openTokenSelect('from')}
                className="bg-orange-300 border-2 border-yellow-900 rounded px-2 py-1 hover:bg-orange-400 transition text-yellow-900"
              >
                <span className="flex items-center gap-1">
                  <img src={fromToken?.image} alt={fromToken?.symbol} className="w-6 h-6" />
                  {fromToken?.symbol}
                </span>
              </button>
            </div>
          </div>

          <div className="mb-4 bg-yellow-200 rounded-xl border-yellow-900 border-4 p-4">
            <div className="flex justify-between mb-2">
              <span>To (estimated)</span>
              <span>Balance: 0</span>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={toAmount}
                onChange={(e) => handleToAmountChange(e.target.value)}
                className="border-2 border-yellow-900 rounded px-2 py-1 w-32 bg-yellow-100 focus:outline-none"
              />
              <button 
                onClick={() => openTokenSelect('to')}
                className="bg-orange-300 border-2 border-yellow-900 rounded px-3 py-1 hover:bg-orange-400 text-yellow-900"
              >
                {toToken ? (
                  <span className="flex items-center gap-1">
                    <img src={toToken.image} alt={toToken.symbol} className="w-6 h-6" />
                    {toToken.symbol}
                  </span>
                ) : (
                  'Select a Token'
                )}
              </button>
            </div>
          </div>

          {balance < parseFloat(fromAmount) && (
            <div className="text-center mb-4 bg-gray-200 border border-yellow-900 rounded p-2">
              Insufficient {fromToken.symbol} balance
            </div>
          )}

          <button
            onClick={() => onTrade({ fromAmount, fromToken, toToken })}
            className="w-full bg-orange-300 border-2 border-yellow-900 rounded py-2 mb-4 hover:bg-orange-400"
          >
            {getButtonText()}
          </button>

          {toToken && (
            <div className="bg-yellow-100 border-2 border-yellow-900 rounded p-4">
              {[
                { label: 'Minimum Received', value: `${(parseFloat(toAmount) * 0.99).toFixed(1)} ${toToken.symbol}`, type: 'minimum' },
                { label: 'Price Impact', value: '2.52%', type: 'price' },
                { label: 'Liquidity Provider Fee', value: `${(parseFloat(fromAmount) * 0.003).toFixed(6)} ${fromToken.symbol}`, type: 'fee' },
                { label: 'Route', value: `${fromToken.symbol} › ${toToken.symbol}`, type: 'route' }
              ].map((item) => (
                <div key={item.type} className="flex justify-between items-center mb-2 relative">
                  <div className="flex items-center gap-1">
                    {item.label}
                    <span
                      className="cursor-help p-1 bg-yellow-700 w-8 h-8 text-center text-yellow-100 rounded-3xl"
                      onMouseEnter={() => setShowTooltip(item.type)}
                      onMouseLeave={() => setShowTooltip('')}
                    >
                      ?
                    </span>
                  </div>
                  <span>{item.value}</span>
                  {showTooltip === item.type && (
                    <div className="absolute right-0 bottom-full mb-2 bg-black text-white p-2 rounded text-sm w-64 z-50">
                      {getTooltipText(item.type)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {showTokenSelect && (
          <TokenSelect
            onClose={() => {
              setShowTokenSelect(false);
              setSelectingFor(null);
            }}
            onTokenSelect={handleTokenSelect}
          />
        )}
      </div>
    </div>
  );
}

TokenTrader.propTypes = {
  onTrade: PropTypes.func.isRequired,
  balance: PropTypes.number,
  onClose: PropTypes.func.isRequired
};