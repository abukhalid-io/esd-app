/**
 * Google Apps Script for PDM/ESD Data Sync
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire code
 * 5. Save (Ctrl+S)
 * 6. Click Deploy > New deployment
 * 7. Select "Web app"
 * 8. Description: "PDM/ESD Data Sync"
 * 9. Execute as: "Me"
 * 10. Who has access: "Anyone" (or "Anyone with Google Account")
 * 11. Click Deploy
 * 12. Copy the Web App URL
 * 13. Give that URL to the app admin to configure
 */

const SHEET_NAME = 'PDM_ESD Data';

// doPost - Handle data submission from the app
function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);
    
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(SHEET_NAME);
    
    // Create sheet if doesn't exist
    if (!sheet) {
      sheet = doc.insertSheet(SHEET_NAME);
      // Add headers
      const headers = ['No', 'TAG No.', 'TAG DCS', 'Service', 'I/O Loc', 'I/O Type', 'MAX Limit', 'Unit', 'Reading Value', 'Status', 'Tx Condition', 'Date Checked', 'Notes'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
    
    // Parse the incoming data from POST body
    let data = [];
    let action = 'append';
    
    try {
      // Try to parse from postData.contents (for fetch API)
      if (e.postData && e.postData.contents) {
        const parsed = JSON.parse(e.postData.contents);
        action = parsed.action || 'append';
        data = parsed.data || [];
      } else if (e.parameter && e.parameter.data) {
        // Try to parse from form parameter
        const parsed = JSON.parse(e.parameter.data);
        action = parsed.action || 'append';
        data = parsed.data || [];
      }
    } catch(parseErr) {
      // If JSON parse fails, try form data
      action = e.parameter.action || 'append';
      if (e.parameter.data) {
        try {
          data = JSON.parse(e.parameter.data);
        } catch(err) {
          data = [];
        }
      }
    }
    
    if (action === 'append' || !action) {
      if (Array.isArray(data) && data.length > 0) {
        // Clear existing data (keep header) and add new data
        const lastRow = sheet.getLastRow();
        if (lastRow > 1) {
          sheet.deleteRows(2, lastRow - 1);
        }
        
        // Add all data
        const rows = data.map((row, index) => [
          index + 1,
          row['TAG No.'] || '',
          row['TAG DCS'] || '',
          row['Service'] || '',
          row['I/O Loc'] || '',
          row['I/O Type'] || '',
          row['MAX Limit'] || '',
          row['Unit'] || '',
          row['Reading Value'] || '',
          row['Status'] || '',
          row['Tx Condition'] || '',
          row['Date Checked'] || '',
          row['Notes'] || ''
        ]);
        
        if (rows.length > 0) {
          sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
        }
        
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: 'Added ' + rows.length + ' rows',
          count: rows.length
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Invalid data format or empty data'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// doGet - Handle read request from the app
function doGet(e) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = doc.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    
    if (lastRow <= 1) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
    
    // Convert to array of objects
    const headers = ['No', 'TAG No.', 'TAG DCS', 'Service', 'I/O Loc', 'I/O Type', 'MAX Limit', 'Unit', 'Reading Value', 'Status', 'Tx Condition', 'Date Checked', 'Notes'];
    const result = data.map(row => {
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script works
function test() {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Script is working! Sheet: ' + doc.getName());
}
