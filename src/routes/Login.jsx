import { useState } from 'react';
import TokenTrader from '../components/TokenTrader';

function Login() {
    const [showTrader, setShowTrader] = useState(false);

    const handleTrade = ({ fromAmount, fromToken, toToken }) => {
        console.log('Trading:', { fromAmount, fromToken, toToken });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <button 
                onClick={() => setShowTrader(true)}
                className="px-4 py-2 bg-orange-300 border-2 border-yellow-900 rounded text-yellow-900"
            >
                Open Trader
            </button>

            {showTrader && (
                <TokenTrader 
                    balance={1000}
                    onTrade={handleTrade}
                    onClose={() => setShowTrader(false)}
                />
            )}
        </div>
    );
}

export default Login;