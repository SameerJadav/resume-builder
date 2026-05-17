import { getClassicBlocks } from './Classic';
import { getModernBlocks } from './Modern';
import { getMinimalBlocks } from './Minimal';
import { getExecutiveBlocks } from './Executive';
import { getCreativeBlocks } from './Creative';

export const templates = [
  { id: 'classic', name: 'Classic', getBlocks: getClassicBlocks },
  { id: 'modern', name: 'Modern', getBlocks: getModernBlocks },
  { id: 'minimal', name: 'Minimal', getBlocks: getMinimalBlocks },
  { id: 'executive', name: 'Executive', getBlocks: getExecutiveBlocks },
  { id: 'creative', name: 'Creative', getBlocks: getCreativeBlocks },
];
