'use client';

import { motion } from 'framer-motion';
import { useLocaleStore } from '@/lib/stores/localeStore';

const MAP_ID = '5I7x8Gw6L-PNnJE3RfBe74OUqvDm0BT4K1J-b57Ct9Q';
const MAP_STATS_URL = 'https://mapmyvisitors.com/web/1c5at';
const MAP_EMBED_HTML = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: #fff;
      }
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 294px;
      }
      img, canvas, svg {
        max-width: 100%;
        height: auto;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript" id="mapmyvisitors" src="https://mapmyvisitors.com/map.js?cl=ffffff&w=600&t=n&d=${MAP_ID}"></script>
  </body>
</html>
`;

export default function VisitorMap() {
  const locale = useLocaleStore((state) => state.locale);
  const isChinese = locale === 'zh';

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
        <a
          href={MAP_STATS_URL}
          target="_blank"
          rel="noopener noreferrer"
          title={isChinese ? '查看访客统计' : 'View visitor statistics'}
          className="block w-full max-w-[600px]"
        >
          <iframe
            title={isChinese ? '访客地理分布地图' : 'Visitor location map'}
            srcDoc={MAP_EMBED_HTML}
            className="h-[320px] w-full rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </a>
      </div>
      <p className="mt-2 text-xs text-neutral-500">
        {isChinese
          ? '地图根据访客 IP 显示大致地区，不代表精确位置。'
          : 'Locations are approximate and inferred from visitor IP addresses.'}
      </p>
    </motion.section>
  );
}
