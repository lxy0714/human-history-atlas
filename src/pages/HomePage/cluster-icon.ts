// EXPORTS: createClusterIcon
// 聚集标记 divIcon 构造（依赖 leaflet，运行时加载）
import L from 'leaflet';

export function createClusterIcon(color: string, count: number, visualSize = 28) {
  const fontSize = count >= 10 ? 11 : count >= 5 ? 12 : 13;
  const hitSize = 44;
  return L.divIcon({
    className: 'cluster-marker',
    html: `
      <div style="
        width: ${hitSize}px;
        height: ${hitSize}px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
      <div style="
        position: relative;
        width: ${visualSize}px;
        height: ${visualSize}px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, ${color}dd, ${color}99);
        border: 2px solid rgba(26, 22, 18, 0.9);
        box-shadow: 0 0 0 3px ${color}40, 0 0 16px ${color}cc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: ${fontSize}px;
        color: #1a1612;
        text-shadow: 0 1px 0 rgba(255,255,255,0.3);
        font-family: var(--font-sans);
      ">
        ${count}
      </div>
      </div>
    `,
    iconSize: [hitSize, hitSize],
    iconAnchor: [hitSize / 2, hitSize / 2],
    popupAnchor: [0, -hitSize / 2 - 4],
  });
}
