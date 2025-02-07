'use client'
// ... existing code ...

export default function Home() {
  // ... existing code ...

  return (
    <>
      <div id="lang" className="flex flex-row-reverse fixed top-4 right-4 z-[9999] bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
        <Link 
          className={`mx-2 text-sm font-medium transition-all duration-200 hover:opacity-100 cursor-pointer ${
            locale === 'fr' ? 'opacity-100' : 'opacity-50'
          }`} 
          onClick={() => {
            setLocale('fr');
            try {
              console.log('setting locale to fr');
              localStorage.setItem('wedding-locale', 'fr');
            } catch (error) {
              console.error('Error saving locale:', error);
            }
          }}
        >
          FR
        </Link>
        <div className="text-gray-300 mx-1">|</div>
        <Link 
          className={`mx-2 text-sm font-medium transition-all duration-200 hover:opacity-100 cursor-pointer ${
            locale === 'en' ? 'opacity-100' : 'opacity-50'
          }`} 
          onClick={() => {
            setLocale('en');
            try {
              console.log('setting locale to en');
              localStorage.setItem('wedding-locale', 'en');
            } catch (error) {
              console.error('Error saving locale:', error);
            }
          }}
        >
          EN
        </Link>
      </div>
      <NextUIProvider>
        <main>
          <div className="bg-amber-50">
            <Head locale={locale}/>
          </div>
          // ... existing code ...
        </main>
      </NextUIProvider>
    </>
  );
}
