import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function WalkthroughSection() {
  const [sections, setSections] = useState([]);

  const addSection = () => {
    setSections([...sections, { title: '', subpoints: [] }]);
  };

  const addSubpoint = (index) => {
    const newSections = [...sections];
    newSections[index].subpoints.push({ text: '', image: null });
    setSections(newSections);
  };

  return (
    <div>
      {sections.map((section, idx) => (
        <div key={idx}>
          <TextField
            label={`Section ${idx + 1} Title`}
            value={section.title}
            onChange={(e) => {
              const newSections = [...sections];
              newSections[idx].title = e.target.value;
              setSections(newSections);
            }}
          />
          {section.subpoints.map((subpoint, sIdx) => (
            <div key={sIdx}>
              <TextField
                label={`Subpoint ${String.fromCharCode(97 + sIdx)}`}
                value={subpoint.text}
                onChange={(e) => {
                  const newSections = [...sections];
                  newSections[idx].subpoints[sIdx].text = e.target.value;
                  setSections(newSections);
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const newSections = [...sections];
                  newSections[idx].subpoints[sIdx].image = e.target.files[0];
                  setSections(newSections);
                }}
              />
            </div>
          ))}
          <Button onClick={() => addSubpoint(idx)}>Add Subpoint</Button>
        </div>
      ))}
      <Button onClick={addSection}>Add Section</Button>
    </div>
  );
}

export default WalkthroughSection;
