import React, { useState } from 'react';
import './Reviews.css';

const tabData = [
  { id: 'description', label: 'DESCRIPTION' },
  { id: 'reviews', label: 'REVIEWS' },
  { id: 'questions', label: 'ANY QUESTIONS?' },
];

const paragraphText = `Faded short sleeves t-shirt with high neckline. Soft and stretchy material for a comfortable fit. Accessorize with a straw hat and you're ready for summer!`;

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

const reviewsData = [
  {
    name: 'Jeeva S.',
    rating: 5,
    comment: 'Absolutely loved it! Amazing packaging and fast delivery.',
  },
  {
    name: 'Ananya P.',
    rating: 4,
    comment: 'Product quality is great. Would recommend!',
  },
];

const questionsData = [
  {
    question: 'Is this available in other colors?',
    answer: 'Currently, this product is available in black and white only.',
  },
  {
    question: 'Does this come with a warranty?',
    answer: 'Yes, it includes a 1-year manufacturer warranty.',
  },
];

function Reviews({
  paragraphText = "Default description...",
  unorderedList = [],
  orderedList = [],
  reviewsData = [],
  questionsData = [],
}) {
  const [activeTab, setActiveTab] = useState("description");
  const [newReview, setNewReview] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);

  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      setSubmittedReviews([...submittedReviews, { name: "You", rating: 5, comment: newReview }]);
      setNewReview("");
    }
  };

  const handleQuestionSubmit = () => {
    if (newQuestion.trim()) {
      setSubmittedQuestions([...submittedQuestions, { question: newQuestion, answer: "Pending answer..." }]);
      setNewQuestion("");
    }
  };

  return (
    <div className="description-container">
      <div className="tabs">
        {tabData.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "description" && (
        <div className="description-content">
          <p className="intro-text">{paragraphText}</p>
          <h4>Sample Unordered List</h4>
          <ul>{unorderedList.map((item, i) => <li key={i}>{item}</li>)}</ul>
          <h4>Sample Ordered List</h4>
          <ol>{orderedList.map((item, i) => <li key={i}>{item}</li>)}</ol>
          <h4>Sample Paragraph Text</h4>
          <blockquote>{paragraphText} {paragraphText}</blockquote>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="reviews-section">
          <h4 className="section-heading">Customer Reviews</h4>
          {[...reviewsData, ...submittedReviews].map((rev, idx) => (
            <div key={idx} className="review-item">
              <strong className="review-author">{rev.name}</strong> - <span className="review-stars">{'⭐'.repeat(rev.rating)}</span>
              <p className="review-text">{rev.comment}</p>
            </div>
          ))}
          <textarea
            className="input-area"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review..."
          />
          <button className="submit-btn" onClick={handleReviewSubmit}>Submit Review</button>
        </div>
      )}

      {activeTab === "questions" && (
        <div className="questions-section">
          <h4 className="section-heading">Customer Questions</h4>
          {[...questionsData, ...submittedQuestions].map((q, idx) => (
            <div key={idx} className="question-item">
              <p className="question-text"><strong>Q:</strong> {q.question}</p>
              <p className="answer-text"><strong>A:</strong> {q.answer}</p>
            </div>
          ))}
          <textarea
            className="input-area"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask a question..."
          />
          <button className="submit-btn" onClick={handleQuestionSubmit}>Submit Question</button>
        </div>
      )}
    </div>
  );
}
export default Reviews;