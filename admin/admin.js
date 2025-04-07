// utils.js - Create this file in your admin directory
// Helper functions for saving and loading data

// Save data to a JSON file
async function saveData(filename, data) {
    try {
      const response = await fetch(`/save-data.php?file=${filename}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Error saving data: ${response.statusText}`);
      }
      
      return true;
    } catch (error) {
      console.error('Save error:', error);
      return false;
    }
  }
  
  // Load data from a JSON file
  async function loadData(filename) {
    try {
      const response = await fetch(`/data/${filename}?t=${new Date().getTime()}`);
      
      if (!response.ok) {
        throw new Error(`Error loading data: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Load error:', error);
      return null;
    }
  }