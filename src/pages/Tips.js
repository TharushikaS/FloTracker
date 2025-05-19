import React, { useState, useEffect } from 'react';
import './Tips.css';

const Tips = () => {
  // State for tips data
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cyclePhase, setCyclePhase] = useState('menstrual');
  const [savedTips, setSavedTips] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample tips data (simulating API response)
  const tipsData = [
    {
      id: 1,
      title: "Manage Menstrual Cramps",
      content: "Apply a heating pad to your lower abdomen or lower back. Heat therapy helps relax the contracting muscles in your uterus that cause cramps.",
      category: "physical",
      phases: ["menstrual"],
      imageUrl: "/images/heating-pad.svg"
    },
    {
      id: 2,
      title: "Combat Fatigue",
      content: "During your period, iron levels can drop causing fatigue. Include iron-rich foods like spinach, beans, and lean meats in your diet.",
      category: "nutrition",
      phases: ["menstrual"],
      imageUrl: "/images/nutrition.svg"
    },
    {
      id: 3,
      title: "Mood Management",
      content: "Practice deep breathing exercises or meditation for 5-10 minutes when you feel mood swings. This can help regulate emotional responses.",
      category: "mental",
      phases: ["premenstrual", "menstrual"],
      imageUrl: "/images/meditation.svg"
    },
    {
      id: 4,
      title: "Stay Hydrated",
      content: "Drinking plenty of water can reduce bloating during your period. Aim for at least 8 glasses of water daily.",
      category: "physical",
      phases: ["all"],
      imageUrl: "/images/water.svg"
    },
    {
      id: 5,
      title: "Exercise Gently",
      content: "Light exercises like walking, swimming, or yoga can help alleviate menstrual pain by increasing blood circulation and releasing endorphins.",
      category: "physical",
      phases: ["menstrual"],
      imageUrl: "/images/exercise.svg"
    },
    {
      id: 6,
      title: "Avoid Caffeine",
      content: "Caffeine can increase anxiety and tension, potentially making cramps worse. Consider herbal teas instead during your period.",
      category: "nutrition",
      phases: ["premenstrual", "menstrual"],
      imageUrl: "/images/caffeine.svg"
    },
    {
      id: 7,
      title: "Get Enough Sleep",
      content: "Prioritize 7-9 hours of quality sleep, especially during your period when your body needs more rest to recover.",
      category: "physical",
      phases: ["all"],
      imageUrl: "/images/sleep.svg"
    },
    {
      id: 8,
      title: "Track Your Symptoms",
      content: "Keep notes on symptoms throughout your cycle to identify patterns and better prepare for upcoming phases.",
      category: "mental",
      phases: ["all"],
      imageUrl: "/images/tracking.svg"
    },
    {
      id: 9,
      title: "Consider Supplements",
      content: "Supplements like magnesium, vitamin B6, and calcium may help reduce PMS symptoms. Consult with a healthcare provider before starting.",
      category: "nutrition",
      phases: ["premenstrual"],
      imageUrl: "/images/supplements.svg"
    },
    {
      id: 10,
      title: "Dress Comfortably",
      content: "Wear loose, comfortable clothing during your period to reduce pressure on your abdomen and improve comfort.",
      category: "physical",
      phases: ["menstrual"],
      imageUrl: "/images/clothing.svg"
    },
    {
      id: 11,
      title: "Balance Hormones Naturally",
      content: "Foods rich in Omega-3 fatty acids like flaxseeds and walnuts can help balance hormones and reduce inflammation.",
      category: "nutrition",
      phases: ["ovulation", "follicular"],
      imageUrl: "/images/omega.svg"
    },
    {
      id: 12,
      title: "Practice Self-Compassion",
      content: "Be kind to yourself during difficult days. Remember that it's okay to rest and take care of your needs.",
      category: "mental",
      phases: ["all"],
      imageUrl: "/images/selfcare.svg"
    }
  ];

  // Simulating API fetch
  useEffect(() => {
    const fetchTips = async () => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setTips(tipsData);
        setFilteredTips(tipsData);
        setIsLoading(false);
      }, 800);
    };

    fetchTips();
    
    // Retrieve saved tips from localStorage
    const savedTipsFromStorage = localStorage.getItem('savedTips');
    if (savedTipsFromStorage) {
      setSavedTips(JSON.parse(savedTipsFromStorage));
    }
  }, []);

  // Filter tips based on category and search query
  useEffect(() => {
    let results = tips;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(tip => tip.category === selectedCategory);
    }
    
    // Filter by cycle phase
    if (cyclePhase !== 'all') {
      results = results.filter(tip => 
        tip.phases.includes(cyclePhase) || tip.phases.includes('all')
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(tip => 
        tip.title.toLowerCase().includes(query) || 
        tip.content.toLowerCase().includes(query)
      );
    }
    
    // Filter saved tips
    if (showSaved) {
      results = results.filter(tip => 
        savedTips.includes(tip.id)
      );
    }
    
    setFilteredTips(results);
  }, [selectedCategory, searchQuery, cyclePhase, showSaved, tips, savedTips]);

  // Handle saving/unsaving a tip
  const handleSaveTip = (id) => {
    let updatedSavedTips;
    
    if (savedTips.includes(id)) {
      updatedSavedTips = savedTips.filter(tipId => tipId !== id);
    } else {
      updatedSavedTips = [...savedTips, id];
    }
    
    setSavedTips(updatedSavedTips);
    localStorage.setItem('savedTips', JSON.stringify(updatedSavedTips));
  };

  // Toggle active card for expanded view
  const toggleActiveCard = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  // Animation for cards
  const cardAnimation = (index) => {
    return {
      animation: `fadeIn 0.5s ease-out forwards`,
      animationDelay: `${index * 0.1}s`,
      opacity: 0
    };
  };

  return (
    <div className="tips-container">
      <div className="tips-header">
        <h1>Menstrual Health Tips</h1>
        <p>Discover helpful tips tailored to each phase of your cycle</p>
      </div>
      
      {/* Filters and Controls */}
      <div className="tips-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        
        <div className="filter-container">
          <div className="category-filter">
            <label>Category:</label>
            <div className="button-group">
              <button 
                className={selectedCategory === 'all' ? 'active' : ''} 
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              <button 
                className={selectedCategory === 'physical' ? 'active' : ''} 
                onClick={() => setSelectedCategory('physical')}
              >
                Physical
              </button>
              <button 
                className={selectedCategory === 'nutrition' ? 'active' : ''} 
                onClick={() => setSelectedCategory('nutrition')}
              >
                Nutrition
              </button>
              <button 
                className={selectedCategory === 'mental' ? 'active' : ''} 
                onClick={() => setSelectedCategory('mental')}
              >
                Mental
              </button>
            </div>
          </div>
          
          <div className="phase-filter">
            <label>Cycle Phase:</label>
            <select 
              value={cyclePhase} 
              onChange={(e) => setCyclePhase(e.target.value)}
            >
              <option value="all">All Phases</option>
              <option value="menstrual">Menstrual Phase</option>
              <option value="follicular">Follicular Phase</option>
              <option value="ovulation">Ovulation Phase</option>
              <option value="luteal">Luteal Phase</option>
              <option value="premenstrual">Premenstrual Phase</option>
            </select>
          </div>
        </div>
        
        <div className="saved-filter">
          <button 
            className={showSaved ? 'active' : ''} 
            onClick={() => setShowSaved(!showSaved)}
          >
            {showSaved ? 'Show All Tips' : 'Show Saved Tips'}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={showSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Tips content */}
      <div className="tips-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading tips for you...</p>
          </div>
        ) : filteredTips.length > 0 ? (
          <div className="tips-grid">
            {filteredTips.map((tip, index) => (
              <div 
                key={tip.id} 
                className={`tip-card ${tip.category} ${activeCard === tip.id ? 'expanded' : ''}`}
                onClick={() => toggleActiveCard(tip.id)}
                style={cardAnimation(index)}
              >
                <div className="tip-header">
                  <div className="tip-icon">
                    <img src={tip.imageUrl} alt={tip.title} />
                  </div>
                  <h3>{tip.title}</h3>
                  <button 
                    className={`save-button ${savedTips.includes(tip.id) ? 'saved' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveTip(tip.id);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={savedTips.includes(tip.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                </div>
                <div className="tip-content">
                  <p>{tip.content}</p>
                  <div className="tip-tags">
                    <span className="tip-category">{tip.category}</span>
                    {tip.phases.map(phase => 
                      phase !== 'all' && <span key={phase} className="tip-phase">{phase}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <img src="/images/no-results.svg" alt="No results found" />
            <h3>No tips match your search</h3>
            <p>Try adjusting your filters or search query</p>
            <button onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setCyclePhase('all');
              setShowSaved(false);
            }}>Reset Filters</button>
          </div>
        )}
      </div>

      {/* Quick Tips Floating Button */}
      <div className="quick-tip-button">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <span>Daily Tip</span>
        </button>
      </div>
    </div>
  );
};

export default Tips;