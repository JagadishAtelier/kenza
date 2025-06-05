import React, { useState } from 'react';
import './Reviews.css';

const tabData = [
  { id: 'description', label: 'DESCRIPTION' },
  { id: 'reviews', label: 'REVIEWS' },
  { id: 'questions', label: 'ANY QUESTIONS?' },
];
const additionalInformation = [
    'Is Discontinued By Manufacturer: No',
'Rated: U/A (Parental Guidance)',
'Language: English',
'Package Dimensions: 18.03 x 13.76 x 1.48 cm; 80 Grams',
'Director: Joss Whedon',
'Media Format: Anamorphic, Dolby',
'Run time: 2 hours and 21 minutes',
'Release date: 13 September 2021',
'Actors: Robert Downey Jr, Chris Evans, Mark Ruffalo, Scarlett Johansson, Chris Hemsworth',
'Country of Origin: India',
'Manufacturer: Sony DADC',
'Item Weight: 80 g',
]
const aboutItemContent = [
  { head: 'Brand', text: 'Ridex Gamestore' },
  { head: 'Colour', text: '04 L.I.I.T - Party in a tiny pack!' },
  { head: 'Media Format:', text: 'Anamorphic, Dolby' },
  { head: 'Release date:', text: '13 September 2021' },
  { head: 'Number of discs', text: '1' },
  { head: 'Item Dimensions LxWxH', text: '24.7 x 10.6 x 24.7 Centimeters' },
  { head: 'Item Weight', text: '690 g' },
];

const unorderedList = [
  'Comodous in tempor ullamcorper miaculis',
  'Pellentesque vitae neque mollis urna mattis laoreet.',
  'Divamus sit amet purus justo.',
  'Proin molestie egestas orci ac suscipit risus posuere loremou.',
];

const orderedList = [
  'Comodous in tempor ullamcorper miaculis',
  'Pellentesque vitae neque mollis urna mattis laoreet.',
  'Divamus sit amet purus justo.',
  'Proin molestie egestas orci ac suscipit risus posuere loremous',
];

const paragraphText = `Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat and you're ready for summer!`;

function Reviews() {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="description-container">
      <div className="tabs">
        {tabData.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'description' && (
        <div className="description-content">
          <p className="intro-text">{paragraphText}</p>

          <h4>Sample Unordered List</h4>
          <ul>
            {unorderedList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h4>Sample Ordered List</h4>
          <ol>
            {orderedList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>

          <h4>Sample Paragraph Text</h4>
          <blockquote>
            {paragraphText} {paragraphText}
          </blockquote>
        </div>
      )}
      {activeTab !== 'description' && (
        <div className="placeholder">
          <p>Content for "{tabData.find(tab => tab.id === activeTab).label}" goes here.</p>
        </div>
      )}
    </div>
  );
}

export default Reviews;
