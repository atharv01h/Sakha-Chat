// coded by Atharv Hatwar
import { Message } from '../types';

// coded by Atharv Hatwar
const LOGS_KEY_PREFIX = 'chat_logs_';

// coded by Atharv Hatwar
export const logChat = (message: Message) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const logKey = `${LOGS_KEY_PREFIX}${date}`;
    
    // Get existing logs for today
    const existingLogs = localStorage.getItem(logKey) || '';
    
    // Create new log entry
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message.role}: ${message.content}\n`;
    
    // Append new log entry
    localStorage.setItem(logKey, existingLogs + logEntry);
    
  } catch (error) {
    console.error('Error logging chat:', error);
  }
};

// coded by Atharv Hatwar
export const getLogsForDate = (date: string): string => {
  try {
    return localStorage.getItem(`${LOGS_KEY_PREFIX}${date}`) || '';
  } catch (error) {
    console.error('Error retrieving logs:', error);
    return '';
  }
};

// coded by Atharv Hatwar
export const getAllLogs = (): Record<string, string> => {
  const logs: Record<string, string> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(LOGS_KEY_PREFIX)) {
        const date = key.replace(LOGS_KEY_PREFIX, '');
        logs[date] = localStorage.getItem(key) || '';
      }
    }
  } catch (error) {
    console.error('Error retrieving all logs:', error);
  }
  return logs;
};