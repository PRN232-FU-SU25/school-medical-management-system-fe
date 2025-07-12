import ScrollToTop from './hooks/scroll-to-top';
import AppProvider from './providers';
import AppRouter from './routes';

export default function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <AppRouter />
    </AppProvider>
  );
}
