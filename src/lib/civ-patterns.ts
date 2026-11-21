// EXPORTS: getCivilizationPattern
// 文明装饰纹样 - 用 SVG data URI 实现风格化装饰边框

export function getCivilizationPattern(civilization: string, color: string): { top: string; bottom: string } {
  const opacity = 0.12;

  // 通用细金线（兜底）
  const genericLine = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="8" viewBox="0 0 200 8">
      <line x1="0" y1="4" x2="200" y2="4" stroke="${color}" stroke-width="1" opacity="${opacity}" />
    </svg>`,
  );

  switch (civilization) {
    case 'china':
    case 'eastAsia':
    case 'japan':
      // 回纹 / 云雷纹
      const huiwen = encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="12" viewBox="0 0 80 12">
          <g fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}">
            <path d="M2 6h8v4h8v-8h8v8h8v-4h8v4h8v-8h8v8h8v-4h8" />
          </g>
        </svg>`,
      );
      return {
        top: `url("data:image/svg+xml,${huiwen}")`,
        bottom: `url("data:image/svg+xml,${huiwen}")`,
      };

    case 'europe':
    case 'greece':
    case 'roman':
      // 希腊涡卷纹 / 波浪纹
      const greekWave = encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="14" viewBox="0 0 60 14">
          <g fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}">
            <path d="M0 7 Q 7.5 0, 15 7 T 30 7 T 45 7 T 60 7" />
            <path d="M0 7 Q 7.5 14, 15 7 T 30 7 T 45 7 T 60 7" />
          </g>
        </svg>`,
      );
      return {
        top: `url("data:image/svg+xml,${greekWave}")`,
        bottom: `url("data:image/svg+xml,${greekWave}")`,
      };

    case 'middleEast':
    case 'islamic':
      // 阿拉伯几何花纹（八角星连续）
      const arabesque = encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="16" viewBox="0 0 80 16">
          <g fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}">
            <polygon points="20,2 25,8 20,14 15,8" />
            <polygon points="40,2 45,8 40,14 35,8" />
            <polygon points="60,2 65,8 60,14 55,8" />
            <line x1="0" y1="8" x2="13" y2="8" />
            <line x1="27" y1="8" x2="33" y2="8" />
            <line x1="47" y1="8" x2="53" y2="8" />
            <line x1="67" y1="8" x2="80" y2="8" />
          </g>
        </svg>`,
      );
      return {
        top: `url("data:image/svg+xml,${arabesque}")`,
        bottom: `url("data:image/svg+xml,${arabesque}")`,
      };

    case 'southAsia':
    case 'india':
      // 莲花瓣纹样
      const lotus = encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="14" viewBox="0 0 80 14">
          <g fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}">
            <path d="M0 14 Q 10 0, 20 14 T 40 14 T 60 14 T 80 14" />
            <path d="M10 14 Q 10 6, 15 2" />
            <path d="M30 14 Q 30 6, 35 2" />
            <path d="M50 14 Q 50 6, 55 2" />
            <path d="M70 14 Q 70 6, 75 2" />
          </g>
        </svg>`,
      );
      return {
        top: `url("data:image/svg+xml,${lotus}")`,
        bottom: `url("data:image/svg+xml,${lotus}")`,
      };

    case 'america':
    case 'mesoamerica':
      // 阶梯回纹（玛雅风格）
      const mayaStep = encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="14" viewBox="0 0 60 14">
          <g fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}">
            <path d="M2 12 L 2 6 L 8 6 L 8 10 L 14 10 L 14 6 L 20 6 L 20 12 Z" />
            <path d="M28 12 L 28 6 L 34 6 L 34 10 L 40 10 L 40 6 L 46 6 L 46 12 Z" />
            <path d="M54 12 L 54 6 L 60 6 L 60 10 L 66 10 L 66 6 L 72 6 L 72 12 Z" />
          </g>
        </svg>`,
      );
      return {
        top: `url("data:image/svg+xml,${mayaStep}")`,
        bottom: `url("data:image/svg+xml,${mayaStep}")`,
      };

    case 'africa':
    case 'egypt':
      // 努比亚几何带纹
      const nubian = encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="12" viewBox="0 0 80 12">
          <g fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}">
            <line x1="0" y1="2" x2="80" y2="2" />
            <line x1="0" y1="10" x2="80" y2="10" />
            <path d="M5 2 L 15 10 M 15 2 L 5 10 M 20 2 L 30 10 M 30 2 L 20 10 M 35 2 L 45 10 M 45 2 L 35 10 M 50 2 L 60 10 M 60 2 L 50 10 M 65 2 L 75 10 M 75 2 L 65 10" />
          </g>
        </svg>`,
      );
      return {
        top: `url("data:image/svg+xml,${nubian}")`,
        bottom: `url("data:image/svg+xml,${nubian}")`,
      };

    default:
      return {
        top: `url("data:image/svg+xml,${genericLine}")`,
        bottom: `url("data:image/svg+xml,${genericLine}")`,
      };
  }
}
