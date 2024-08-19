import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState({
    coding: false,
    marketing: false,
    design: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setInterests(prevInterests => ({
        ...prevInterests,
        [name]: checked
      }));
    } else {
      name === 'name' ? setName(value) : setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const getSelectedInterests = () => {
    return Object.entries(interests)
      .filter(([_, isChecked]) => isChecked)
      .map(([interest]) => interest.charAt(0).toUpperCase() + interest.slice(1))
      .join(', ');
  };

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </label>
          <fieldset>
            <legend>Select your interests:</legend>
            <label>
              <input
                name="coding"
                type="checkbox"
                checked={interests.coding}
                onChange={handleChange}
              />
              Coding
            </label>
            <label>
              <input
                name="marketing"
                type="checkbox"
                checked={interests.marketing}
                onChange={handleChange}
              />
              Marketing
            </label>
            <label>
              <input
                name="design"
                type="checkbox"
                checked={interests.design}
                onChange={handleChange}
              />
              Design
            </label>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Thank you for signing up, {name}!</p>
          <p>You have expressed interest in: {getSelectedInterests()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
