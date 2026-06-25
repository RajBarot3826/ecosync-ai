import { describe, it, expect, beforeEach } from 'vitest';
import { 
  getPoints, 
  setPoints, 
  getCarbonScore, 
  setCarbonScore, 
  getStreak, 
  setStreak, 
  getLogs, 
  addLog, 
  getChallenges,
  getTreesPlanted,
  setTreesPlanted
} from './state';

describe('State Manager (state.ts)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('retrieves default points and updates them correctly', () => {
    expect(getPoints()).toBe(2450);
    setPoints(3000);
    expect(getPoints()).toBe(3000);
  });

  it('retrieves default carbon score and updates it correctly', () => {
    expect(getCarbonScore()).toBe(785);
    setCarbonScore(800);
    expect(getCarbonScore()).toBe(800);
  });

  it('retrieves default streak and updates it correctly', () => {
    expect(getStreak()).toBe(12);
    setStreak(15);
    expect(getStreak()).toBe(15);
  });

  it('appends and retrieves logs correctly', () => {
    const initialLogs = getLogs();
    expect(initialLogs.length).toBe(7);
    
    addLog('Mon', 10);
    const updatedLogs = getLogs();
    // Since Mon already exists, it should update it
    const monLog = updatedLogs.find(l => l.name === 'Mon');
    expect(monLog?.emissions).toBe(22); // 12 + 10
  });

  it('handles challenges and tree planting updates', () => {
    const ch = getChallenges();
    expect(ch.length).toBe(4);
    
    expect(getTreesPlanted()).toBe(3);
    setTreesPlanted(5);
    expect(getTreesPlanted()).toBe(5);
  });
});
