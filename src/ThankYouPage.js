import { useTokenVerification } from './useTokenVerification';

function ThankYouPage() {
    useTokenVerification();

    return (
        <div>
            <h2>Thank You</h2>
            <p>Your order has been placed successfully.</p>
            <p>Thank you for shopping with us!</p>
        </div>
    );
}

export default ThankYouPage;
