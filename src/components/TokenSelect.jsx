import { useState } from 'react';
import PropTypes from 'prop-types';

const commonTokens = [
  { symbol: 'JEWEL', chain: 'DFK Chain', balance: 0, icon: '💎' },
  { symbol: 'CRYSTAL', chain: 'Crystal', balance: 0, icon: '🔷' },
  { symbol: 'ETH', chain: '', balance: 0, icon: '⬡' },
  { symbol: 'AVAX', chain: 'Avalanche', balance: 0, icon: '🔺' },
  { symbol: 'USDC', chain: '', balance: 0, icon: '💵' },
  { symbol: 'KAIA', chain: '', balance: 0, icon: '🌿' },
  { symbol: 'BTC.b', chain: 'BTC.b', balance: 0, icon: '₿' },
];

const tokenList = [
  { symbol: 'JEWEL', name: 'DFK Chain', balance: 0, icon: '💎' },
  { symbol: 'AVAX', name: 'Avalanche', balance: 0, icon: '🔺' },
  { symbol: 'BTC.b', name: 'BTC.b', balance: 0, icon: '₿' },
  { symbol: 'CRYSTAL', name: 'Crystal', balance: 0, icon: '🔷' },
  { symbol: 'DFKAMBRTFY', name: 'Ambertaffy', balance: 0, icon: '🍬' },
];

export default function TokenSelect({ onClose, onTokenSelect }) {
  const [searchText, setSearchText] = useState('');

  const filteredTokens = tokenList.filter(token => 
    token.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
    token.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-yellow-100 border-4 border-yellow-900 rounded-2xl w-auto p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-900 hover:text-yellow-900">
          X
        </button>

        <div className="text-2xl font-bold text-center text-yellow-900 mb-4">
          Select a Token
        </div>

        <input
          type="text"
          placeholder="Search name or paste address"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-3 bg-yellow-100 border-2 border-yellow-900 rounded-lg mb-4 focus:outline-none text-yellow-900"
        />

        <div className="mb-4">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-yellow-900 font-semibold">Common bases</span>
            <span className="text-yellow-900 cursor-help" title="Tokens commonly traded">ⓘ</span>
          </div>
          <div className="bg-yellow-300 p-3 rounded-lg flex flex-wrap gap-2">
            {commonTokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => {
                  onTokenSelect(token);
                  onClose();
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-yellow-50 border-2 border-yellow-900 rounded-lg hover:bg-yellow-50 text-yellow-900"
              >
                <span>{token.icon}</span>
                <span>{token.symbol}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-2 border-yellow-900 rounded-lg overflow-hidden mb-4">
          <div className="max-h-[300px] overflow-y-auto">
            {filteredTokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => {
                  onTokenSelect(token);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 hover:bg-yellow-300 border-b border-yellow-900 last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{token.icon}</span>
                  <div className="text-left">
                    <div className="font-medium text-yellow-900">{token.symbol}</div>
                    <div className="text-sm text-yellow-800">{token.name}</div>
                  </div>
                </div>
                <div className="text-yellow-800">{token.balance}</div>
              </button>
            ))}
          </div>
        </div>

        <button className="w-full py-2 bg-orange-300 border-2 border-yellow-900 rounded-lg text-yellow-900 font-semibold hover:bg-orange-400">
          Manage
        </button>
      </div>
    </div>
  );
}

TokenSelect.propTypes = {
  onClose: PropTypes.func.isRequired,
  onTokenSelect: PropTypes.func.isRequired
};