class BrowserHelper {
    static async check_initialized() {
      if (!browser.isConnected) {
        throw new Error('Browser is not initialized');
      }
    
      console.log('Browser is initialized');
    }
  }
  
  module.exports = BrowserHelper;
  