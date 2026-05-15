import { useUserStore } from '../../entities/user/model/userSlice';

export const LanguageSwitcher = () => {
  const { lang, setLanguage } = useUserStore();

  return (
    <div className="absolute top-5 right-5 flex gap-2 text-xs font-bold">
      <button
        onClick={() => setLanguage('ru')}
        className={lang === 'ru' ? 'text-amber-600' : 'text-gray-400'}
      >
        RU
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={lang === 'en' ? 'text-amber-600' : 'text-gray-400'}
      >
        EN
      </button>
    </div>
  );
};
