// EXPORTS: getFestivalConfetti
// 节日彩蛋 - 根据当前日期返回小型 SVG 装饰

import { scopedStorage } from '@lark-apaas/client-toolkit-lite';

export interface FestivalConfetti {
  key: string;
  label: string;
  icon: string; // SVG path
  color: string;
}

function getStorageKey(key: string) {
  return `festival-hide:${key}:${new Date().toISOString().slice(0, 10)}`;
}

export function shouldShowFestival(key: string): boolean {
  return !scopedStorage.getItem(getStorageKey(key));
}

export function dismissFestival(key: string) {
  scopedStorage.setItem(getStorageKey(key), '1');
}

export function getCurrentFestival(): FestivalConfetti | null {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // 1月1日 元旦
  if (month === 1 && day === 1) {
    return {
      key: 'newyear',
      label: '新年快乐',
      icon: '',
      color: '#f5c542',
    };
  }

  // 7月4日 美国独立日
  if (month === 7 && day === 4) {
    return {
      key: 'july4',
      label: '美国独立日',
      icon: '',
      color: '#3c3b6e',
    };
  }

  // 7月14日 法国国庆
  if (month === 7 && day === 14) {
    return {
      key: 'bastille',
      label: '法国国庆',
      icon: '',
      color: '#0055a4',
    };
  }

  // 10月1日 中国国庆
  if (month === 10 && day === 1) {
    return {
      key: 'cn-national',
      label: '国庆快乐',
      icon: '🇨🇳',
      color: '#de2910',
    };
  }

  // 12月25日 圣诞
  if (month === 12 && day === 25) {
    return {
      key: 'christmas',
      label: '圣诞快乐',
      icon: '',
      color: '#2e8b57',
    };
  }

  // 端午节（简化：6月初，公历6月10日）
  if (month === 6 && day === 10) {
    return {
      key: 'duanwu',
      label: '端午安康',
      icon: '',
      color: '#7fb069',
    };
  }

  // 春节（简化：固定2月17日代表2026年春节）
  if (month === 2 && day === 17) {
    return {
      key: 'springfestival',
      label: '新年快乐',
      icon: '',
      color: '#c41e3a',
    };
  }

  return null;
}
