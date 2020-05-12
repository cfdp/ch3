
/**
 * Override the CIM chat function for tracking chat sessions
 * 
 * We only want to store data in sessionStorage
 */
var orig_cm_GetTokenValue = cm_GetTokenValue;

cm_GetTokenValue = function () {
    var value = sessionStorage.getItem('cimChatSessionTokenValue');
    console.log('overridin');
    if (value) {
      return value;
    } else {
      value = cm_CreateUserGuid();
      sessionStorage.setItem('cimChatSessionTokenValue', value);  
      return value;
  }
}