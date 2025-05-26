import React, { useState, useEffect } from 'react';

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

  // Icon components
  const icons = {
    heatingPad: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
        <circle cx="12" cy="16" r="1"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    nutrition: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    meditation: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5l-4.24 4.24m-6.52 0L4.5 5.5m15 15l-4.24-4.24m-6.52 0L4.5 18.5"/>
      </svg>
    ),
    water: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
      </svg>
    ),
    exercise: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6.5 6.5h11v11h-11z"/>
        <path d="M6.5 6.5L12 12l5.5-5.5"/>
        <path d="M18 6V2l-4 4-4-4v4"/>
      </svg>
    ),
    caffeine: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
        <line x1="6" y1="2" x2="6" y2="4"/>
        <line x1="10" y1="2" x2="10" y2="4"/>
        <line x1="14" y1="2" x2="14" y2="4"/>
      </svg>
    ),
    sleep: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
    ),
    tracking: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    supplements: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
    clothing: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z"/>
      </svg>
    ),
    omega: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="8" cy="8" r="6"/>
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18"/>
        <path d="M7 6h1l3 3 3-3h1"/>
      </svg>
    ),
    selfcare: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  };

  // Sample tips data (simulating API response)
  const tipsData = [
    {
      id: 1,
      title: "Manage Menstrual Cramps",
      content: "Apply a heating pad to your lower abdomen or lower back. Heat therapy helps relax the contracting muscles in your uterus that cause cramps.",
      category: "physical",
      phases: ["menstrual"],
      icon: "heatingPad"
    },
    {
      id: 2,
      title: "Combat Fatigue",
      content: "During your period, iron levels can drop causing fatigue. Include iron-rich foods like spinach, beans, and lean meats in your diet.",
      category: "nutrition",
      phases: ["menstrual"],
      icon: "nutrition"
    },
    {
      id: 3,
      title: "Mood Management",
      content: "Practice deep breathing exercises or meditation for 5-10 minutes when you feel mood swings. This can help regulate emotional responses.",
      category: "mental",
      phases: ["premenstrual", "menstrual"],
      icon: "meditation"
    },
    {
      id: 4,
      title: "Stay Hydrated",
      content: "Drinking plenty of water can reduce bloating during your period. Aim for at least 8 glasses of water daily.",
      category: "physical",
      phases: ["all"],
      icon: "water"
    },
    {
      id: 5,
      title: "Exercise Gently",
      content: "Light exercises like walking, swimming, or yoga can help alleviate menstrual pain by increasing blood circulation and releasing endorphins.",
      category: "physical",
      phases: ["menstrual"],
      icon: "exercise"
    },
    {
      id: 6,
      title: "Avoid Caffeine",
      content: "Caffeine can increase anxiety and tension, potentially making cramps worse. Consider herbal teas instead during your period.",
      category: "nutrition",
      phases: ["premenstrual", "menstrual"],
      icon: "caffeine"
    },
    {
      id: 7,
      title: "Get Enough Sleep",
      content: "Prioritize 7-9 hours of quality sleep, especially during your period when your body needs more rest to recover.",
      category: "physical",
      phases: ["all"],
      icon: "sleep"
    },
    {
      id: 8,
      title: "Track Your Symptoms",
      content: "Keep notes on symptoms throughout your cycle to identify patterns and better prepare for upcoming phases.",
      category: "mental",
      phases: ["all"],
      icon: "tracking"
    },
    {
      id: 9,
      title: "Consider Supplements",
      content: "Supplements like magnesium, vitamin B6, and calcium may help reduce PMS symptoms. Consult with a healthcare provider before starting.",
      category: "nutrition",
      phases: ["premenstrual"],
      icon: "supplements"
    },
    {
      id: 10,
      title: "Dress Comfortably",
      content: "Wear loose, comfortable clothing during your period to reduce pressure on your abdomen and improve comfort.",
      category: "physical",
      phases: ["menstrual"],
      icon: "clothing"
    },
    {
      id: 11,
      title: "Balance Hormones Naturally",
      content: "Foods rich in Omega-3 fatty acids like flaxseeds and walnuts can help balance hormones and reduce inflammation.",
      category: "nutrition",
      phases: ["ovulation", "follicular"],
      icon: "omega"
    },
    {
      id: 12,
      title: "Practice Self-Compassion",
      content: "Be kind to yourself during difficult days. Remember that it's okay to rest and take care of your needs.",
      category: "mental",
      phases: ["all"],
      icon: "selfcare"
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
    
    // Note: localStorage not available in this environment, using state only
    setSavedTips([]);
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
    // Note: localStorage not available in this environment
  };

  // Toggle active card for expanded view
  const toggleActiveCard = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">Menstrual Health Tips</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover helpful tips tailored to each phase of your cycle
          </p>
        </div>
        
        {/* Filters and Controls */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-pink-100">
          {/* Search Bar */}
          <div className="flex mb-6 relative">
            <input
              type="text"
              placeholder="Search for tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-pink-200 rounded-full text-base transition-all focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-200"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-6 mb-6">
            {/* Category Filter */}
            <div className="flex-1 min-w-64">
              <label className="block mb-2 font-medium text-pink-600">Category:</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'physical', 'nutrition', 'mental'].map(category => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-pink-600 text-white'
                        : 'bg-white border border-pink-200 text-gray-700 hover:bg-pink-50'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Phase Filter */}
            <div className="flex-1 min-w-64">
              <label className="block mb-2 font-medium text-pink-600">Cycle Phase:</label>
              <select
                value={cyclePhase}
                onChange={(e) => setCyclePhase(e.target.value)}
                className="w-full px-4 py-2 border border-pink-200 rounded-full bg-white text-sm cursor-pointer focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-200"
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
          
          {/* Saved Filter */}
          <div className="flex justify-end">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showSaved
                  ? 'bg-pink-600 text-white'
                  : 'bg-white border border-pink-200 text-gray-700 hover:bg-pink-50'
              }`}
              onClick={() => setShowSaved(!showSaved)}
            >
              {showSaved ? 'Show All Tips' : 'Show Saved Tips'}
              <svg className="w-4 h-4" fill={showSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Tips Content */}
        <div className="min-h-96">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-72">
              <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading tips for you...</p>
            </div>
          ) : filteredTips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTips.map((tip, index) => (
                <div
                  key={tip.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-2 ${
                    tip.category === 'physical' ? 'border-t-4 border-pink-400' :
                    tip.category === 'nutrition' ? 'border-t-4 border-blue-400' :
                    'border-t-4 border-purple-400'
                  } ${activeCard === tip.id ? 'scale-105 z-10' : ''}`}
                  onClick={() => toggleActiveCard(tip.id)}
                  style={{
                    animation: `fadeIn 0.5s ease-out forwards`,
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  <div className="p-6 pb-2 flex justify-between items-start relative">
                    <div className="mr-4 w-12 h-12 bg-gradient-to-br from-white to-gray-50 rounded-full flex items-center justify-center shadow-md border border-gray-100">
                      <div className={`w-6 h-6 ${
                        tip.category === 'physical' ? 'text-pink-500' :
                        tip.category === 'nutrition' ? 'text-blue-500' :
                        'text-purple-500'
                      }`}>
                        {icons[tip.icon]}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 flex-1">{tip.title}</h3>
                    <button
                      className={`p-2 transition-all hover:scale-110 ${
                        savedTips.includes(tip.id) ? 'text-pink-600' : 'text-gray-400 hover:text-pink-600'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveTip(tip.id);
                      }}
                    >
                      <svg className="w-5 h-5" fill={savedTips.includes(tip.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed mb-4">{tip.content}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        tip.category === 'physical' ? 'bg-pink-100 text-pink-700' :
                        tip.category === 'nutrition' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {tip.category}
                      </span>
                      {tip.phases.map(phase => 
                        phase !== 'all' && (
                          <span key={phase} className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            {phase}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-600 mb-2">No tips match your search</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setCyclePhase('all');
                  setShowSaved(false);
                }}
                className="bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition-all hover:-translate-y-1"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Quick Tips Floating Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-all hover:scale-110 flex flex-col items-center justify-center w-16 h-16">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span className="text-xs font-medium">Ask AI</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Tips;