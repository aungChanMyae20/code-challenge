interface ToastProps {
    message: string;
    onClose: () => void;
}

function Toast({ message, onClose }:ToastProps) {
    return (
        <div className="toast" role="status" aria-live="polite">
            <span className="toast__message">{message}</span>
            
            <button className="toast__close" type="button" onClick={onClose} aria-label="Close notification">
                ×
            </button>
        </div>
    );
}

export default Toast;
