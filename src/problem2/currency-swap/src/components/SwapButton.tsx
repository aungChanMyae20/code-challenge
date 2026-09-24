import { ArrowDownUp } from "lucide-react";

interface SwapButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

function SwapButton({ onClick, disabled = false }:SwapButtonProps) {
    return (
        <button
            className="swap-button"
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label="Swap currencies"
            title="Swap currencies"
        >
            <ArrowDownUp size={18} />
        </button>
    );
}

export default SwapButton;
