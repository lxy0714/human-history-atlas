import { describe, it, expect } from 'vitest';
import {
  CIVILIZATIONS as CIV_CONST,
  CATEGORIES as CAT_CONST,
  ERAS as ERAS_CONST,
} from '@/data/history-constants';
import {
  CIVILIZATIONS as CIV_INDEX,
  CATEGORIES as CAT_INDEX,
  ERAS as ERAS_INDEX,
} from '@/data/history-index';

// 背景：history-constants.ts（轻量首屏）与 history-index.ts（自动生成）各有一份
// 文明 / 分类 / 时代常量。曾出现前者缺 nameEn，导致从它导入的组件在英文态
// 仍渲染中文，而 tsc / eslint / 单测全绿。此测试锁住两份必须完全一致。
describe('首屏常量与索引常量的双语一致性', () => {
  it('CIVILIZATIONS：键集合一致', () => {
    expect(Object.keys(CIV_CONST).sort()).toEqual(Object.keys(CIV_INDEX).sort());
  });

  it('CIVILIZATIONS：每条都有 nameEn 且与索引相同', () => {
    for (const k of Object.keys(CIV_INDEX) as Array<keyof typeof CIV_INDEX>) {
      const a = CIV_CONST[k];
      const b = CIV_INDEX[k];
      expect(a.nameEn, `${k} 缺 nameEn`).toBeTruthy();
      expect(a.nameEn, `${k} nameEn 不一致`).toBe(b.nameEn);
      expect(a.name, `${k} name 不一致`).toBe(b.name);
    }
  });

  it('CATEGORIES：每条都有 nameEn 且与索引相同', () => {
    expect(Object.keys(CAT_CONST).sort()).toEqual(Object.keys(CAT_INDEX).sort());
    for (const k of Object.keys(CAT_INDEX) as Array<keyof typeof CAT_INDEX>) {
      const a = CAT_CONST[k];
      const b = CAT_INDEX[k];
      expect(a.nameEn, `${k} 缺 nameEn`).toBeTruthy();
      expect(a.nameEn, `${k} nameEn 不一致`).toBe(b.nameEn);
      expect(a.name, `${k} name 不一致`).toBe(b.name);
    }
  });

  it('ERAS：每条都有 nameEn 且与索引相同', () => {
    expect(ERAS_CONST.length).toBe(ERAS_INDEX.length);
    for (let i = 0; i < ERAS_INDEX.length; i++) {
      const a = ERAS_CONST[i];
      const b = ERAS_INDEX[i];
      expect(a.id).toBe(b.id);
      expect(a.nameEn, `${a.id} 缺 nameEn`).toBeTruthy();
      expect(a.nameEn, `${a.id} nameEn 不一致`).toBe(b.nameEn);
    }
  });

  it('ERAS：descriptionEn 两份一致且非空', () => {
    for (let i = 0; i < ERAS_INDEX.length; i++) {
      const a = ERAS_CONST[i];
      const b = ERAS_INDEX[i];
      expect(a.descriptionEn, `${a.id} 缺 descriptionEn`).toBeTruthy();
      expect(a.descriptionEn, `${a.id} descriptionEn 不一致`).toBe(b.descriptionEn);
    }
  });

  it('三根轴英文名总数为 23（7 时代 + 6 分类 + 10 文明）', () => {
    const n =
      ERAS_CONST.filter((e) => e.nameEn).length +
      Object.values(CAT_CONST).filter((c) => c.nameEn).length +
      Object.values(CIV_CONST).filter((c) => c.nameEn).length;
    expect(n).toBe(23);
  });
});