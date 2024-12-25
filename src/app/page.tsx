// import DataVisualizer from '@/components/StockVisualizer';

// export default function Home() {
//   return (
//     <main className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-8">Stock Price Visualization Dashboard</h1>
//       <DataVisualizer />
//     </main>
//   );
// }

// // import StockVisualizerSSR from '@/components/StockVisualizerSSR';

// // export default function Home() {
// //   return (
// //     <main className="container mx-auto py-8">
// //       <h1 className="text-3xl font-bold mb-8">Stock Price Visualization Dashboard</h1>
// //       <StockVisualizerSSR />
// //     </main>
// //   );
// // }

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/table');
}