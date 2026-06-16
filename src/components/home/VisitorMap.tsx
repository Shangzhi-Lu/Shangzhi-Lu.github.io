'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocaleStore } from '@/lib/stores/localeStore';

const MAP_ID = '5I7x8Gw6L-PNnJE3RfBe74OUqvDm0BT4K1J-b57Ct9Q';
const MAP_STATS_URL = 'https://mapmyvisitors.com/web/1c5at';
const MAP_SCRIPT_URL = `https://mapmyvisitors.com/map.js?cl=ffffff&w=600&t=n&d=${MAP_ID}`;

export default function VisitorMap() {
  const locale = useLocaleStore((state) => state.locale);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isChinese = locale === 'zh';

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || container.querySelector('#mapmyvisitors')) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'mapmyvisitors';
    script.src = MAP_SCRIPT_URL;
    script.async = true;
    container.appendChild(script);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      aria-labelledby="visitor-map-title"
    >
      <h2 id="visitor-map-title" className="text-2xl font-serif font-bold text-primary mb-4">
        {isChinese ? '访客地图' : 'Visitor Map'}
      </h2>
      <div className="flex justify-center">
        <div
          ref={mapContainerRef}
          className="flex min-h-[320px] w-full max-w-[600px] items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800"
        />
      </div>
      <p className="mt-2 text-xs text-neutral-500">
        {isChinese
          ? '地图根据访客 IP 显示大致地区，不代表精确位置。'
          : 'Locations are approximate and inferred from visitor IP addresses.'}
        {' '}
        <a href={MAP_STATS_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark">
          {isChinese ? '查看统计' : 'View stats'}
        </a>
      </p>
    </motion.section>
  );
}
