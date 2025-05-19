import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, ChevronDown, ChevronUp, Activity, Clock, AlertCircle, Droplet, Info } from 'lucide-react';
import './Insights.css';

const Insights = () => {
  const [cycleData, setCycleData] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState('6months');
  
  // Mock data for insights
  useEffect(() => {
    // In a real app, this would fetch from an API or localStorage
    setTimeout(() => {
      const mockData = {
        cycles: [
          { id: 1, startDate: '2025-01-03', endDate: '2025-01-08', length: 28 },
          { id: 2, startDate: '2025-01-31', endDate: '2025-02-05', length: 29 },
          { id: 3, startDate: '2025-03-01', endDate: '2025-03-06', length: 27 },
          { id: 4, startDate: '2025-03-28', endDate: '2025-04-02', length: 28 },
          { id: 5, startDate: '2025-04-26', endDate: '2025-05-01', length: 28 },
        ],
        symptoms: {
          'Cramps': 78,
          'Bloating': 65,
          'Headache': 45,
          'Breast Tenderness': 60,
          'Backache': 35,
          'Fatigue': 85,
          'Acne': 40,
          'Nausea': 15
        },
        moods: {
          'Happy': 20,
          'Calm': 25,
          'Sad': 15,
          'Irritated': 25,
          'Tired': 10,
          'Anxious': 5
        },
        flowData: {
          'Light': 35,
          'Medium': 45,
          'Heavy': 20
        },
        trends: [
          { month: 'Dec', cycleLength: 28, periodLength: 5 },
          { month: 'Jan', cycleLength: 29, periodLength: 6 },
          { month: 'Feb', cycleLength: 27, periodLength: 6 },
          { month: 'Mar', cycleLength: 28, periodLength: 5 },
          { month: 'Apr', cycleLength: 28, periodLength: 6 },
          { month: 'May', cycleLength: 28, periodLength: 6 }
        ]
      };
      
      setCycleData(mockData);
      setIsLoading(false);
    }, 1500); // Simulate loading delay
  }, []);

  // Custom color scheme for charts
  const COLORS = ['#ff8fab', '#ffc2d1', '#ffb3c6', '#ff5d8f', '#ff477e'];
  const MOOD_COLORS = {
    'Happy': '#ffb5a7',
    'Calm': '#fcd5ce',
    'Sad': '#f8edeb',
    'Irritated': '#f9dcc4',
    'Tired': '#fec89a',
    'Anxious': '#e8e8e4'
  };
  const FLOW_COLORS = {
    'Light': '#ffc2d1',
    'Medium': '#ff8fab',
    'Heavy': '#ff5d8f'
  };

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };
  
  const changeTimeFrame = (frame) => {
    setIsLoading(true);
    setTimeFrame(frame);
    
    // Simulate loading delay when changing time frame
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Prepare data for charts
  const prepareMoodData = () => {
    return Object.keys(cycleData?.moods || {}).map(mood => ({
      name: mood,
      value: cycleData?.moods[mood]
    }));
  };

  const prepareSymptomData = () => {
    return Object.keys(cycleData?.symptoms || {}).map(symptom => ({
      name: symptom,
      value: cycleData?.symptoms[symptom]
    }));
  };

  const prepareFlowData = () => {
    return Object.keys(cycleData?.flowData || {}).map(flow => ({
      name: flow,
      value: cycleData?.flowData[flow]
    }));
  };

  // Calculate cycle statistics
  const calculateStats = () => {
    if (!cycleData || !cycleData.cycles || cycleData.cycles.length === 0) {
      return {
        avgCycleLength: 0,
        avgPeriodLength: 0,
        regularity: 'Unknown'
      };
    }

    const cycleLengths = cycleData.cycles.map(cycle => cycle.length);
    const avgCycleLength = cycleLengths.reduce((sum, length) => sum + length, 0) / cycleLengths.length;
    
    // Calculate average period length (assume each period is endDate - startDate + 1 days)
    const periodLengths = cycleData.cycles.map(cycle => {
      const start = new Date(cycle.startDate);
      const end = new Date(cycle.endDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    });
    
    const avgPeriodLength = periodLengths.reduce((sum, length) => sum + length, 0) / periodLengths.length;
    
    // Check regularity (if cycle lengths are within 2 days of each other)
    const maxDiff = Math.max(...cycleLengths) - Math.min(...cycleLengths);
    const regularity = maxDiff <= 3 ? 'Regular' : maxDiff <= 7 ? 'Somewhat Regular' : 'Irregular';
    
    return {
      avgCycleLength: avgCycleLength.toFixed(1),
      avgPeriodLength: avgPeriodLength.toFixed(1),
      regularity
    };
  };

  // Loading animation
  if (isLoading) {
    return (
      <div className="insights-loading">
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <Droplet size={40} />
        </motion.div>
        <h3>Loading your insights...</h3>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <motion.div 
      className="insights-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        Your Period Tracker Summary
      </motion.h1>
      
      <div className="time-frame-selector">
        <span>Show data from:</span>
        <motion.select 
          whileHover={{ scale: 1.05 }}
          onChange={(e) => changeTimeFrame(e.target.value)}
          value={timeFrame}
        >
          <option value="3months">Last 3 months</option>
          <option value="6months">Last 6 months</option>
          <option value="12months">Last 12 months</option>
        </motion.select>
      </div>
      
      <div className="insights-tab-content">
        <div className="stats-cards">
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.02 }}
          >
            <Clock size={24} />
            <div className="stat-info">
              <h3>Days Between Periods</h3>
              <p className="stat-value">{stats.avgCycleLength} days</p>
              <p className="stat-explanation">Your cycle is the number of days from the start of one period to the start of the next</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.02 }}
          >
            <Droplet size={24} />
            <div className="stat-info">
              <h3>Period Length</h3>
              <p className="stat-value">{stats.avgPeriodLength} days</p>
              <p className="stat-explanation">How long your bleeding typically lasts</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.02 }}
          >
            <Activity size={24} />
            <div className="stat-info">
              <h3>How Regular Are You?</h3>
              <p className="stat-value">{stats.regularity}</p>
              <p className="stat-explanation">
                {stats.regularity === 'Regular' ? 
                  'Your periods come very predictably' : 
                  stats.regularity === 'Somewhat Regular' ? 
                  'Your periods come with some variation' : 
                  'Your periods vary quite a bit in timing'}
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className={`insight-card ${expandedCard === 'cycle-trends' ? 'expanded' : ''}`}
          whileHover={{ scale: expandedCard === 'cycle-trends' ? 1 : 1.01 }}
        >
          <div 
            className="card-header"
            onClick={() => toggleCard('cycle-trends')}
          >
            <h3><Activity size={20} /> How Your Cycle Changes Over Time</h3>
            {expandedCard === 'cycle-trends' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          <AnimatePresence>
            {expandedCard === 'cycle-trends' && (
              <motion.div 
                className="card-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={cycleData.trends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f8edeb" />
                      <XAxis dataKey="month" stroke="#ff8fab" />
                      <YAxis stroke="#ff8fab" domain={[25, 32]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff9f9', 
                          borderColor: '#ffb3c6',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(255, 141, 175, 0.15)'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cycleLength" 
                        stroke="#ff5d8f" 
                        strokeWidth={3} 
                        dot={{ fill: '#ff5d8f', strokeWidth: 2 }}
                        activeDot={{ r: 8, fill: '#ff5d8f' }}
                        name="Days between periods"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="periodLength" 
                        stroke="#ffb3c6" 
                        strokeWidth={3} 
                        dot={{ fill: '#ffb3c6', strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: '#ffb3c6' }}
                        name="Days of bleeding"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="insight-analysis">
                  <h4>What This Means For You</h4>
                  <p>Your period comes about every {stats.avgCycleLength} days. This is normal - most people's periods come every 21-35 days.</p>
                  <p>Your bleeding usually lasts {stats.avgPeriodLength} days, which is normal. Most periods last 3-7 days.</p>
                  {stats.regularity === 'Regular' ? (
                    <p>Your periods are very predictable, making it easier to plan ahead.</p>
                  ) : stats.regularity === 'Somewhat Regular' ? (
                    <p>Your periods have some variation but still follow a pattern you can predict.</p>
                  ) : (
                    <p>Your periods change from month to month. This is common and can be caused by stress, sickness, or lifestyle changes.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="chart-cards">
          <motion.div 
            className={`insight-card ${expandedCard === 'symptoms' ? 'expanded' : ''}`}
            whileHover={{ scale: expandedCard === 'symptoms' ? 1 : 1.01 }}
          >
            <div 
              className="card-header"
              onClick={() => toggleCard('symptoms')}
            >
              <h3><AlertCircle size={20} /> Your Common Symptoms</h3>
              {expandedCard === 'symptoms' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            <AnimatePresence>
              {expandedCard === 'symptoms' && (
                <motion.div 
                  className="card-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={prepareSymptomData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {prepareSymptomData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'How often you feel this']}
                          contentStyle={{ 
                            backgroundColor: '#fff9f9', 
                            borderColor: '#ffb3c6',
                            borderRadius: '8px' 
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="insight-analysis">
                    <h4>Body Changes You Experience</h4>
                    <p>You feel tired and have cramps most often during your period. Try to rest more and use pain relief when needed.</p>
                    <p>You also get bloating and breast tenderness, usually 3-5 days before your period starts.</p>
                    <div className="symptom-tip">
                      <Info size={16} />
                      <p>Tip: Keep tracking your symptoms to spot patterns and be prepared for your next period.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div 
            className={`insight-card ${expandedCard === 'moods' ? 'expanded' : ''}`}
            whileHover={{ scale: expandedCard === 'moods' ? 1 : 1.01 }}
          >
            <div 
              className="card-header"
              onClick={() => toggleCard('moods')}
            >
              <h3><AlertCircle size={20} /> Your Mood Changes</h3>
              {expandedCard === 'moods' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            <AnimatePresence>
              {expandedCard === 'moods' && (
                <motion.div 
                  className="card-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={prepareMoodData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {prepareMoodData().map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={MOOD_COLORS[entry.name]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'How often you feel this']}
                          contentStyle={{ 
                            backgroundColor: '#fff9f9', 
                            borderColor: '#ffb3c6',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="insight-analysis">
                    <h4>How You Feel Throughout Your Cycle</h4>
                    <p>You often feel calm but sometimes irritated, especially 7-10 days before your period.</p>
                    <p>You tend to feel happiest in the middle of your cycle (days 13-16).</p>
                    <div className="mood-tip">
                      <Info size={16} />
                      <p>Tip: Mood changes during your cycle are normal because of hormones. Knowing your patterns helps you prepare.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        <motion.div 
          className={`insight-card ${expandedCard === 'flow' ? 'expanded' : ''}`}
          whileHover={{ scale: expandedCard === 'flow' ? 1 : 1.01 }}
        >
          <div 
            className="card-header"
            onClick={() => toggleCard('flow')}
          >
            <h3><Droplet size={20} /> Your Flow Heaviness</h3>
            {expandedCard === 'flow' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          <AnimatePresence>
            {expandedCard === 'flow' && (
              <motion.div 
                className="card-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={prepareFlowData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {prepareFlowData().map((entry) => (
                          <Cell key={`cell-${entry.name}`} fill={FLOW_COLORS[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'How often you experience this']}
                        contentStyle={{ 
                          backgroundColor: '#fff9f9', 
                          borderColor: '#ffb3c6',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="insight-analysis">
                  <h4>How Heavy Your Period Is</h4>
                  <p>Your flow is usually medium (45% of the time) to light (35%), with heavier bleeding about 20% of the time, usually on days 2-3 of your period.</p>
                  <p>Your flow stays about the same from month to month, which is a good sign of health.</p>
                  <div className="flow-tip">
                    <Info size={16} />
                    <p>Tip: If your flow changes a lot (becomes much heavier or lighter), you might want to talk to a doctor.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Insights;