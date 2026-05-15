import { useUserStore } from '@/entities/user/model/userSlice';
import { Button } from './elements/button';

export const LanguageSwitcher = () => {
  const { lang, setLanguage } = useUserStore();

  return (
    <div className="absolute top-5 right-5 flex gap-2 text-xs font-bold">
      <Button
        onClick={() => setLanguage('ru')}
        className={lang === 'ru' ? 'text-amber-600' : 'text-gray-400'}
      >
        RU
      </Button>
      <span className="text-gray-300">|</span>
      <Button
        onClick={() => setLanguage('en')}
        className={lang === 'en' ? 'text-amber-600' : 'text-gray-400'}
      >
        EN
      </Button>
    </div>
  );
};
