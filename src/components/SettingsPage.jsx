import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Settings page: Language selection and currency demo.
function SettingsPage() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [amount, setAmount] = useState(100);
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('EUR');
  const [conversion, setConversion] = useState(null);

  // Fetch languages from REST Countries API.
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all?fields=languages')
      .then(res => {
        const allLangs = new Set();
        res.data.forEach(country => {
          if (country.languages) {
            Object.values(country.languages).forEach(lang => allLangs.add(lang));
          }
        });
        setLanguages(Array.from(allLangs));
      })
      .catch(() => toast.error('Failed to load languages'));
  }, []);

  // Handle conversion.
  const handleConvert = () => {
    axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`)
      .then(res => setConversion(res.data.rates[toCur]))
      .catch(() => toast.error('Conversion failed'));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Settings</h2>
      <h3>Select Language</h3>
      <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
        {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
      </select>
      <h3>Currency Converter Demo</h3>
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <input value={fromCur} onChange={e => setFromCur(e.target.value)} placeholder="From" />
      <input value={toCur} onChange={e => setToCur(e.target.value)} placeholder="To" />
      <button onClick={handleConvert}>Convert</button>
      {conversion && <p>Result: {conversion} {toCur}</p>}
      <h3>Feedback</h3>
      <textarea placeholder="Your feedback..."></textarea>
      <button onClick={() => toast.success('Feedback submitted!')}>Submit</button>
    </div>
  );
}

export default SettingsPage;