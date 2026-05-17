import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const FIT_TOLERANCE = 2;

export function usePaginatedContent({ blocks, pageHeight, pageMargin, forcedBreaks }) {
  const measureRef = useRef(null);
  const blocksRef = useRef(blocks);
  const forcedBreaksRef = useRef(forcedBreaks);

  useLayoutEffect(() => {
    blocksRef.current = blocks;
    forcedBreaksRef.current = forcedBreaks;
  });

  const initialStructure = () => [blocks.map((b) => b.key)];
  const [pageStructure, setPageStructure] = useState(initialStructure);

  const blocksSignature = blocks.map((b) => b.key).join('|');
  const forcedSignature = blocks.map((b) => (forcedBreaks?.[b.key] ? '1' : '0')).join('');

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    let rafId = null;

    const measure = () => {
      rafId = null;
      const currentBlocks = blocksRef.current;
      const currentForced = forcedBreaksRef.current || {};
      const children = Array.from(el.children);
      if (!children.length) {
        setPageStructure([currentBlocks.map((b) => b.key)]);
        return;
      }

      const contentArea = pageHeight - 2 * pageMargin;
      if (contentArea <= 0) {
        setPageStructure([currentBlocks.map((b) => b.key)]);
        return;
      }

      const rects = children.map((c) => c.getBoundingClientRect());
      const heights = rects.map((r, i) => {
        if (i < rects.length - 1) {
          return rects[i + 1].top - r.top;
        }
        return r.height;
      });

      const result = [];
      let currentPage = [];
      let currentHeight = 0;

      currentBlocks.forEach((block, i) => {
        const h = heights[i] || 0;
        const forced = currentForced[block.key];
        if (forced && currentPage.length > 0) {
          result.push(currentPage);
          currentPage = [];
          currentHeight = 0;
        }
        if (currentHeight + h > contentArea + FIT_TOLERANCE && currentPage.length > 0) {
          result.push(currentPage);
          currentPage = [];
          currentHeight = 0;
        }
        currentPage.push(block.key);
        currentHeight += h;
      });
      if (currentPage.length > 0) result.push(currentPage);

      setPageStructure((prev) => {
        const next = result.length ? result : [currentBlocks.map((b) => b.key)];
        if (sameStructure(prev, next)) return prev;
        return next;
      });
    };

    const schedule = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    schedule();

    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    Array.from(el.children).forEach((c) => observer.observe(c));

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [blocksSignature, forcedSignature, pageHeight, pageMargin]);

  const blockByKey = new Map(blocks.map((b) => [b.key, b]));
  const pages = pageStructure
    .map((keys) => keys.map((k) => blockByKey.get(k)).filter(Boolean))
    .filter((page) => page.length > 0);

  const safePages = pages.length ? pages : [blocks];

  return { pages: safePages, measureRef };
}

function sameStructure(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false;
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
}
