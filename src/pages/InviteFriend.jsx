import UserTopBar from "@/components/UI/UserHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InviteFriend = () => {
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email.trim()) {
      setMessage('Bitte gib eine E-Mail-Adresse ein.');
      return;
    }
    if (!privacyAccepted) {
      setMessage('Du musst die Datenschutzerklärung akzeptieren.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    try {
      setIsLoading(true);
      setMessage('');
      const token = localStorage.getItem('token');

      const response = await fetch('/invite/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: email.trim(),
          message: 'Dein Freund lädt dich zu Partner Mood ein.'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Fehler beim Senden der Einladung');
      }

      setMessage('Einladung erfolgreich versendet! 🎉');
      setEmail('');
      setPrivacyAccepted(false);

      setTimeout(() => navigate("/CreateCirclePage"), 1500);

    } catch (err) {
      console.error('Error sending invitation:', err);
      setMessage(`Fehler: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCircleClick = () => {
    navigate("/AfterLoginCreate");
  };
  
  return (
    <div className="relative min-h-screen bg-transparent flex flex-col items-center justify-center p-5">
      <UserTopBar />

      <div className="w-full max-w-md bg-white/30 backdrop-blur-md p-8 rounded-xl flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Invite a Friend!
        </h1>
        <label className="block mb-2 text-center text-gray-800 font-medium">
          Sharing is Caring.
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="yourfriendsemail@example.com"
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:border-white-500 focus:outline-none transition-colors"
        />

        <label className="flex items-center text-sm gap-2">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            disabled={isLoading}
            className="scale-125"
          /><span className="text-left sm:text-left break-words">
          I read the <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-black hover:underline">terms of use and privacy policy</a> and accept them.
         </span></label>

        {message && (
          <div className={`p-3 rounded-md text-center ${
            message.includes('versendet')
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!email.trim() || !privacyAccepted || isLoading}
          className={`w-full py-3 text-lg font-semibold rounded-lg transition-all ${
            (!email.trim() || !privacyAccepted || isLoading)
              ? 'bg-gray-400 text-white cursor-not-allowed opacity-60'
              : 'bg-indigo-500 text-white hover:bg-indigo-600 cursor-pointer'
          }`}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>

        <button
          onClick={handleCreateCircleClick}
          className="w-full py-3 text-lg font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600"
        >
          Create a Circle
        </button>
      </div>
    </div>
  );
};

export default InviteFriend;
