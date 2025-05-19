import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Droplet, Thermometer, Moon, Activity, Heart, Info } from 'lucide-react';
import './Tracker.css';

const Tracker = () => {
  // State for current date and selected date
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cycleData, setCycleData] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [mood, setMood] = useState('');
  const [flow, setFlow] = useState('');
  const [showTip, setShowTip] = useState(false);
  
  // Mock data for cycle prediction
  const [cycleHistory] = useState([
    { startDate: new Date(2025, 3, 5), endDate: new Date(2025, 3, 10) },
    { startDate: new Date(2025, 4, 3), endDate: new Date(2025, 4, 8) },
  ]);

  const [predictedPeriod, setPredictedPeriod] = useState({
    nextStart: new Date(2025, 5, 1),
    nextEnd: new Date(2025, 5, 6),
    fertile: { start: new Date(2025, 4, 19), end: new Date(2025, 4, 23) }
  });

  // Symptoms list
  const symptomOptions = [
    'Cramps', 'Bloating', 'Headache', 'Acne', 
    'Backache', 'Fatigue', 'Breast Tenderness', 'Nausea'
  ];

  // Mood options
  const moodOptions = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😡', label: 'Irritated' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😰', label: 'Anxious' }
  ];

  // Flow options
  const flowOptions = [
    { label: 'None', color: '#ffffff' },
    { label: 'Light', color: '#ffc2d1' },
    { label: 'Medium', color: '#ff8fab' },
    { label: 'Heavy', color: '#ff5d8f' }
  ];

  useEffect(() => {
    // Load any saved data for the selected date
    const fetchDataForDate = (date) => {
      // In a real app, this would be an API call
      // For now we'll use mock data
      const dateStr = date.toISOString().split('T')[0];
      const mockStorage = localStorage.getItem('cycleData');
      
      if (mockStorage) {
        const parsedData = JSON.parse(mockStorage);
        if (parsedData[dateStr]) {
          setCycleData(parsedData[dateStr]);
          setSymptoms(parsedData[dateStr].symptoms || []);
          setMood(parsedData[dateStr].mood || '');
          setFlow(parsedData[dateStr].flow || '');
        } else {
          setCycleData({});
          setSymptoms([]);
          setMood('');
          setFlow('');
        }
      }
    };

    fetchDataForDate(selectedDate);
  }, [selectedDate]);

  const saveData = () => {
    // Save the data for the selected date
    const dateStr = selectedDate.toISOString().split('T')[0];
    const mockStorage = localStorage.getItem('cycleData') || '{}';
    const parsedData = JSON.parse(mockStorage);
    
    parsedData[dateStr] = {
      symptoms,
      mood,
      flow,
      notes: cycleData.notes || ''
    };
    
    localStorage.setItem('cycleData', JSON.stringify(parsedData));
    
    // Show success message
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  const isDateInPeriod = (date) => {
    // Check if date is in any recorded period
    return cycleHistory.some(
      period => 
        date >= period.startDate && 
        date <= period.endDate
    );
  };

  const isDatePredictedPeriod = (date) => {
    return date >= predictedPeriod.nextStart && date <= predictedPeriod.nextEnd;
  };

  const isDateFertile = (date) => {
    return date >= predictedPeriod.fertile.start && date <= predictedPeriod.fertile.end;
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const toggleSymptom = (symptom) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleNotesChange = (e) => {
    setCycleData({...cycleData, notes: e.target.value});
  };

  const renderCalendarDays = () => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    
    // Empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = date.getDate() === selectedDate.getDate() && 
                         date.getMonth() === selectedDate.getMonth() && 
                         date.getFullYear() === selectedDate.getFullYear();
      
      const isPeriod = isDateInPeriod(date);
      const isPredicted = isDatePredictedPeriod(date);
      const isFertile = isDateFertile(date);
      
      let className = "calendar-day";
      if (isSelected) className += " selected";
      if (isPeriod) className += " period";
      if (isPredicted) className += " predicted";
      if (isFertile) className += " fertile";
      
      days.push(
        <motion.div 
          key={day} 
          className={className}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedDate(new Date(year, month, day))}
        >
          {day}
        </motion.div>
      );
    }
    
    return days;
  };

  return (
    <motion.div 
      className="tracker-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>
        <motion.span
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          Period Tracker
        </motion.span>
      </h1>
      
      <div className="calendar-section">
        <div className="calendar-header">
          <button onClick={prevMonth} className="month-nav">
            <ChevronLeft size={20} />
          </button>
          <h2>
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={nextMonth} className="month-nav">
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        
        <div className="calendar-grid">
          {renderCalendarDays()}
        </div>
        
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color period"></div>
            <span>Period</span>
          </div>
          <div className="legend-item">
            <div className="legend-color predicted"></div>
            <span>Predicted</span>
          </div>
          <div className="legend-item">
            <div className="legend-color fertile"></div>
            <span>Fertile Window</span>
          </div>
        </div>
      </div>

      <div className="selected-date-info">
        <h3>
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })}
        </h3>
      </div>
      
      <div className="tracking-section">
        <div className="tracking-card flow-tracking">
          <h3><Droplet size={20} /> Flow Intensity</h3>
          <div className="flow-options">
            {flowOptions.map((option) => (
              <motion.div
                key={option.label}
                className={`flow-option ${flow === option.label ? 'selected' : ''}`}
                style={{ backgroundColor: flow === option.label ? option.color : 'transparent' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFlow(option.label)}
              >
                {option.label}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="tracking-card mood-tracking">
          <h3><Moon size={20} /> Mood</h3>
          <div className="mood-options">
            {moodOptions.map((option) => (
              <motion.div
                key={option.label}
                className={`mood-option ${mood === option.label ? 'selected' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMood(option.label)}
              >
                <span className="mood-emoji">{option.emoji}</span>
                <span className="mood-label">{option.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="tracking-card symptoms-tracking">
          <h3>
            <Thermometer size={20} /> Symptoms
            <motion.button 
              className="info-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowTip(!showTip)}
            >
              <Info size={16} />
            </motion.button>
          </h3>
          
          {showTip && (
            <motion.div 
              className="tip-box"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Tracking symptoms helps identify patterns in your cycle and can help with early detection of health issues.
            </motion.div>
          )}
          
          <div className="symptom-options">
            {symptomOptions.map((symptom) => (
              <motion.div
                key={symptom}
                className={`symptom-option ${symptoms.includes(symptom) ? 'selected' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSymptom(symptom)}
              >
                {symptom}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="tracking-card notes-tracking">
          <h3><Activity size={20} /> Notes</h3>
          <textarea
            placeholder="Add any additional notes about your day here..."
            value={cycleData.notes || ''}
            onChange={handleNotesChange}
          ></textarea>
        </div>
      </div>
      
      <motion.button 
        className="save-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={saveData}
      >
        Save Entry
      </motion.button>
      
      <div className="cycle-prediction">
        <h3><Calendar size={20} /> Cycle Predictions</h3>
        <div className="prediction-info">
          <div>
            <strong>Next Period:</strong> 
            {predictedPeriod.nextStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
            {predictedPeriod.nextEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          <div>
            <strong>Fertile Window:</strong> 
            {predictedPeriod.fertile.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
            {predictedPeriod.fertile.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          <div className="average-cycle">
            <strong>Average Cycle Length:</strong> 28 days
          </div>
        </div>
      </div>
      
      <div id="toast" className="toast">
        Data saved successfully!
      </div>
    </motion.div>
  );
};

export default Tracker;