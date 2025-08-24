// Cross-browser clipboard utility for better Edge compatibility
export const copyToClipboard = async (text) => {
  try {
    // Modern browsers (Chrome, Firefox, newer Edge)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } 
    // Fallback for older browsers including legacy Edge
    else {
      return fallbackCopyToClipboard(text);
    }
  } catch {
    // If modern API fails, try fallback
    return fallbackCopyToClipboard(text);
  }
};

const fallbackCopyToClipboard = (text) => {
  try {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make it invisible
    textArea.style.position = 'fixed';
    textArea.style.top = '-999px';
    textArea.style.left = '-999px';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    // Execute copy command
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (error) {
    console.warn('Clipboard copy failed:', error);
    return false;
  }
};
